import { TeamIndex } from "@/types/game";

/**
 * Player management utilities for the Renegade trivia game.
 *
 * Handles player creation, name validation and sanitization,
 * turn ordering, and team splitting.
 */

/** Maximum allowed player name length. */
const MAX_NAME_LENGTH = 24;

/** Minimum allowed player name length. */
const MIN_NAME_LENGTH = 1;

/** Default fallback names for unnamed teams. */
const DEFAULT_PLAYER_NAMES: Record<TeamIndex, string> = {
  1: "Team 1",
  2: "Team 2",
};

/** Represents a player or team in the game. */
export interface Player {
  id: string;
  name: string;
  team: TeamIndex;
  joinedAt: number;
}

export function sanitizePlayerName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
}

export function validatePlayerName(name: string): string | null {
  if (name.length < MIN_NAME_LENGTH) return "Name cannot be empty.";
  if (name.length > MAX_NAME_LENGTH)
    return `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  return null;
}

export function resolveDisplayName(name: string, team: TeamIndex): string {
  const sanitized = sanitizePlayerName(name);
  return sanitized.length >= MIN_NAME_LENGTH
    ? sanitized
    : DEFAULT_PLAYER_NAMES[team];
}

export function createPlayer(name: string, team: TeamIndex): Player {
  return {
    id: `player_${team}_${Date.now()}`,
    name: resolveDisplayName(name, team),
    team,
    joinedAt: Date.now(),
  };
}

export function getNextTeam(
  currentTeam: TeamIndex,
  players: Player[],
): TeamIndex {
  const otherTeam: TeamIndex = currentTeam === 1 ? 2 : 1;
  const otherHasPlayers = players.some((p) => p.team === otherTeam);
  return otherHasPlayers ? otherTeam : currentTeam;
}

export function splitByTeam(players: Player[]): {
  team1: Player[];
  team2: Player[];
} {
  return {
    team1: players.filter((p) => p.team === 1),
    team2: players.filter((p) => p.team === 2),
  };
}

export function bothTeamsReady(players: Player[]): boolean {
  const { team1, team2 } = splitByTeam(players);
  return team1.length > 0 && team2.length > 0;
}
