import { Tier, AidId, AnsweredQuestion, TeamIndex } from "@/types/game";

/**
 * Score calculation utilities for the Renegade trivia game.
 *
 * Handles tier-based scoring, streak bonuses, aid modifiers,
 * and end-of-game summary statistics.
 */

/** Base points awarded per tier. */
const TIER_VALUES: Record<Tier, number> = {
    200: 200,
    400: 400,
    600: 600,
};

/** Multiplier applied when the "double" aid is active. */
const DOUBLE_AID_MULTIPLIER = 2;

/** Minimum consecutive correct answers to trigger a streak bonus. */
const STREAK_THRESHOLD = 3;

/** Bonus points awarded per question in a streak beyond the threshold. */
const STREAK_BONUS_PER_QUESTION = 50;

/**
 * Calculate the points awarded for a single question.
 *
 * @param tier - The difficulty tier of the question
 * @param isCorrect - Whether the answer was correct
 * @param activeAids - Currently active aids for the answering team
 * @returns Points awarded (0 if incorrect)
 */
export function calculateQuestionScore(
    tier: Tier,
    isCorrect: boolean,
    activeAids: AidId[] = [],
  ): number {
    if (!isCorrect) return 0;

  let points = TIER_VALUES[tier];

  if (activeAids.includes("double")) {
        points *= DOUBLE_AID_MULTIPLIER;
  }

  return points;
}

/**
 * Calculate streak bonus for a sequence of consecutive correct answers.
 *
 * A streak bonus kicks in after STREAK_THRESHOLD consecutive correct
 * answers. Each additional correct answer beyond the threshold earns
 * STREAK_BONUS_PER_QUESTION extra points.
 *
 * @param consecutiveCorrect - Number of consecutive correct answers
 * @returns Bonus points from the streak (0 if below threshold)
 */
export function calculateStreakBonus(consecutiveCorrect: number): number {
    if (consecutiveCorrect < STREAK_THRESHOLD) return 0;
    return (consecutiveCorrect - STREAK_THRESHOLD + 1) * STREAK_BONUS_PER_QUESTION;
}

/**
 * Compute the total score for a team from their answered questions.
 *
 * @param answers - Array of answered questions for the team
 * @param team - The team index to filter by
 * @returns Total score including base points (no streak bonus in this sum)
 */
export function computeTeamScore(
    answers: AnsweredQuestion[],
    team: TeamIndex,
  ): number {
    return answers
      .filter((a) => a.team === team)
      .reduce((total, a) => total + a.pointsAwarded, 0);
}

/** Summary statistics for a team's performance. */
export interface TeamScoreSummary {
    totalPoints: number;
    questionsAnswered: number;
    correctAnswers: number;
    incorrectAnswers: number;
    accuracy: number;
    pointsByTier: Record<Tier, number>;
    longestStreak: number;
}

/**
 * Generate a detailed score summary for a team.
 *
 * @param answers - All answered questions in the game
 * @param team - The team to summarize
 * @returns A TeamScoreSummary with detailed breakdown
 */
export function generateTeamSummary(
    answers: AnsweredQuestion[],
    team: TeamIndex,
  ): TeamScoreSummary {
    const teamAnswers = answers.filter((a) => a.team === team);
    const correct = teamAnswers.filter((a) => a.correct);
    const incorrect = teamAnswers.filter((a) => !a.correct);

  // Calculate points broken down by tier
  const pointsByTier: Record<Tier, number> = { 200: 0, 400: 0, 600: 0 };
    for (const answer of teamAnswers) {
          // We don't have tier on AnsweredQuestion, so derive from pointsAwarded
      // For now, just sum into the total
      const tierGuess = answer.pointsAwarded <= 200 ? 200
              : answer.pointsAwarded <= 400 ? 400
              : 600;
          if (answer.correct) {
                  pointsByTier[tierGuess as Tier] += answer.pointsAwarded;
          }
    }

  // Calculate longest streak
  let longestStreak = 0;
    let currentStreak = 0;
    for (const answer of teamAnswers) {
          if (answer.correct) {
                  currentStreak++;
                  longestStreak = Math.max(longestStreak, currentStreak);
          } else {
                  currentStreak = 0;
          }
    }

  const questionsAnswered = teamAnswers.length;
    const accuracy = questionsAnswered > 0
      ? correct.length / questionsAnswered
          : 0;

  return {
        totalPoints: computeTeamScore(answers, team),
        questionsAnswered,
        correctAnswers: correct.length,
        incorrectAnswers: incorrect.length,
        accuracy: Math.round(accuracy * 1000) / 1000,
        pointsByTier,
        longestStreak,
  };
}

/**
 * Determine the winning team, or null for a tie.
 *
 * @param answers - All answered questions in the game
 * @returns The winning TeamIndex, or null if tied
 */
export function determineWinner(
    answers: AnsweredQuestion[],
  ): TeamIndex | null {
    const score1 = computeTeamScore(answers, 1);
    const score2 = computeTeamScore(answers, 2);

  if (score1 > score2) return 1;
    if (score2 > score1) return 2;
    return null;
}
