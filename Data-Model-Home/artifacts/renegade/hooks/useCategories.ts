import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Category, Culture, Tier } from "@/types/game";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*, questions(*)");
      if (error) throw error;
      return (data ?? []).map((row) => ({
        id: row.id,
        group: row.group ?? undefined,
        name: row.name,
        culture: row.culture as Culture,
        description: row.description,
        imageUrl: row.image_url ?? undefined,
        questions: ((row.questions as any[]) ?? []).map((q) => ({
          id: q.id,
          categoryId: q.category_id,
          tier: q.tier as Tier,
          prompt: q.prompt,
          answer: q.answer,
          acceptableAnswers: q.acceptable_answers ?? undefined,
          explanation: q.explanation ?? undefined,
          imageUri: q.image_uri ?? undefined,
          source: q.source ?? undefined,
        })),
      }));
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
