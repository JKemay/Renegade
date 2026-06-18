import fs from 'node:fs';

const FILE = new URL('../constants/categories.ts', import.meta.url);
const orig = fs.readFileSync(FILE, 'utf8');
const parse = (s) => new Function(
  s.replace(/^import[^\n]*\n/m, '').replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
   .replace(/export default CATEGORIES;?\s*$/m, '') + '\nreturn CATEGORIES;')();
const C = parse(orig);

// ---- string-aware bracket matcher ----
function match(s, open, oc, cc) {
  let depth = 0, q = null;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === oc) depth++; else if (c === cc) { depth--; if (depth === 0) return i; }
  }
  throw new Error('unbalanced');
}
function categoryBlock(s, catId) {
  const m = new RegExp('\\n    id: ["\']' + catId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\']').exec(s);
  if (!m) throw new Error('cat not found: ' + catId);
  const open = s.lastIndexOf('{', m.index);
  return [open, match(s, open, '{', '}') + 1];
}
const norm = (p) => (p || '').toLowerCase().replace(/[^a-z0-9]/g, '');

// ---- serialize one question in the file's multiline format ----
function serializeQ(q) {
  const L = ['      {'];
  L.push(`        id: ${JSON.stringify(q.id)},`);
  L.push(`        categoryId: ${JSON.stringify(q.categoryId)},`);
  L.push(`        tier: ${q.tier},`);
  L.push(`        prompt: ${JSON.stringify(q.prompt)},`);
  L.push(`        answer: ${JSON.stringify(q.answer)},`);
  if (q.acceptableAnswers) L.push(`        acceptableAnswers: ${JSON.stringify(q.acceptableAnswers)},`);
  if (q.explanation) L.push(`        explanation: ${JSON.stringify(q.explanation)},`);
  if (q.imageUri) L.push(`        imageUri: ${JSON.stringify(q.imageUri)},`);
  if (q.source) L.push(`        source: ${JSON.stringify(q.source)},`);
  L.push('      },');
  return L.join('\n');
}

// ---- build groups + merge plan ----
const byName = {};
for (const c of C) { const k = c.name.trim().toLowerCase(); (byName[k] = byName[k] || []).push(c); }
const groups = Object.entries(byName).filter(([, v]) => v.length > 1).map(([, v]) => v);

const globalIds = new Set(C.flatMap(c => c.questions.map(q => q.id)));
const prefixOf = (c) => {
  const counts = {};
  for (const q of c.questions) { const p = (q.id.match(/^(.+?)_\d{3}_\d{2,3}$/) || [])[1]; if (p) counts[p] = (counts[p] || 0) + 1; }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || c.id.replace(/[^a-z0-9]/g, '').slice(0, 6);
};
const score = (c) => [c.questions.length, c.imageUrl ? 1 : 0, c.group ? 1 : 0];
const better = (a, b) => { const x = score(a), y = score(b); for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] > y[i]; return a.id < b.id; };

const edits = [];           // {start,end,text}
let removed = 0, migratedCount = 0, imagesFilled = 0;
const planLines = [];

