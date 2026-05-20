import { supabase } from "@/lib/supabase";
import { addSeenQuestion } from "@/store/gameSession";

export async function fetchSeenQuestionIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from("seen_questions")
    .select("question_id");

  if (error || !data) return [];
  return data.map((row: { question_id: string }) => row.question_id);
}

export function recordSeenQuestion(questionId: string): void {
  addSeenQuestion(questionId);
  supabase
    .from("seen_questions")
    .insert({ question_id: questionId })
    .then(({ error }) => {
      // 23505 = unique_violation — question already recorded, safe to ignore
      if (error && error.code !== "23505") {
        console.warn("Failed to record seen question:", error.message);
      }
    });
}
