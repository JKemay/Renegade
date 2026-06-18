import fs from 'node:fs';
const src = fs.readFileSync(new URL('../constants/categories.ts', import.meta.url), 'utf8')
  .replace(/^import[^\n]*\n/m, '').replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
  .replace(/export default CATEGORIES;?\s*$/m, '');
const C = new Function(src + '\nreturn CATEGORIES;')();
const Q = C.flatMap(c => c.questions);

const low = (s) => (s || '').trim().toLowerCase();
let aaDupWithin = 0, aaEmpty = 0, aaEqualsAns = 0, aaTrimmable = 0;
let promptEqAns = 0, shortPrompt = 0, trimP = 0, trimA = 0, emptyAA = 0;
const exAaDup = [], exEqAns = [];

for (const q of Q) {
  if (q.prompt !== (q.prompt || '').trim()) trimP++;
  if (q.answer !== (q.answer || '').trim()) trimA++;
  if (low(q.prompt) === low(q.answer)) { promptEqAns++; }
  if ((q.prompt || '').trim().length < 12) shortPrompt++;
  if (q.acceptableAnswers) {
    const aa = q.acceptableAnswers;
    if (aa.length === 0) emptyAA++;
    const seen = new Set(); let dupHere = false;
    for (const a of aa) {
      if (a.trim() === '') aaEmpty++;
      else if (seen.has(low(a))) { aaDupWithin++; dupHere = true; }
      else seen.add(low(a));
      if (a !== a.trim()) aaTrimmable++;
      if (low(a) === low(q.answer)) aaEqualsAns++;
    }
    if (dupHere && exAaDup.length < 8) exAaDup.push(`${q.id}: ${JSON.stringify(aa)}`);
  }
}
const r = (n, label) => console.log(`${n ? '•' : '✓'} ${label}: ${n}`);
console.log('=== acceptableAnswers hygiene (safe to auto-fix) ===');
r(aaDupWithin, 'duplicate entries within an acceptableAnswers array');
r(aaEmpty, 'empty-string entries in acceptableAnswers');
r(aaTrimmable, 'entries with leading/trailing whitespace');
r(emptyAA, 'acceptableAnswers present but []');
r(aaEqualsAns, 'entries exactly equal to the canonical answer (redundant)');
exAaDup.forEach(s => console.log('     ' + s));
console.log('\n=== prompt/answer integrity ===');
r(promptEqAns, 'prompt equals answer (broken)');
r(shortPrompt, 'prompt under 12 chars (suspicious)');
r(trimP, 'prompt with leading/trailing whitespace');
r(trimA, 'answer with leading/trailing whitespace');
