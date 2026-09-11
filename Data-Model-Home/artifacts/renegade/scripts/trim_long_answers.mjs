import fs from 'node:fs';
// Trims over-120-char answers by moving a genuine trailing clause into `explanation`,
// wherever a *safe* split point exists (dash / semicolon / sentence boundary that
// leaves a self-contained head). No text is deleted — only relocated, with light
// cosmetic capitalization/punctuation on the relocated clause. Answers with no safe
// split point (essay/list-style, e.g. "(1) ... (2) ... (3) ...") are left untouched
// and reported, per the "don't mangle it" rule.

const FILE = new URL('../constants/categories.ts', import.meta.url);
const orig = fs.readFileSync(FILE, 'utf8');
const parse = (s) => new Function(
  s.replace(/^import[^\n]*\n/m, '').replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
   .replace(/export default CATEGORIES;?\s*$/m, '') + '\nreturn CATEGORIES;')();
const C = parse(orig);

function match(s, open, oc, cc) { let d = 0, q = null; for (let i = open; i < s.length; i++) { const c = s[i]; if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; } if (c === '"' || c === "'" || c === '`') { q = c; continue; } if (c === oc) d++; else if (c === cc) { d--; if (!d) return i; } } throw new Error('unbalanced'); }
function strEnd(s, i) { const q = s[i]; for (let j = i + 1; j < s.length; j++) { if (s[j] === '\\') { j++; continue; } if (s[j] === q) return j + 1; } throw new Error('unterminated'); }
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const STOP_LAST_WORD = new Set(['and','or','but','the','a','an','of','in','for','with','by','to','as','on','at','which','who','that','is','are','was','were','its','his','her','their','vs','etc','approx','inc','jr','sr','st','mr','mrs','dr','no','ca']);
const balanced = (s) => {
  let p = 0; for (const c of s) { if (c === '(') p++; else if (c === ')') p--; if (p < 0) return false; }
  if (p !== 0) return false;
  const quotes = (s.match(/"/g) || []).length;
  if (quotes % 2 !== 0) return false;
  // single-quote quotation marks (not apostrophes in contractions/possessives like "don't",
  // "Geralt's" — those have a letter on both sides) must also come in pairs, or the head
  // would end mid-quotation, e.g. `Geralt claims neutrality — 'Evil is evil, lesser…`
  let singleQuotes = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "'") continue;
    const prevLetter = /[A-Za-z]/.test(s[i - 1] || '');
    const nextLetter = /[A-Za-z]/.test(s[i + 1] || '');
    if (prevLetter && nextLetter) continue; // contraction/possessive apostrophe
    singleQuotes++;
  }
  return singleQuotes % 2 === 0;
};
function headOk(head) {
  head = head.trim();
  if (head.length < 15 || head.length > 120) return false;
  if (!balanced(head)) return false;
  const words = head.replace(/[^A-Za-z]+/g, ' ').trim().split(/\s+/);
  const last = (words[words.length - 1] || '').toLowerCase();
  if (STOP_LAST_WORD.has(last)) return false;
  if (last.length <= 1) return false; // trailing single-letter initial etc.
  return true;
}

// Gather every candidate split for one answer string; return the one with the
// longest valid head (retains the most content in the visible answer).
function bestSplit(answer) {
  // A numbered/lettered enumeration ("(1) ... (2) ... (3) ...") is a genuine multi-part
  // answer — any split would either sever a list item or present just one item as if it
  // were the whole answer. Leave the whole thing alone rather than mangle it.
  if ((answer.match(/\(\d+\)|\([a-z]\)/gi) || []).length >= 2) return null;

  const candidates = [];

  // 1) em/en dash
  for (const m of answer.matchAll(/ [—–] /g)) {
    const idx = m.index;
    candidates.push({ head: answer.slice(0, idx), tail: answer.slice(idx + m[0].length), via: 'dash' });
  }
  // 2) semicolon
  for (const m of answer.matchAll(/; /g)) {
    const idx = m.index;
    candidates.push({ head: answer.slice(0, idx), tail: answer.slice(idx + m[0].length), via: 'semicolon' });
  }
  // 3) sentence boundary: ". " followed by an uppercase letter or digit
  for (const m of answer.matchAll(/\. (?=[A-Z0-9])/g)) {
    const idx = m.index;
    candidates.push({ head: answer.slice(0, idx), tail: answer.slice(idx + m[0].length), via: 'sentence' });
  }

  let best = null;
  for (const c of candidates) {
    const head = c.head.trim().replace(/[.,;:—–]+$/, '').trim();
    const tail = c.tail.trim();
    if (!headOk(head)) continue;
    if (tail.length < 15) continue;
    if (!best || head.length > best.head.length) best = { head, tail, via: c.via };
  }
  return best;
}

const edits = [];
let willSplit = 0;
const leftReasons = [];
const plan = new Map(); // id -> { head, newExplanation }

