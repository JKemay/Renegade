import fs from 'node:fs';
const FILE = new URL('../constants/categories.ts', import.meta.url);
const orig = fs.readFileSync(FILE, 'utf8');
const parse = (s) => new Function(
  s.replace(/^import[^\n]*\n/m, '').replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
   .replace(/export default CATEGORIES;?\s*$/m, '') + '\nreturn CATEGORIES;')();
const C = parse(orig);

function match(s, open, oc, cc) { let d = 0, q = null; for (let i = open; i < s.length; i++) { const c = s[i]; if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; } if (c === '"' || c === "'" || c === '`') { q = c; continue; } if (c === oc) d++; else if (c === cc) { d--; if (!d) return i; } } throw new Error('unbalanced'); }
function strEnd(s, i) { const q = s[i]; for (let j = i + 1; j < s.length; j++) { if (s[j] === '\\') { j++; continue; } if (s[j] === q) return j + 1; } throw new Error('unterminated'); }
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// split rule: "<head> — <tail>", em/en dash only, head 3..90, tail >=40, no existing explanation
function plan(q) {
  if (q.explanation) return null;
  if (q.answer.length <= 120) return null;
  if ((q.answer.match(/ [—–] /g) || []).length !== 1) return null; // exactly one dash → clean "answer — detail", not a parenthetical aside
  const idx = q.answer.search(/ [—–] /);
  if (idx < 0) return null;
  const head = q.answer.slice(0, idx).trim();
  const tail = q.answer.slice(idx + 3).trim();
  if (head.length < 3 || head.length > 90 || tail.length < 40) return null;
  if (!q.answer.startsWith(q.answer.slice(0, idx)) || !q.answer.endsWith(q.answer.slice(idx + 3))) return null; // sanity
  return { head, tail };
}

const edits = [];
let split = 0;
const splitIds = new Map();
for (const c of C) for (const q of c.questions) {
  const p = plan(q);
  if (!p) continue;
  splitIds.set(q.id, p);
  const idm = new RegExp('\\bid:\\s*["\']' + esc(q.id) + '["\']').exec(orig);
  const objOpen = orig.lastIndexOf('{', idm.index);
  const objClose = match(orig, objOpen, '{', '}');
  const block = orig.slice(objOpen, objClose);
  const fm = /[\n,][ \t]*answer:\s*["']/.exec(block);
  if (!fm) throw new Error('answer field not found in ' + q.id);
  const ansStart = objOpen + fm.index + fm[0].indexOf('answer:');
  const quotePos = objOpen + fm.index + fm[0].length - 1;
  const valEnd = strEnd(orig, quotePos);
  // detect format/indent
  const nl = orig.lastIndexOf('\n', ansStart);
  const between = orig.slice(nl + 1, ansStart);
  const multiline = /^[ \t]*$/.test(between);
  const sep = multiline ? `,\n${between}explanation: ` : `, explanation: `;
  const text = `answer: ${JSON.stringify(p.head)}${sep}${JSON.stringify(p.tail)}`;
  edits.push({ start: ansStart, end: valEnd, text });
  split++;
}
edits.sort((a, b) => b.start - a.start);
for (let i = 1; i < edits.length; i++) if (edits[i].end > edits[i - 1].start) throw new Error('overlap');
let out = orig;
for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);

// ---- verify ----
const C2 = parse(out);
const m1 = new Map(C.flatMap(c => c.questions).map(q => [q.id, q]));
const m2 = new Map(C2.flatMap(c => c.questions).map(q => [q.id, q]));
let bad = 0, otherChanged = 0;
for (const [id, q] of m1) {
  const q2 = m2.get(id);
  if (!q2) { bad++; continue; }
  if (splitIds.has(id)) {
    const p = splitIds.get(id);
    if (q2.answer !== p.head || q2.explanation !== p.tail) bad++;
    if (!q.answer.startsWith(q2.answer) || !q.answer.endsWith(q2.explanation)) bad++; // no text lost
    if (q2.prompt !== q.prompt) bad++;
  } else {
    if (q2.answer !== q.answer || q2.explanation !== q.explanation || q2.prompt !== q.prompt) otherChanged++;
  }
}
console.log(`questions: ${m1.size} → ${m2.size}`);
console.log(`answers split (detail → explanation): ${split}`);
console.log(`bad splits / text loss: ${bad}   non-split questions changed: ${otherChanged}`);
const ok = m2.size === m1.size && !bad && !otherChanged;
if (!ok) { console.error('✗ VERIFICATION FAILED — not writing.'); process.exit(1); }
fs.writeFileSync(FILE, out);
console.log('✓ verified — written.');

// ---- report the remaining long answers ----
const remaining = C2.flatMap(c => c.questions.map(q => ({ ...q, cat: c.id }))).filter(q => q.answer.length > 120).sort((a, b) => b.answer.length - a.answer.length);
const lines = ['# Long answers needing manual editing', '', `${remaining.length} answers still > 120 chars after auto-split (${split} were auto-split). Worst first.`, ''];
for (const q of remaining) lines.push(`- **${q.id}** _(${q.cat}, ${q.answer.length} chars)_ — ${q.prompt.slice(0, 80).replace(/\n/g, ' ')}\n  > ${q.answer.slice(0, 160).replace(/\n/g, ' ')}…`);
fs.writeFileSync(new URL('../scripts/long_answers_TODO.md', import.meta.url), lines.join('\n'));
console.log(`report: scripts/long_answers_TODO.md (${remaining.length} entries)`);
