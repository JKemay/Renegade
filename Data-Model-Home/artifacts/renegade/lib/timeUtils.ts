/**
 * Time-related utilities for Renegade trivia game.
 * Handles round timing, time bonuses, and display formatting.
 */

/** Default time limits in seconds by game mode */
export const ROUND_TIME_LIMITS = {
    casual: 30,
    standard: 20,
    competitive: 15,
    blitz: 10,
} as const;

export type GameMode = keyof typeof ROUND_TIME_LIMITS;

/**
 * Formats a duration in seconds into a human-readable string.
 * @param seconds - Total seconds to format
 * @returns Formatted string like "1:05" or "0:09"
 */
export function formatTime(seconds: number): string {
    if (seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Formats milliseconds into a display string with tenths.
 * Useful for showing precise answer times.
 * @param ms - Duration in milliseconds
 * @returns Formatted string like "2.4s" or "15.0s"
 */
export function formatPreciseTime(ms: number): string {
    if (ms < 0) return "0.0s";
    const seconds = ms / 1000;
    return `${seconds.toFixed(1)}s`;
}

/**
 * Calculates a time bonus based on how quickly the player answered.
 * Faster answers earn more bonus points, scaled by tier.
 *
 * @param answerTimeMs - How long the player took to answer in milliseconds
 * @param timeLimitMs - The total time limit for the round in milliseconds
 * @param tier - Question tier (200, 400, 600) — higher tiers give bigger bonuses
 * @returns Bonus points (0 if answered after time limit)
 */
export function calculateTimeBonus(
    answerTimeMs: number,
    timeLimitMs: number,
    tier: 200 | 400 | 600
  ): number {
    if (answerTimeMs <= 0 || answerTimeMs > timeLimitMs) return 0;

  const fractionRemaining = 1 - answerTimeMs / timeLimitMs;
    const tierMultiplier = tier === 600 ? 1.5 : tier === 400 ? 1.25 : 1.0;
    const maxBonus = 100;

  return Math.round(fractionRemaining * maxBonus * tierMultiplier);
}

/**
 * Returns the round time limit in seconds for a given game mode.
 * Falls back to 'standard' for unknown modes.
 * @param mode - The game mode
 * @returns Time limit in seconds
 */
export function getRoundTimeLimit(mode: GameMode): number {
    return ROUND_TIME_LIMITS[mode] ?? ROUND_TIME_LIMITS.standard;
}

/**
 * Determines the urgency level based on remaining time.
 * Used to drive visual cues (color changes, pulsing, etc.).
 *
 * @param remainingMs - Remaining time in milliseconds
 * @param totalMs - Total time limit in milliseconds
 * @returns Urgency level for UI theming
 */
export function getTimeUrgency(
    remainingMs: number,
    totalMs: number
  ): "relaxed" | "warning" | "critical" {
    if (totalMs <= 0) return "critical";
    const fraction = remainingMs / totalMs;

  if (fraction > 0.5) return "relaxed";
    if (fraction > 0.2) return "warning";
    return "critical";
}

/**
 * Calculates the average answer time across multiple rounds.
 * Skips unanswered rounds (null values).
 *
 * @param answerTimesMs - Array of answer times in ms (null = unanswered)
 * @returns Average time in ms, or null if no valid answers
 */
export function averageAnswerTime(
    answerTimesMs: (number | null)[]
  ): number | null {
    const validTimes = answerTimesMs.filter(
          (t): t is number => t !== null && t > 0
        );
    if (validTimes.length === 0) return null;

  const sum = validTimes.reduce((acc, t) => acc + t, 0);
    return Math.round(sum / validTimes.length);
}