for (const c of C) for (const q of c.questions) {
  if (!q.answer || q.answer.length <= 120) continue;
  const sp = bestSplit(q.answer);
  if (!sp) {
    leftReasons.push({ id: q.id, cat: c.id, len: q.answer.length, prompt: q.prompt, answer: q.answer });
    continue;
  }

  const idm = new RegExp('\\bid:\\s*["\']' + esc(q.id) + '["\']').exec(orig);
  if (!idm) throw new Error('id not found: ' + q.id);
  const objOpen = orig.lastIndexOf('{', idm.index);
  const objClose = match(orig, objOpen, '{', '}');
  const block = orig.slice(objOpen, objClose);

  // locate answer field value
  const am = /[\n,][ \t]*answer:\s*["']/.exec(block);
  if (!am) throw new Error('answer field not found in ' + q.id);
  const ansQuotePos = objOpen + am.index + am[0].length - 1;
  const ansValEnd = strEnd(orig, ansQuotePos);

  // cosmetic transform on the relocated tail
  let tailCosmetic = sp.tail.trim();
  tailCosmetic = tailCosmetic.charAt(0).toUpperCase() + tailCosmetic.slice(1);
  if (!/[.!?]$/.test(tailCosmetic)) tailCosmetic += '.';

  const hadExplanation = !!q.explanation;
  const newExplanation = hadExplanation ? `${tailCosmetic} ${q.explanation.trim()}` : tailCosmetic;

  // edit #1: answer value
  edits.push({ start: ansQuotePos, end: ansValEnd, text: JSON.stringify(sp.head) });

  // edit #2: explanation value (replace existing, or insert new one right after answer)
  const em = /[\n,][ \t]*explanation:\s*["']/.exec(block);
  if (em) {
    const expQuotePos = objOpen + em.index + em[0].length - 1;
    const expValEnd = strEnd(orig, expQuotePos);
    edits.push({ start: expQuotePos, end: expValEnd, text: JSON.stringify(newExplanation) });
  } else {
    // simplest reliable check, re-used from improve_long_answers.mjs: text strictly between
    // the previous newline and the start of the "answer" token is all whitespace → multiline style.
    const nl = orig.lastIndexOf('\n', ansQuotePos);
    const answerTokenStart = objOpen + am.index + (am[0][0] === '\n' ? 1 : 0);
    const isMultiline = /^[ \t]*$/.test(orig.slice(nl + 1, answerTokenStart));
    const sep = isMultiline ? `,\n${orig.slice(nl + 1, answerTokenStart)}explanation: ` : `, explanation: `;
    edits.push({ start: ansValEnd, end: ansValEnd, text: sep + JSON.stringify(newExplanation) });
  }

  plan.set(q.id, { head: sp.head, newExplanation });
  willSplit++;
}

edits.sort((a, b) => b.start - a.start);
for (let i = 1; i < edits.length; i++) if (edits[i].end > edits[i - 1].start) throw new Error('overlap at edit ' + i);
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
  if (plan.has(id)) {
    const p = plan.get(id);
    if (q2.answer !== p.head) { bad++; console.error('BAD head', id); }
    if (q2.explanation !== p.newExplanation) { bad++; console.error('BAD explanation', id); }
    if (q2.prompt !== q.prompt) { bad++; console.error('BAD prompt', id); }
    // losslessness: every non-whitespace character of the original answer (and the
    // original explanation, if any) must still be present, in order, across the new
    // answer+explanation pair.
    // every alphanumeric word from the original answer(+explanation) must still appear
    // in the new answer+explanation, same multiset (punctuation is intentionally
    // normalized at the split point, so tokenize ignoring punctuation entirely).
    const words = (s) => (s || '').toLowerCase().match(/[a-z0-9']+/g) || [];
    const wc = (arr) => { const m = new Map(); for (const w of arr) m.set(w, (m.get(w) || 0) + 1); return m; };
    const before = words(q.answer).concat(words(q.explanation));
    const after = words(q2.answer).concat(words(q2.explanation));
    const wb = wc(before), wa = wc(after);
    for (const [w, n] of wb) { if ((wa.get(w) || 0) < n) { bad++; console.error('WORD LOSS', id, w); break; } }
  } else {
    if (q2.answer !== q.answer || q2.explanation !== q.explanation || q2.prompt !== q.prompt) otherChanged++;
  }
}
console.log(`questions: ${m1.size} → ${m2.size}`);
console.log(`answers trimmed (clause moved to explanation): ${willSplit}`);
console.log(`left untouched (no safe split point): ${leftReasons.length}`);
console.log(`bad splits / word loss: ${bad}   non-planned questions changed: ${otherChanged}`);

const ok = m2.size === m1.size && !bad && !otherChanged;
if (!ok) { console.error('✗ VERIFICATION FAILED — not writing.'); process.exit(1); }
fs.writeFileSync(FILE, out);
console.log('✓ verified — written.');

// ---- report the ones deliberately left (still >120 after this pass) ----
leftReasons.sort((a, b) => b.len - a.len);
const lines = ['# Long answers left untouched (no safe mechanical split point)', '',
  `${leftReasons.length} answers remain over 120 chars after \`trim_long_answers.mjs\`.`,
  `Each was checked for a dash / semicolon / sentence-boundary split that would leave a`,
  `self-contained head ≤120 chars and a substantive tail — none was found (typically`,
  `because the answer is a genuine multi-part / enumerated response, e.g. "(1) ... (2) ...",`,
  `or has no punctuation boundary early enough to produce a complete standalone answer).`,
  `Rewriting these by hand risks changing what is asserted as correct, so they were left`,
  `as-is rather than mangled. Worst first.`, ''];
for (const q of leftReasons) lines.push(`- **${q.id}** _(${q.cat}, ${q.len} chars)_ — ${q.prompt.slice(0, 80).replace(/\n/g, ' ')}\n  > ${q.answer.slice(0, 160).replace(/\n/g, ' ')}…`);
fs.writeFileSync(new URL('../scripts/long_answers_TODO.md', import.meta.url), lines.join('\n'));
console.log(`report: scripts/long_answers_TODO.md (${leftReasons.length} entries)`);
