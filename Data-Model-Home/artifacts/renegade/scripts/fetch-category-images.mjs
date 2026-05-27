/**
 * fetch-category-images.mjs
 * Queries the Wikipedia API for a thumbnail for each category in categories.ts.
 *
 * Usage:  node scripts/fetch-category-images.mjs
 * Output: scripts/category-images.json
 * Then:   node scripts/apply-category-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATEGORIES_FILE = path.join(__dirname, "../constants/categories.ts");
const OUTPUT_FILE = path.join(__dirname, "category-images.json");
const DELAY_MS = 150;

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

/**
 * Parse only top-level category blocks.
 * Categories open with "  {" (2-space indent), questions open with "      {" (6-space).
 */
function parseCategories(src) {
  const categories = [];
  // \n  { starts a top-level category object
  const blockRe = /\n  \{\s*\n\s{4}id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    categories.push({ id: m[1], name: m[2] });
  }
  return categories;
}

function parseExistingImageUrls(src) {
  const existing = new Set();
  const blockRe = /\n  \{\s*\n\s{4}id:\s*"([^"]+)"([\s\S]*?)(?=\n  \{|\n\];)/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    if (m[2].includes("imageUrl:")) existing.add(m[1]);
  }
  return existing;
}

async function fetchWikipediaImage(searchTitle) {
  const p1 = new URLSearchParams({ action:"query", list:"search", srsearch:searchTitle, srlimit:"1", format:"json", origin:"*" });
  const r1 = await fetch(`https://en.wikipedia.org/w/api.php?${p1}`);
  if (!r1.ok) return null;
  const d1 = await r1.json();
  const hits = d1?.query?.search;
  if (!hits?.length) return null;
  const pageTitle = hits[0].title;

  const p2 = new URLSearchParams({ action:"query", titles:pageTitle, prop:"pageimages", pithumbsize:"400", format:"json", origin:"*" });
  const r2 = await fetch(`https://en.wikipedia.org/w/api.php?${p2}`);
  if (!r2.ok) return null;
  const d2 = await r2.json();
  const pages = d2?.query?.pages;
  if (!pages) return null;
  return Object.values(pages)[0]?.thumbnail?.source ?? null;
}

async function main() {
  const src = fs.readFileSync(CATEGORIES_FILE, "utf-8");
  const categories = parseCategories(src);
  const alreadyHaveImage = parseExistingImageUrls(src);

  let results = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    results = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
  }

  const todo = categories.filter(
    (c) => !alreadyHaveImage.has(c.id) && !(c.id in results)
  );

  console.log(
    `${categories.length} categories | ${alreadyHaveImage.size} already have imageUrl | ` +
    `${Object.keys(results).length} already fetched | ${todo.length} to fetch`
  );

  let done = 0, failed = 0;

  for (const cat of todo) {
    await sleep(DELAY_MS);
    try {
      const url = await fetchWikipediaImage(cat.name);
      results[cat.id] = url ?? "NOT_FOUND";
      if (url) { done++; console.log(`+ [${cat.id}] ${cat.name}\n    ${url}`); }
      else      { failed++; console.log(`- [${cat.id}] ${cat.name}`); }
    } catch (err) {
      results[cat.id] = "ERROR";
      failed++;
      console.error(`! [${cat.id}] ${err.message}`);
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  }

  console.log(`\nDone. ${done} found, ${failed} not found.`);
  console.log(`Review category-images.json then run: node scripts/apply-category-images.mjs`);
}

main().catch(console.error);
