/**
 * Core type definitions for the Renegade trivia game.
 *
 * Tier scoring system:
 * - 200 = Casual Fan — general-knowledge questions most people could guess
 * - 400 = Real Fan — requires genuine familiarity with the topic
 * - 600 = Passionate Fan — deep-cut facts only dedicated fans would know
 */

/** Point value awarded for a correct answer; doubles as a difficulty indicator. */
export type Tier = 200 | 400 | 600;

/** Culture tag used to surface culturally-relevant categories for a player. */
export type Culture =
  | "circassian"
  | "jordanian"
  | "arabic"
  | "american"
  | "islamic"
  | "universal";

/** A single trivia question within a category. */
export interface Question {
  /** Unique identifier, typically `categoryId-tier-index`. */
  id: string;
  /** The category this question belongs to. */
  categoryId: string;
  /** Difficulty / point value. */
  tier: Tier;
  /** The question text shown to players. */
  prompt: string;
  /** The canonical correct answer. */
  answer: string;
  /** Alternative phrasings that should also be accepted. */
  acceptableAnswers?: string[];
  /** Optional explanation shown after the answer is revealed. */
  explanation?: string;
  /** Optional image to display alongside the question. */
  imageUri?: string;
  /** Attribution or source URL for fact-checking. */
  source?: string;
}

/** A themed collection of questions (e.g. "Breaking Bad", "Ancient Rome"). */
export interface Category {
  /** Unique identifier for the category. */
  id: string;
  /** Logical group the category belongs to (e.g. "TV", "History"). */
  group?: string;
  /** Display name shown in the category picker. */
  name: string;
  /** Cultural affinity tag for personalized category surfacing. */
  culture: Culture;
  /** Short description shown below the category name. */
  description: string;
  /** Optional thumbnail URL for the category card. */
  imageUrl?: string;
  /** The questions in this category, typically 9 (3 per tier). */
  questions: Question[];
}

/**
 * Identifier for an in-game aid (power-up) a team can use.
 *
 * Each team selects a set of aids before a match begins.
 * Aids are single-use per game unless otherwise specified.
 */
export type AidId =
  | "skip"
  | "split"
  | "steal"
  | "phone"
  | "double"
  | "veto"
  | "insider";

/** Configuration for a new game session. */
export interface GameConfig {
  /** Display name for team 1. */
  team1Name: string;
  /** Display name for team 2. */
  team2Name: string;
  /** Category IDs selected by team 1 for the board. */
  team1Categories: string[];
  /** Category IDs selected by team 2 for the board. */
  team2Categories: string[];
  /** Aids chosen by team 1. */
  team1Aids: AidId[];
  /** Aids chosen by team 2. */
  team2Aids: AidId[];
  /** Total number of players across both teams. */
  numPlayers: number;
}

/** Tracks which team is currently active. */
export type TeamIndex = 1 | 2;

/** Snapshot of a single answered question during a game. */
export interface AnsweredQuestion {
  /** The question that was answered. */
  questionId: string;
  /** The category the question belongs to. */
  categoryId: string;
  /** Which team attempted the answer. */
  team: TeamIndex;
  /** Whether the team answered correctly. */
  correct: boolean;
  /** Points awarded (may differ from tier if an aid like "double" was active). */
  pointsAwarded: number;
}
