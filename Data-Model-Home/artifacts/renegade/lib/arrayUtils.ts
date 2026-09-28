import type { Question, Tier, Category } from "@/types/game";

/**
 * Fisher-Yates (Knuth) shuffle — returns a new array with elements in random order.
 *
 * This is the standard O(n) unbiased shuffle. The original array is not mutated.
 *
 * @example
 * const deck = shuffleArray(allQuestions);
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Return only the questions that match the given tier.
 *
 * Useful for building the game board where each row corresponds to a tier.
 */
export function filterByTier(questions: readonly Question[], tier: Tier): Question[] {
  return questions.filter((q) => q.tier === tier);
}

/**
 * Pick `count` random questions from the provided list without repeats.
 *
 * If `count` exceeds the list length the entire (shuffled) list is returned.
 */
export function pickRandom<T>(items: readonly T[], count: number): T[] {
  const shuffled = shuffleArray(items);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Group an array of items by a key extracted via `keyFn`.
 *
 * @example
 * const byTier = groupBy(questions, q => q.tier);
 * // { 200: [...], 400: [...], 600: [...] }
 */
export function groupBy<T, K extends string | number>(
  items: readonly T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  const map = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    (map[key] ??= []).push(item);
  }
  return map;
}

/**
 * Count the total number of questions across all provided categories.
 */
export function totalQuestionCount(categories: readonly Category[]): number {
  return categories.reduce((sum, cat) => sum + cat.questions.length, 0);
}

/**
 * Deduplicate an array by a key function, keeping the first occurrence.
 */
export function uniqueBy<T>(items: readonly T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
