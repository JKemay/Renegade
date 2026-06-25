/**
 * One-time seed script: pushes all questions from constants/categories.ts
 * into the Supabase `categories` and `questions` tables.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=your-service-key \
 *   npx tsx scripts/seed-questions.ts
 *
 * Requires the service role key (not the anon key) to bypass RLS for bulk insert.
 * Run this once, then delete constants/categories.ts and this script.
 */

import { createClient } from "@supabase/supabase-js";
import CATEGORIES from "../constants/categories";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  console.log(`Seeding ${CATEGORIES.length} categories…`);

  for (const cat of CATEGORIES) {
    // Upsert category row
    const { error: catError } = await supabase.from("categories").upsert({
      id: cat.id,
      group: cat.group ?? null,
      name: cat.name,
      culture: cat.culture,
      description: cat.description,
      image_url: cat.imageUrl ?? null,
    });
    if (catError) {
      console.error(`Category ${cat.id} failed:`, catError.message);
      continue;
    }

    // Upsert all questions for this category
    const questionRows = cat.questions.map((q) => ({
      id: q.id,
      category_id: q.categoryId,
      tier: q.tier,
      prompt: q.prompt,
      answer: q.answer,
      acceptable_answers: q.acceptableAnswers ?? null,
      explanation: q.explanation ?? null,
      image_uri: q.imageUri ?? null,
      source: q.source ?? null,
    }));

    const { error: qError } = await supabase.from("questions").upsert(questionRows);
    if (qError) {
      console.error(`Questions for ${cat.id} failed:`, qError.message);
    } else {
      console.log(`  ✓ ${cat.name} (${questionRows.length} questions)`);
    }
  }

  console.log("Seed complete.");
}

seed().catch(console.error);
