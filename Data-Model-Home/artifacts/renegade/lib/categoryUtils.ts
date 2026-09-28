import { Question } from "@/types/game";

/**
 * Utility functions for working with trivia categories and topic packs.
 * Provides filtering, searching, coverage analysis, and validation helpers.
 */

export type Tier = 200 | 400 | 600;

export interface TopicPack {
  topicId: string;
  displayName: string;
  parentCategoryId: string;
  questions: Question[];
}

export interface CoverageStats {
  totalQuestions: number;
  byTier: Record<Tier, number>;
  topicCount: number;
  topics: string[];
  hasAllTiers: boolean;
  minimumPerTier: number;
}

export interface ValidationIssue {
  questionId: string;
  topicId: string;
  issue: string;
}

export function filterByTier(packs: TopicPack[], tier: Tier): Question[] {
  return packs.flatMap((pack) => pack.questions.filter((q) => q.tier === tier));
}

export function filterByCategory(packs: TopicPack[], categoryId: string): TopicPack[] {
  return packs.filter((pack) => pack.parentCategoryId === categoryId);
}

export function getQuestionsByTopic(packs: TopicPack[], topicId: string): Question[] {
  const pack = packs.find((p) => p.topicId === topicId);
  return pack?.questions ?? [];
}

export function searchQuestions(packs: TopicPack[], query: string): Question[] {
  const lowerQuery = query.toLowerCase();
  return packs.flatMap((pack) =>
    pack.questions.filter(
      (q) =>
        q.prompt.toLowerCase().includes(lowerQuery) ||
        q.answer.toLowerCase().includes(lowerQuery) ||
        (q.explanation?.toLowerCase().includes(lowerQuery) ?? false)
    )
  );
}

export function findUnderservedTopics(
  packs: TopicPack[],
  minCount: number = 3
): { topicId: string; tier: Tier; count: number }[] {
  const tiers: Tier[] = [200, 400, 600];
  const results: { topicId: string; tier: Tier; count: number }[] = [];
  for (const pack of packs) {
    for (const tier of tiers) {
      const count = pack.questions.filter((q) => q.tier === tier).length;
      if (count < minCount) {
        results.push({ topicId: pack.topicId, tier, count });
      }
    }
  }
  return results;
}

export function computeCoverage(packs: TopicPack[]): CoverageStats {
  const allQuestions = packs.flatMap((p) => p.questions);
  const byTier: Record<Tier, number> = { 200: 0, 400: 0, 600: 0 };
  for (const q of allQuestions) {
    if (q.tier in byTier) byTier[q.tier as Tier]++;
  }
  const tierCounts = Object.values(byTier);
  return {
    totalQuestions: allQuestions.length,
    byTier,
    topicCount: packs.length,
    topics: packs.map((p) => p.displayName),
    hasAllTiers: tierCounts.every((c) => c > 0),
    minimumPerTier: Math.min(...tierCounts),
  };
}

export function getCategoryCoverage(packs: TopicPack[], categoryId: string): CoverageStats {
  return computeCoverage(filterByCategory(packs, categoryId));
}

export function validatePacks(packs: TopicPack[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenIds = new Set<string>();
  const validTiers: Tier[] = [200, 400, 600];

  for (const pack of packs) {
    for (const q of pack.questions) {
      if (seenIds.has(q.id)) {
        issues.push({ questionId: q.id, topicId: pack.topicId, issue: "Duplicate question ID: " + q.id });
      }
      seenIds.add(q.id);
      if (!validTiers.includes(q.tier as Tier)) {
        issues.push({ questionId: q.id, topicId: pack.topicId, issue: "Invalid tier: " + q.tier });
      }
      if (!q.prompt.trim()) {
        issues.push({ questionId: q.id, topicId: pack.topicId, issue: "Empty prompt" });
      }
      if (!q.answer.trim()) {
        issues.push({ questionId: q.id, topicId: pack.topicId, issue: "Empty answer" });
      }
      if (q.acceptableAnswers && !q.acceptableAnswers.map((a) => a.toLowerCase()).includes(q.answer.toLowerCase())) {
        issues.push({ questionId: q.id, topicId: pack.topicId, issue: "Answer not in acceptableAnswers" });
      }
    }
  }
  return issues;
}

export function sampleBalanced(packs: TopicPack[], countPerTier: number = 2): Question[] {
  const tiers: Tier[] = [200, 400, 600];
  const result: Question[] = [];
  for (const tier of tiers) {
    const tierQuestions = filterByTier(packs, tier);
    const shuffled = [...tierQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    result.push(...shuffled.slice(0, countPerTier));
  }
  return result;
}
