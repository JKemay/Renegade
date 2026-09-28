import fs from 'node:fs';
const src = fs.readFileSync(new URL('../constants/categories.ts', import.meta.url), 'utf8')
  .replace(/^import[^\n]*\n/m, '').replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
  .replace(/export default CATEGORIES;?\s*$/m, '');
const C = new Function(src + '\nreturn CATEGORIES;')();

const STOP = new Set('the a an of to in on and or for what which who is are was were did do does how many what\'s name'.split(' '));
const toks = (p) => new Set((p || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w)));
const jac = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); };
const normA = (a) => (a || '').toLowerCase().replace(/[^a-z0-9]/g, '');

let withinPrompt = 0, withinAnswer = 0, crossPrompt = 0;
const samplesW = [], samplesA = [], samplesX = [];

// within-category near-dup prompts & same-answer
for (const c of C) {
  const qs = c.questions.map(q => ({ ...q, t: toks(q.prompt), a: normA(q.answer) }));
  for (let i = 0; i < qs.length; i++) for (let j = i + 1; j < qs.length; j++) {
    const s = jac(qs[i].t, qs[j].t);
    if (s >= 0.75) { withinPrompt++; if (samplesW.length < 10) samplesW.push(`[${c.id}] ${(s).toFixed(2)}  «${qs[i].prompt.slice(0,55)}» ≈ «${qs[j].prompt.slice(0,55)}»`); }
    else if (qs[i].a && qs[i].a === qs[j].a && qs[i].tier === qs[j].tier) { withinAnswer++; if (samplesA.length < 10) samplesA.push(`[${c.id}] ans=«${qs[i].answer.slice(0,30)}»  «${qs[i].prompt.slice(0,45)}» / «${qs[j].prompt.slice(0,45)}»`); }
  }
}

// cross-category near-dup prompts (expensive — bucket by a rare token to limit comparisons)
const all = C.flatMap(c => c.questions.map(q => ({ id: q.id, cat: c.id, prompt: q.prompt, t: toks(q.prompt) })));
const buckets = new Map();
for (const q of all) { for (const w of q.t) { if (w.length >= 5) { if (!buckets.has(w)) buckets.set(w, []); buckets.get(w).push(q); } } }
const seenPair = new Set();
for (const [w, arr] of buckets) {
  if (arr.length > 80) continue;            // skip huge buckets (common words)
  for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
    if (arr[i].cat === arr[j].cat) continue;
    const key = arr[i].id < arr[j].id ? arr[i].id + arr[j].id : arr[j].id + arr[i].id;
    if (seenPair.has(key)) continue; seenPair.add(key);
    if (jac(arr[i].t, arr[j].t) >= 0.8) { crossPrompt++; if (samplesX.length < 10) samplesX.push(`${arr[i].cat}/${arr[j].cat}  «${arr[i].prompt.slice(0,50)}» ≈ «${arr[j].prompt.slice(0,50)}»`); }
  }
}

console.log(`within-category near-dup prompt pairs (Jaccard≥0.75): ${withinPrompt}`);
samplesW.forEach(s => console.log('   ' + s));
console.log(`\nwithin-category same-answer same-tier pairs: ${withinAnswer}`);
samplesA.forEach(s => console.log('   ' + s));
console.log(`\ncross-category near-dup prompt pairs (Jaccard≥0.8): ${crossPrompt}`);
samplesX.forEach(s => console.log('   ' + s));
