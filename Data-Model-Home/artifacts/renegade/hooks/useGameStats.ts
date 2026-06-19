import { useCallback, useRef, useState } from 'react';
import type { Tier } from '@/types/game';

/**
 * Stats tracked for a single completed round within a match.
 */
export interface RoundStat {
    /** The tier (point value) of the question. */
  tier: Tier;
    /** Whether the player answered correctly. */
  correct: boolean;
    /** Milliseconds the player took to answer (from reveal to submit). */
  responseTimeMs: number;
    /** Whether the player used an aid on this question. */
  usedAid: boolean;
}

/**
 * Aggregate statistics derived from all recorded rounds.
 */
export interface GameStats {
    /** Total number of questions answered. */
  totalAnswered: number;
    /** Number answered correctly. */
  totalCorrect: number;
    /** Overall accuracy as a ratio (0–1). */
  accuracy: number;
    /** Average response time across all answered questions (ms). */
  averageResponseTimeMs: number;
    /** Breakdown of accuracy by tier. */
  accuracyByTier: Record<Tier, { correct: number; total: number; accuracy: number }>;
    /** Total points earned (sum of tiers for correct answers). */
  totalPoints: number;
    /** Longest streak of consecutive correct answers. */
  longestStreak: number;
    /** Current streak of consecutive correct answers. */
  currentStreak: number;
    /** Number of questions where an aid was used. */
  aidsUsed: number;
}

const EMPTY_TIER_STAT = { correct: 0, total: 0, accuracy: 0 };

function buildEmptyTierBreakdown(): Record<Tier, { correct: number; total: number; accuracy: number }> {
    return {
          200: { ...EMPTY_TIER_STAT },
          400: { ...EMPTY_TIER_STAT },
          600: { ...EMPTY_TIER_STAT },
    };
}

function deriveStats(rounds: RoundStat[]): GameStats {
    const totalAnswered = rounds.length;
    const totalCorrect = rounds.filter((r) => r.correct).length;
    const accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0;

  const totalResponseTime = rounds.reduce((sum, r) => sum + r.responseTimeMs, 0);
    const averageResponseTimeMs =
          totalAnswered > 0 ? Math.round(totalResponseTime / totalAnswered) : 0;

  const accuracyByTier = buildEmptyTierBreakdown();
    for (const round of rounds) {
          const tierStat = accuracyByTier[round.tier];
          tierStat.total += 1;
          if (round.correct) tierStat.total > 0 && (tierStat.correct += 1);
          tierStat.accuracy = tierStat.total > 0 ? tierStat.correct / tierStat.total : 0;
    }

  const totalPoints = rounds
      .filter((r) => r.correct)
      .reduce((sum, r) => sum + r.tier, 0);

  let longestStreak = 0;
    let currentStreak = 0;
    for (const round of rounds) {
          if (round.correct) {
                  currentStreak += 1;
                  longestStreak = Math.max(longestStreak, currentStreak);
          } else {
                  currentStreak = 0;
          }
    }

  const aidsUsed = rounds.filter((r) => r.usedAid).length;

  return {
        totalAnswered,
        totalCorrect,
        accuracy,
        averageResponseTimeMs,
        accuracyByTier,
        totalPoints,
        longestStreak,
        currentStreak,
        aidsUsed,
  };
}

/**
 * Hook for recording per-round results and computing live game statistics.
 *
 * Call `recordRound` after each question is answered. Read `stats` at any
 * time to get the latest aggregates. Call `reset` between matches.
 *
 * @example
 * ```tsx
 * const { stats, recordRound, reset } = useGameStats();
 *
 * // After a player answers:
 * recordRound({ tier: 400, correct: true, responseTimeMs: 3200, usedAid: false });
 *
 * // Display accuracy:
 * <Text>{(stats.accuracy * 100).toFixed(0)}%</Text>
 * ```
 */
export function useGameStats() {
    const roundsRef = useRef<RoundStat[]>([]);
    const [stats, setStats] = useState<GameStats>(deriveStats([]));

  const recordRound = useCallback((round: RoundStat) => {
        roundsRef.current = [...roundsRef.current, round];
        setStats(deriveStats(roundsRef.current));
  }, []);

  const reset = useCallback(() => {
        roundsRef.current = [];
        setStats(deriveStats([]));
  }, []);

  return { stats, recordRound, reset } as const;
}
