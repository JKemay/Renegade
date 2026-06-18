import fs from 'node:fs';
const src = fs.readFileSync(new URL('../constants/categories.ts', import.meta.url), 'utf8')
  .replace(/^import[^\n]*\n/m, '').replace(/const CATEGORIES:\s*Category\[\]\s*=/, 'const CATEGORIES =')
  .replace(/export default CATEGORIES;?\s*$/m, '');
const C = new Function(src + '\nreturn CATEGORIES;')();

const norm = p => (p || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const byName = {};
for (const c of C) { const k = c.name.trim().toLowerCase(); (byName[k] = byName[k] || []).push(c); }
const groups = Object.entries(byName).filter(([, v]) => v.length > 1);

let totalDupCats = 0, totalQ = 0, totalUniqueQ = 0, totalDropped = 0, fillsImage = 0;
let exactSubset = 0, complementary = 0;
const histo = {};
console.log(`${groups.length} duplicate-name groups\n`);
for (const [name, members] of groups.sort((a, b) => b[1].length - a[1].length)) {
  totalDupCats += members.length - 1;
  histo[members.length] = (histo[members.length] || 0) + 1;
  // union of normalized prompts
  const seen = new Set(); let groupQ = 0, dropped = 0;
  for (const m of members) for (const q of m.questions) { groupQ++; if (seen.has(norm(q.prompt))) dropped++; else seen.add(norm(q.prompt)); }
  totalQ += groupQ; totalUniqueQ += seen.size; totalDropped += dropped;
  const sizes = members.map(m => m.questions.length);
  const anyImg = members.some(m => m.imageUrl), allImg = members.every(m => m.imageUrl);
  if (anyImg && !allImg) fillsImage++;
  if (dropped === Math.min(...sizes) && new Set(members.map(m => m.questions.length)).size > 1) exactSubset++;
  if (dropped < seen.size * 0.5) complementary++;
}
console.log('group-size histogram (members→#groups):', histo);
console.log(`duplicate categories to remove: ${totalDupCats}`);
console.log(`questions in dup groups: ${totalQ}  → unique prompts: ${totalUniqueQ}  (drop ${totalDropped} exact-dup prompts)`);
console.log(`groups where merging would FILL a missing image from a twin: ${fillsImage}`);
console.log(`mostly-complementary groups (>50% unique): ${complementary}/${groups.length}`);

console.log('\n--- sample groups ---');
for (const [name, members] of groups.slice(0, 12)) {
  const seen = new Set(); let dropped = 0;
  for (const m of members) for (const q of m.questions) { if (seen.has(norm(q.prompt))) dropped++; else seen.add(norm(q.prompt)); }
  console.log(`"${name}": ${members.map(m => `${m.id}(${m.questions.length}q${m.imageUrl ? ',img' : ''})`).join(' + ')}  → ${seen.size} unique, ${dropped} dup`);
}
// check: do members of a group ever disagree on culture/group?
let cultureClash = 0;
for (const [, members] of groups) if (new Set(members.map(m => m.culture)).size > 1) cultureClash++;
console.log(`\ngroups with mismatched culture across members: ${cultureClash}`);
