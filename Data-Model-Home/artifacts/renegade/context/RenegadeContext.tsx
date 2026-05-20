import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AidId, GameConfig } from "@/types/game";

const STORAGE_KEY = "renegade:current_game";

async function persist(config: GameConfig | null) {
  if (config === null) {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } else {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

interface RenegadeContextValue {
  game: GameConfig | null;
  setTeamNames: (team1Name: string, team2Name: string) => void;
  addCategoryToTeam: (team: 1 | 2, categoryId: string) => void;
  removeCategoryFromTeam: (team: 1 | 2, categoryId: string) => void;
  setAids: (team: 1 | 2, aids: AidId[]) => void;
  resetGame: () => void;
  saveGame: (config: GameConfig) => Promise<void>;
}

const RenegadeContext = createContext<RenegadeContextValue | null>(null);

const DEFAULT_CONFIG: GameConfig = {
  team1Name: "Team 1",
  team2Name: "Team 2",
  team1Categories: [],
  team2Categories: [],
  team1Aids: [],
  team2Aids: [],
  numPlayers: 2,
};

export function RenegadeProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<GameConfig | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as GameConfig;
          setGame(parsed);
        } catch {
          // ignore corrupt data
        }
      }
    });
  }, []);

  const setTeamNames = (team1Name: string, team2Name: string) => {
    setGame((prev) => {
      const next = { ...(prev ?? DEFAULT_CONFIG), team1Name, team2Name };
      persist(next).catch(console.error);
      return next;
    });
  };

  const addCategoryToTeam = (team: 1 | 2, categoryId: string) => {
    setGame((prev) => {
      const base = prev ?? DEFAULT_CONFIG;
      const key = team === 1 ? "team1Categories" : "team2Categories";
      if (base[key].includes(categoryId)) return prev;
      const next = { ...base, [key]: [...base[key], categoryId] };
      persist(next).catch(console.error);
      return next;
    });
  };

  const removeCategoryFromTeam = (team: 1 | 2, categoryId: string) => {
    setGame((prev) => {
      const base = prev ?? DEFAULT_CONFIG;
      const key = team === 1 ? "team1Categories" : "team2Categories";
      const next = { ...base, [key]: base[key].filter((id) => id !== categoryId) };
      persist(next).catch(console.error);
      return next;
    });
  };

  const setAids = (team: 1 | 2, aids: AidId[]) => {
    setGame((prev) => {
      const base = prev ?? DEFAULT_CONFIG;
      const key = team === 1 ? "team1Aids" : "team2Aids";
      const next = { ...base, [key]: aids };
      persist(next).catch(console.error);
      return next;
    });
  };

  const resetGame = () => {
    setGame(null);
    AsyncStorage.removeItem(STORAGE_KEY);
  };

  const saveGame = async (config: GameConfig) => {
    setGame(config);
    await persist(config);
  };

  const value = useMemo<RenegadeContextValue>(
    () => ({
      game,
      setTeamNames,
      addCategoryToTeam,
      removeCategoryFromTeam,
      setAids,
      resetGame,
      saveGame,
    }),
    [game]
  );

  return (
    <RenegadeContext.Provider value={value}>
      {children}
    </RenegadeContext.Provider>
  );
}

export function useRenegade() {
  const ctx = useContext(RenegadeContext);
  if (!ctx) throw new Error("useRenegade must be used within RenegadeProvider");
  return ctx;
}
