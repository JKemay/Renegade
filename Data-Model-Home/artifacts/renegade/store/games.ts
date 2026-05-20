import { supabase } from "@/lib/supabase";

export interface GameRecord {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  winner: "team1" | "team2" | "tie";
  categories: string[];
}

export function recordGame(game: GameRecord): void {
  supabase
    .from("games")
    .insert({
      team1_name: game.team1Name,
      team2_name: game.team2Name,
      team1_score: game.team1Score,
      team2_score: game.team2Score,
      winner: game.winner,
      categories: game.categories,
    })
    .then(({ error }) => {
      if (error) console.warn("Failed to record game:", error.message);
    });
}
