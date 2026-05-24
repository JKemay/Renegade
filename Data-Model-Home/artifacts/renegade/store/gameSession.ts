import AsyncStorage from "@react-native-async-storage/async-storage";

import { AidId } from "@/types/game";

export type TeamKey = "team1" | "team2";
export type Tier = 200 | 400 | 600;
export type TileStatus = "played_won" | "played_lost";

const STORAGE_KEY = "renegade:board_session";

export type BoardSession = {
  tileStatuses: Record<string, TileStatus>;
  team1Score: number;
  team2Score: number;
  currentTurn: TeamKey;
  usedAids: Record<TeamKey, AidId[]>;
  questionSeed: number;
  seenQuestionIds: string[];
};

export type QuestionResult = {
  categoryId: string;
  tier: Tier;
  slotIndex: number;
  team1ScoreDelta: number;
  team2ScoreDelta: number;
  skipTurnFor?: TeamKey;
};

let pendingResult: QuestionResult | null = null;

const usedAids: Record<TeamKey, Set<AidId>> = {
  team1: new Set(),
  team2: new Set(),
};

const seenQuestions: Set<string> = new Set();

export function createEmptyBoardSession(): BoardSession {
  return {
    tileStatuses: {},
    team1Score: 0,
    team2Score: 0,
    currentTurn: "team1",
    usedAids: {
      team1: [],
      team2: [],
    },
    questionSeed: Math.floor(Math.random() * 100000),
    seenQuestionIds: [],
  };
}

export function tileKey(categoryId: string, tier: Tier, slotIndex: number): string {
  return `${categoryId}:${tier}:${slotIndex}`;
}

export function setPendingResult(result: QuestionResult): void {
  pendingResult = result;
}

export function consumePendingResult(): QuestionResult | null {
  const result = pendingResult;
  pendingResult = null;
  return result;
}

export function markAidUsed(team: TeamKey, aid: AidId): void {
  usedAids[team].add(aid);
}

export function isAidUsed(team: TeamKey, aid: AidId): boolean {
  return usedAids[team].has(aid);
}

export function hydrateUsedAids(session: BoardSession): void {
  usedAids.team1 = new Set(session.usedAids.team1);
  usedAids.team2 = new Set(session.usedAids.team2);
}

export function getUsedAidsSnapshot(): Record<TeamKey, AidId[]> {
  return {
    team1: Array.from(usedAids.team1),
    team2: Array.from(usedAids.team2),
  };
}

export async function loadBoardSession(): Promise<BoardSession | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as BoardSession;
    return parsed;
  } catch {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export async function saveBoardSession(session: BoardSession): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export async function clearBoardSession(): Promise<void> {
  pendingResult = null;
  usedAids.team1.clear();
  usedAids.team2.clear();
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export function hydrateSeenQuestions(ids: string[]): void {
  seenQuestions.clear();
  for (const id of ids) seenQuestions.add(id);
}

export function isQuestionSeen(id: string): boolean {
  return seenQuestions.has(id);
}

export function addSeenQuestion(id: string): void {
  seenQuestions.add(id);
}

export function getSeenQuestionsSnapshot(): string[] {
  return Array.from(seenQuestions);
}
