export interface Question {
  id: string;
  categoryId: string;
  tier: 200 | 400 | 600;
  prompt: string;
  answer: string;
  acceptableAnswers?: string[];
  explanation?: string;
  imageUri?: string;
  source?: string;
}

export interface Category {
  id: string;
  group?: string;
  name: string;
  culture: "circassian" | "jordanian" | "arabic" | "american" | "islamic" | "universal";
  description: string;
  imageUrl?: string;
  questions: Question[];
}

export type AidId =
  | "skip"
  | "split"
  | "steal"
  | "phone"
  | "double"
  | "veto"
  | "insider";

export interface GameConfig {
  team1Name: string;
  team2Name: string;
  team1Categories: string[];
  team2Categories: string[];
  team1Aids: AidId[];
  team2Aids: AidId[];
  numPlayers: number;
}
