/**
 * fetch-category-images.mjs
 * Queries Wikipedia for thumbnails for every category in categories.ts.
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
const DELAY_MS = 200;
const UA = "RenegadeGame/1.0 (trivia app; educational; contact: dev@renegadegame.app)";

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function parseCategories(src) {
  const categories = [];
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

async function wikiSearch(query) {
  const url = "https://en.wikipedia.org/w/api.php?" + new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srlimit: "1",
    format: "json",
  });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.query?.search?.[0]?.title ?? null;
}

async function wikiThumb(title) {
  const url = "https://en.wikipedia.org/w/api.php?" + new URLSearchParams({
    action: "query",
    titles: title,
    prop: "pageimages",
    pithumbsize: "400",
    format: "json",
  });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;
  return Object.values(pages)[0]?.thumbnail?.source ?? null;
}

async function fetchWikipediaImage(name) {
  const title = await wikiSearch(name);
  if (!title) return null;
  return await wikiThumb(title);
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
    `${categories.length} categories | ${alreadyHaveImage.size} already set | ` +
    `${Object.keys(results).length} cached | ${todo.length} to fetch`
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
}

main().catch(console.error);
