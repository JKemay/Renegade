import fs from 'node:fs';
const FILE = new URL('../constants/categories.ts', import.meta.url);
const orig = fs.readFileSync(FILE, 'utf8');
const parse = (s) => new Function(
  s.replace(/^import[^\n]*\n/m, '').replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
   .replace(/export default CATEGORIES;?\s*$/m, '') + '\nreturn CATEGORIES;')();
const C = parse(orig);

function match(s, open, oc, cc) { let d = 0, q = null; for (let i = open; i < s.length; i++) { const c = s[i]; if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; } if (c === '"' || c === "'" || c === '`') { q = c; continue; } if (c === oc) d++; else if (c === cc) { d--; if (!d) return i; } } throw new Error('unbalanced'); }
const low = (s) => (s || '').trim().toLowerCase();

// clean one acceptableAnswers array against its answer
function clean(aa, answer) {
  const out = [], seen = new Set([low(answer)]);
  for (const a of aa) { const k = low(a); if (!k || seen.has(k)) continue; seen.add(k); out.push(a); }
  return out;
}

// ---- Pass 1: rewrite changed acceptableAnswers arrays (scoped to each question by id) ----
const edits = [];
let changed = 0;
for (const c of C) for (const q of c.questions) {
  if (!q.acceptableAnswers) continue;
  const cleaned = clean(q.acceptableAnswers, q.answer);
  if (cleaned.length === q.acceptableAnswers.length && cleaned.every((v, i) => v === q.acceptableAnswers[i])) continue;
  // locate this question's object, then its acceptableAnswers array within it
  const idm = new RegExp('\\bid:\\s*["\']' + q.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\']').exec(orig);
  if (!idm) throw new Error('id not found: ' + q.id);
  const objOpen = orig.lastIndexOf('{', idm.index);
  const objClose = match(orig, objOpen, '{', '}');
  const rel = orig.slice(objOpen, objClose).indexOf('acceptableAnswers:');
  if (rel < 0) throw new Error('aa field missing in ' + q.id);
  const arrOpen = orig.indexOf('[', objOpen + rel);
  const arrClose = match(orig, arrOpen, '[', ']');
  const serialized = '[' + cleaned.map(s => JSON.stringify(s)).join(', ') + ']';
  edits.push({ start: arrOpen, end: arrClose + 1, text: serialized });
  changed++;
}
edits.sort((a, b) => b.start - a.start);
for (let i = 1; i < edits.length; i++) if (edits[i].end > edits[i - 1].start) throw new Error('overlap');
let out = orig;
for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);

// ---- Pass 2: drop now-empty acceptableAnswers fields (both formats) ----
const emptyBefore = (out.match(/acceptableAnswers: \[\]/g) || []).length;
out = out.replace(/\n +acceptableAnswers: \[\],?/g, '');      // multiline field line
out = out.replace(/, acceptableAnswers: \[\]/g, '');           // inline field
const emptyAfter = (out.match(/acceptableAnswers: \[\]/g) || []).length;

// ---- verify ----
const C2 = parse(out);
const map1 = new Map(C.flatMap(c => c.questions).map(q => [q.id, q]));
const map2 = new Map(C2.flatMap(c => c.questions).map(q => [q.id, q]));
let answerChanged = 0, promptChanged = 0, badRemain = 0;
for (const [id, q] of map1) {
  const q2 = map2.get(id);
  if (!q2) { badRemain++; continue; }
  if (q2.answer !== q.answer) answerChanged++;
  if (q2.prompt !== q.prompt) promptChanged++;
  if (q2.acceptableAnswers) {
    const s = new Set();
    for (const a of q2.acceptableAnswers) { if (!a.trim() || low(a) === low(q2.answer) || s.has(low(a))) badRemain++; s.add(low(a)); }
  }
}
console.log(`questions: ${map1.size} → ${map2.size}`);
console.log(`acceptableAnswers arrays cleaned: ${changed}`);
console.log(`empty [] fields removed: ${emptyBefore - emptyAfter} (remaining: ${emptyAfter})`);
console.log(`answers changed: ${answerChanged}  prompts changed: ${promptChanged}  bad/leftover entries: ${badRemain}`);

const ok = map2.size === map1.size && !answerChanged && !promptChanged && !badRemain && emptyAfter === 0;
if (!ok) { console.error('✗ VERIFICATION FAILED — not writing.'); process.exit(1); }
fs.writeFileSync(FILE, out);
console.log('✓ verified — written.');
