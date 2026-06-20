import { useCallback, useMemo, useReducer } from "react";
import { AidId, TeamIndex } from "@/types/game";

/**
 * Manages the in-game aids (power-ups) for both teams.
 *
 * Each team selects a set of aids before a match begins.
 * Aids are single-use per game unless otherwise specified.
 * This hook tracks which aids each team has available,
 * which are currently active, and which have been consumed.
 */

/** All available aid types with their display metadata. */
export const AID_METADATA: Record<AidId, { name: string; description: string; icon: string }> = {
    skip: {
          name: "Skip",
          description: "Skip the current question without penalty and draw a new one.",
          icon: "forward",
    },
    split: {
          name: "Split",
          description: "Remove one incorrect answer option, making it easier to guess.",
          icon: "scissors",
    },
    steal: {
          name: "Steal",
          description: "If the opposing team answers incorrectly, your team gets a chance to answer.",
          icon: "arrow-right-left",
    },
    phone: {
          name: "Phone a Friend",
          description: "Get a hint displayed on screen to help answer the question.",
          icon: "phone",
    },
    double: {
          name: "Double Down",
          description: "Double the point value of the current question.",
          icon: "chevrons-up",
    },
    veto: {
          name: "Veto",
          description: "Force the opposing team to skip their selected category.",
          icon: "ban",
    },
    insider: {
          name: "Insider",
          description: "Peek at the answer for 2 seconds before the question timer starts.",
          icon: "eye",
    },
};

/** State shape for the aid manager reducer. */
interface AidManagerState {
    /** Aids each team selected at match start. */
  selectedAids: Record<TeamIndex, AidId[]>;
    /** Aids that have been used and cannot be reused. */
  consumedAids: Record<TeamIndex, AidId[]>;
    /** The currently active aid for each team (null if none). */
  activeAid: Record<TeamIndex, AidId | null>;
}

type AidManagerAction =
    | { type: "INIT"; team1Aids: AidId[]; team2Aids: AidId[] }
  | { type: "ACTIVATE"; team: TeamIndex; aid: AidId }
  | { type: "CONSUME"; team: TeamIndex }
  | { type: "DEACTIVATE"; team: TeamIndex }
  | { type: "RESET" };

const initialState: AidManagerState = {
    selectedAids: { 1: [], 2: [] },
    consumedAids: { 1: [], 2: [] },
    activeAid: { 1: null, 2: null },
};

function aidManagerReducer(
    state: AidManagerState,
    action: AidManagerAction,
  ): AidManagerState {
    switch (action.type) {
      case "INIT":
              return {
                        ...initialState,
                        selectedAids: { 1: [...action.team1Aids], 2: [...action.team2Aids] },
              };

      case "ACTIVATE": {
              const { team, aid } = action;
              // Can only activate if the aid is selected and not yet consumed
              const isAvailable =
                        state.selectedAids[team].includes(aid) &&
                        !state.consumedAids[team].includes(aid);
              if (!isAvailable) return state;

              return {
                        ...state,
                        activeAid: { ...state.activeAid, [team]: aid },
              };
      }

      case "CONSUME": {
              const { team } = action;
              const currentAid = state.activeAid[team];
              if (!currentAid) return state;

              return {
                        ...state,
                        consumedAids: {
                                    ...state.consumedAids,
                                    [team]: [...state.consumedAids[team], currentAid],
                        },
                        activeAid: { ...state.activeAid, [team]: null },
              };
      }

      case "DEACTIVATE": {
              return {
                        ...state,
                        activeAid: { ...state.activeAid, [action.team]: null },
              };
      }

      case "RESET":
              return initialState;

      default:
              return state;
    }
}

/**
 * Hook for managing in-game aids (power-ups) for both teams.
 *
 * @example
 * ```tsx
 * const aids = useAidManager();
 *
 * // Initialize at match start
 * aids.init(["skip", "double", "steal"], ["phone", "veto", "insider"]);
 *
 * // During gameplay
 * aids.activate(1, "double");
 * // ... question is answered ...
 * aids.consume(1); // marks the "double" aid as used
 *
 * // Check availability
 * const available = aids.getAvailableAids(1);
 * ```
 */
export function useAidManager() {
    const [state, dispatch] = useReducer(aidManagerReducer, initialState);

  /** Set up the aids each team selected before the match. */
  const init = useCallback((team1Aids: AidId[], team2Aids: AidId[]) => {
        dispatch({ type: "INIT", team1Aids, team2Aids });
  }, []);

  /** Activate an aid for a team (must be available and not consumed). */
  const activate = useCallback((team: TeamIndex, aid: AidId) => {
        dispatch({ type: "ACTIVATE", team, aid });
  }, []);

  /** Consume the currently active aid for a team (marks it as used). */
  const consume = useCallback((team: TeamIndex) => {
        dispatch({ type: "CONSUME", team });
  }, []);

  /** Deactivate the current aid without consuming it (e.g. cancelled). */
  const deactivate = useCallback((team: TeamIndex) => {
        dispatch({ type: "DEACTIVATE", team });
  }, []);

  /** Reset all aid state (for a new match). */
  const reset = useCallback(() => {
        dispatch({ type: "RESET" });
  }, []);

  /** Get the list of aids still available (selected but not consumed) for a team. */
  const getAvailableAids = useCallback(
        (team: TeamIndex): AidId[] => {
                return state.selectedAids[team].filter(
                          (aid) => !state.consumedAids[team].includes(aid),
                        );
        },
        [state.selectedAids, state.consumedAids],
      );

  /** Check whether a specific aid is available for a team. */
  const isAidAvailable = useCallback(
        (team: TeamIndex, aid: AidId): boolean => {
                return (
                          state.selectedAids[team].includes(aid) &&
                          !state.consumedAids[team].includes(aid)
                        );
        },
        [state.selectedAids, state.consumedAids],
      );

  /** Get the currently active aid for a team, if any. */
  const getActiveAid = useCallback(
        (team: TeamIndex): AidId | null => state.activeAid[team],
        [state.activeAid],
      );

  return useMemo(
        () => ({
                init,
                activate,
                consume,
                deactivate,
                reset,
                getAvailableAids,
                isAidAvailable,
                getActiveAid,
                state,
        }),
        [init, activate, consume, deactivate, reset, getAvailableAids, isAidAvailable, getActiveAid, state],
      );
}
