/**
 * apply-category-images.mjs
 *
 * Reads category-images.json and inserts imageUrl fields into categories.ts.
 * Safe to run multiple times — skips categories that already have imageUrl.
 *
 * Usage:
 *   node scripts/apply-category-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATEGORIES_FILE = path.join(__dirname, "../constants/categories.ts");
const INPUT_FILE = path.join(__dirname, "category-images.json");

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error("category-images.json not found. Run fetch-category-images.mjs first.");
    process.exit(1);
  }

  const mapping = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));
  let src = fs.readFileSync(CATEGORIES_FILE, "utf-8");

  let applied = 0;
  let skipped = 0;

  for (const [id, url] of Object.entries(mapping)) {
    if (!url || url === "NOT_FOUND" || url === "ERROR") {
      skipped++;
      continue;
    }

    // Find the category block by id and check if imageUrl already exists nearby
    const idPattern = new RegExp(
      `(\s{4}id:\s*"${id.replace(/[.*+?^${}()|[\]\]/g, "\$&")}"[\s\S]*?)(\n\s{4}questions:)`,
      "m"
    );

    const match = idPattern.exec(src);
    if (!match) {
      console.log(`? [${id}] not found in file`);
      skipped++;
      continue;
    }

    // Skip if imageUrl already present in this block
    if (match[1].includes("imageUrl:")) {
      skipped++;
      continue;
    }

    // Insert imageUrl before the questions: field
    const insert = `\n    imageUrl: "${url}",`;
    src = src.replace(idPattern, `$1${insert}$2`);
    applied++;
    console.log(`+ [${id}] applied`);
  }

  fs.writeFileSync(CATEGORIES_FILE, src, "utf-8");
  console.log(`\nDone. ${applied} applied, ${skipped} skipped.`);
}

main();
