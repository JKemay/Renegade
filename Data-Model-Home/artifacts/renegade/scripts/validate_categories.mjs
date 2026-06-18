import fs from 'node:fs';

const path = new URL('../constants/categories.ts', import.meta.url);
const src = fs.readFileSync(path, 'utf8')
  .replace(/^import[^\n]*\n/m, '')
  .replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
  .replace(/export default CATEGORIES;?\s*$/m, '');

let CATEGORIES;
try {
  CATEGORIES = new Function(src + '\nreturn CATEGORIES;')();
} catch (e) {
  console.error('PARSE FAILED:', e.message);
  process.exit(2);
}

const VALID_CULTURES = ['circassian','jordanian','arabic','american','islamic','universal'];
const VALID_TIERS = [200,400,600];

const catIds = new Map();          // id -> count
const qIds = new Map();            // id -> [catId...]
const qPrompts = new Map();        // normalized prompt -> [qId...]
const issues = { dupCat:[], dupQ:[], catMismatch:[], badTier:[], badCulture:[],
  emptyField:[], thinTier:[], thinCat:[], longAnswer:[], dupPrompt:[], missingImage:[],
  ansInAcceptable:[] };

let totalQ = 0;
for (const c of CATEGORIES) {
  catIds.set(c.id, (catIds.get(c.id)||0)+1);
  if (!VALID_CULTURES.includes(c.culture)) issues.badCulture.push(`${c.id}: "${c.culture}"`);
  if (!c.imageUrl) issues.missingImage.push(c.id);

  const tierCount = {200:0,400:0,600:0};
  for (const q of c.questions||[]) {
    totalQ++;
    if (!qIds.has(q.id)) qIds.set(q.id, []);
    qIds.get(q.id).push(c.id);
    if (q.categoryId !== c.id) issues.catMismatch.push(`${q.id}: categoryId="${q.categoryId}" but in category "${c.id}"`);
    if (!VALID_TIERS.includes(q.tier)) issues.badTier.push(`${q.id}: tier=${q.tier}`);
    else tierCount[q.tier]++;
    if (!q.prompt || !q.prompt.trim()) issues.emptyField.push(`${q.id}: empty prompt`);
    if (!q.answer || !q.answer.trim()) issues.emptyField.push(`${q.id}: empty answer`);
    if (q.answer && q.answer.length > 120) issues.longAnswer.push(`${q.id} (${q.answer.length} chars)`);
    if (q.acceptableAnswers && q.answer && q.acceptableAnswers.some(a => a.toLowerCase() === q.answer.toLowerCase()))
      issues.ansInAcceptable.push(q.id);
    const norm = (q.prompt||'').toLowerCase().replace(/[^a-z0-9]/g,'');
    if (norm) { if (!qPrompts.has(norm)) qPrompts.set(norm, []); qPrompts.get(norm).push(q.id); }
  }
  for (const t of VALID_TIERS) if (tierCount[t] < 2) issues.thinTier.push(`${c.id} tier ${t}: ${tierCount[t]} q (need ≥2)`);
  const n = (c.questions||[]).length;
  if (n < 6) issues.thinCat.push(`${c.id}: ${n} questions`);
}

for (const [id,n] of catIds) if (n>1) issues.dupCat.push(`${id} (×${n})`);
for (const [id,cats] of qIds) if (cats.length>1) issues.dupQ.push(`${id} → ${[...new Set(cats)].join(', ')}`);
for (const [,ids] of qPrompts) if (ids.length>1) issues.dupPrompt.push(ids.join(' = '));

const r = (label, arr, show=8) => {
  const flag = arr.length ? '✗' : '✓';
  console.log(`${flag} ${label}: ${arr.length}`);
  if (arr.length) arr.slice(0,show).forEach(x => console.log(`     · ${x}`));
  if (arr.length>show) console.log(`     … +${arr.length-show} more`);
};

console.log(`\n=== Renegade content validation ===`);
console.log(`Categories: ${CATEGORIES.length}   Questions: ${totalQ}\n`);
r('Duplicate category IDs', issues.dupCat);
r('Duplicate question IDs', issues.dupQ);
r('categoryId mismatches', issues.catMismatch);
r('Invalid tier values', issues.badTier);
r('Invalid culture values', issues.badCulture);
r('Empty prompt/answer', issues.emptyField);
r('Duplicate prompts (exact)', issues.dupPrompt);
console.log('\n--- content quality (non-blocking) ---');
r('Categories <6 questions', issues.thinCat);
r('Tiers with <2 questions', issues.thinTier, 12);
r('Answers >120 chars (reveal-card UX)', issues.longAnswer, 5);
r('answer duplicated in acceptableAnswers', issues.ansInAcceptable, 5);
r('Categories missing imageUrl', issues.missingImage, 5);

const blocking = issues.dupCat.length+issues.dupQ.length+issues.catMismatch.length+issues.badTier.length+issues.badCulture.length+issues.emptyField.length+issues.dupPrompt.length;
console.log(`\n${blocking? '✗ '+blocking+' blocking issue(s)':'✓ no blocking issues'}`);
