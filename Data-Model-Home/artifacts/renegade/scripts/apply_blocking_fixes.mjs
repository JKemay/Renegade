import fs from 'node:fs';

const FILE = new URL('../constants/categories.ts', import.meta.url);
let text = fs.readFileSync(FILE, 'utf8');

// --- string-aware matching brace: returns index of '}' matching the '{' at `open` ---
function matchBrace(s, open) {
  let depth = 0, i = open, q = null;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q) {                       // inside a string literal
      if (c === '\\') { i++; continue; }
      if (c === q) q = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  throw new Error('unbalanced brace from ' + open);
}

// --- find a top-level category block by its category-level id (4-space indent) ---
function categoryBlock(s, catId) {
  const m = new RegExp('\\n    id: ["\']' + catId + '["\']').exec(s);
  if (!m) throw new Error('category not found: ' + catId);
  const open = s.lastIndexOf('{', m.index);      // the "  {" opening this category
  const close = matchBrace(s, open);
  return [open, close + 1];
}

// === #1: re-prefix stub categories (handles "id" and 'id') =================
const REPREFIX = [
  ['nfl_superbowl', 'nfl', 'nflsb'],
  ['soc_tech_pivots', 'soc', 'soctp'],
  ['horror_classics', 'hor', 'horc'],
  ['vg_obscure_hardware', 'vgh', 'vgoh'],
];
for (const [cat, oldP, newP] of REPREFIX) {
  const [a, b] = categoryBlock(text, cat);
  let block = text.slice(a, b);
  const re = new RegExp('(\\bid:\\s*)["\']' + oldP + '(_\\d{3}_\\d{2,3})["\']', 'g');
  const n = (block.match(re) || []).length;
  block = block.replace(re, `$1"${newP}$2"`);
  text = text.slice(0, a) + block + text.slice(b);
  console.log(`#1 ${cat}: ${oldP}_* → ${newP}_*  (${n} ids)`);
}

// === #2: fix wrong categoryId ==============================================
const before2 = text;
text = text.replace(
  /(\{ id: "btl_600_03", categoryId: )"tv_fleabag"/,
  '$1"mu_beatles"',
);
console.log(`#2 btl_600_03 categoryId → mu_beatles  (${before2 === text ? 'NO-OP!' : 'ok'})`);

// === #3: delete duplicate-prompt questions =================================
function deleteQuestion(s, qid) {
  const m = new RegExp('\\bid:\\s*["\']' + qid + '["\']').exec(s);
  if (!m) throw new Error('question not found: ' + qid);
  const open = s.lastIndexOf('{', m.index);
  let end = matchBrace(s, open) + 1;
  if (s[end] === ',') end++;                      // swallow trailing comma
  let start = open;
  while (start > 0 && /[ \t]/.test(s[start - 1])) start--;  // leading indent
  if (s[start - 1] === '\n') start--;             // and the newline before it
  return s.slice(0, start) + s.slice(end);
}
for (const qid of ['wknd_200_01', 'jw_400_01', 'pxd_200_01']) {
  text = deleteQuestion(text, qid);
  console.log(`#3 deleted ${qid}`);
}

fs.writeFileSync(FILE, text);
console.log('\nwritten.');