for (const members of groups) {
  let canon = members[0];
  for (const m of members) if (better(m, canon)) canon = m;
  const twins = members.filter(m => m !== canon);
  const prefix = prefixOf(canon);
  // next number per tier for the canonical prefix
  const nextNum = {};
  for (const q of canon.questions) { const m = q.id.match(new RegExp('^' + prefix + '_(\\d{3})_(\\d+)$')); if (m) { const t = +m[1]; nextNum[t] = Math.max(nextNum[t] || 0, +m[2]); } }
  const seenPrompts = new Set(canon.questions.map(q => norm(q.prompt)));
  const migrated = [];
  for (const t of twins) {
    for (const q of t.questions) {
      if (seenPrompts.has(norm(q.prompt))) continue;   // safety: skip exact-dup prompt
      seenPrompts.add(norm(q.prompt));
      const tier = q.tier;
      let n = (nextNum[tier] || 0) + 1;
      let id = `${prefix}_${tier}_${String(n).padStart(2, '0')}`;
      while (globalIds.has(id)) { n++; id = `${prefix}_${tier}_${String(n).padStart(2, '0')}`; }
      nextNum[tier] = n; globalIds.add(id);
      migrated.push({ ...q, id, categoryId: canon.id });
    }
  }
  migratedCount += migrated.length;

  // edit A: append migrated questions into canonical's questions array
  const [ca, cb] = categoryBlock(orig, canon.id);
  const block = orig.slice(ca, cb);
  const qFieldRel = block.search(/\n    questions:\s*\[/);
  const arrOpen = ca + block.indexOf('[', qFieldRel);
  const arrClose = match(orig, arrOpen, '[', ']');
  if (migrated.length) {
    let k = arrClose - 1; while (/\s/.test(orig[k])) k--;
    const needComma = orig[k] === '}';
    const ins = (needComma ? ',' : '') + '\n' + migrated.map(serializeQ).join('\n');
    edits.push({ start: k + 1, end: k + 1, text: ins });
  }
  // edit B: fill canonical image from a twin if missing
  if (!canon.imageUrl) {
    const tw = twins.find(t => t.imageUrl);
    if (tw) {
      const qFieldAbs = ca + qFieldRel + 1; // position of the indentation before 'questions:'
      edits.push({ start: qFieldAbs, end: qFieldAbs, text: `    imageUrl: ${JSON.stringify(tw.imageUrl)},\n` });
      imagesFilled++;
    }
  }
  // edit C: delete each twin block, incl. its trailing comma + leading indent/newline
  for (const t of twins) {
    let [ta, tb] = categoryBlock(orig, t.id);
    if (orig[tb] === ',') tb += 1;                                   // trailing comma (else: array hole)
    while (ta > 0 && (orig[ta - 1] === ' ' || orig[ta - 1] === '\t')) ta -= 1;  // leading indent
    if (orig[ta - 1] === '\n') ta -= 1;                             // and its newline
    edits.push({ start: ta, end: tb, text: '' });
    removed++;
  }
  planLines.push(`"${canon.name}" → keep ${canon.id} (${canon.questions.length}+${migrated.length}q), drop ${twins.map(t => t.id).join(', ')}`);
}

// ---- apply edits right-to-left ----
edits.sort((a, b) => b.start - a.start);
for (let i = 1; i < edits.length; i++) if (edits[i].end > edits[i - 1].start) throw new Error('overlapping edits!');
let out = orig;
for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);

// ---- verify ----
const C2 = parse(out);
const before = { cats: C.length, qs: C.flatMap(c => c.questions).length };
const after = { cats: C2.length, qs: C2.flatMap(c => c.questions).length };
const allIds = C2.flatMap(c => c.questions.map(q => q.id));
const dupIds = allIds.filter((x, i) => allIds.indexOf(x) !== i);
const mismatch = C2.flatMap(c => c.questions.filter(q => q.categoryId !== c.id).map(q => q.id));
const promptsBefore = C.flatMap(c => c.questions.map(q => norm(q.prompt))).sort();
const promptsAfter = C2.flatMap(c => c.questions.map(q => norm(q.prompt))).sort();
const lostPrompts = promptsBefore.filter(p => !promptsAfter.includes(p));
// answer integrity: every original (prompt→answer) still present
const ansMap = {}; C2.forEach(c => c.questions.forEach(q => { ansMap[norm(q.prompt)] = q.answer; }));
const ansBroken = C.flatMap(c => c.questions).filter(q => ansMap[norm(q.prompt)] !== q.answer).length;
// no duplicate-name groups remain
const names2 = {}; C2.forEach(c => { const k = c.name.trim().toLowerCase(); names2[k] = (names2[k] || 0) + 1; });
const dupNames = Object.entries(names2).filter(([, n]) => n > 1).length;

console.log(planLines.slice(0, 10).join('\n') + `\n… (${planLines.length} groups total)\n`);
console.log(`categories: ${before.cats} → ${after.cats}  (removed ${removed})`);
console.log(`questions:  ${before.qs} → ${after.qs}  (migrated ${migratedCount}, expected NO loss)`);
console.log(`images filled from twins: ${imagesFilled}`);
console.log(`duplicate question IDs: ${dupIds.length}`);
console.log(`categoryId mismatches:  ${mismatch.length}`);
console.log(`lost prompts:           ${lostPrompts.length}`);
console.log(`answer integrity broken: ${ansBroken}`);
console.log(`duplicate-name groups remaining: ${dupNames}`);

const ok = after.qs === before.qs && after.cats === before.cats - removed && !dupIds.length
  && !mismatch.length && !lostPrompts.length && !ansBroken && !dupNames;
if (!ok) { console.error('\n✗ VERIFICATION FAILED — not writing.'); if (lostPrompts.length) console.error('  e.g. lost:', lostPrompts.slice(0, 3)); process.exit(1); }

fs.writeFileSync(FILE, out);
console.log('\n✓ verified — written.');
