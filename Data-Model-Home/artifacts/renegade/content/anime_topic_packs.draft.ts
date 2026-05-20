import { Question } from "@/types/game";

// Draft-only internal topic packs for the generic "Anime" category.
// These are NOT top-level app categories. Keep category tiles generic for v1.
// Do not import this file into shipping category data until reviewed/playtested.

export interface AnimeTopicPack {
  topicId: string;
  displayName: string;
  parentCategoryId: "anime";
  questions: Question[];
}

const ANIME_TOPIC_PACKS_DRAFT: AnimeTopicPack[] = [
  {
    topicId: "naruto",
    displayName: "Naruto",
    parentCategoryId: "anime",
    questions: [
      {
        id: "nar_200_01",
        categoryId: "anime",
        tier: 200,
        prompt: "What title does Naruto dream of earning as the leader of the Hidden Leaf Village?",
        answer: "Hokage",
        acceptableAnswers: ["Hokage", "The Hokage"],
        source: "Naruto manga/anime premise; verify against official Naruto materials before shipping.",
      },
      {
        id: "nar_200_02",
        categoryId: "anime",
        tier: 200,
        prompt: "What tailed beast is sealed inside Naruto as a baby?",
        answer: "Nine-Tails",
        acceptableAnswers: ["Nine Tails", "Nine-Tailed Fox", "Kurama", "The Nine-Tails"],
        source: "https://en.wikipedia.org/wiki/Naruto_Uzumaki",
      },
      {
        id: "nar_400_01",
        categoryId: "anime",
        tier: 400,
        prompt: "During the Chunin Exams, which Sand Village ninja defeats Rock Lee after Lee opens multiple Inner Gates?",
        answer: "Gaara",
        acceptableAnswers: ["Gaara", "Gaara of the Sand"],
        source: "https://en.wikipedia.org/wiki/Rock_Lee",
      },
      {
        id: "nar_400_02",
        categoryId: "anime",
        tier: 400,
        prompt: "What lightning-based technique does Kakashi teach Sasuke before his fight with Gaara?",
        answer: "Chidori",
        acceptableAnswers: ["Chidori", "The Chidori"],
        source: "https://naruto.fandom.com/wiki/Chidori",
      },
      {
        id: "nar_600_01",
        categoryId: "anime",
        tier: 600,
        prompt: "What forbidden jutsu does Naruto learn from the stolen scroll in the very first chapter/episode?",
        answer: "Multi Shadow Clone Jutsu",
        acceptableAnswers: ["Shadow Clone Jutsu", "Multi Shadow Clone Technique", "Kage Bunshin"],
        explanation: "This rewards fans who remember the exact first-episode setup rather than just Naruto's general powers.",
        source: "Naruto chapter 1 / episode 1; verify against official release before shipping.",
      },
      {
        id: "nar_600_02",
        categoryId: "anime",
        tier: 600,
        prompt: "What genjutsu does Itachi use to mentally torture Kakashi during their early Shippuden-era confrontation?",
        answer: "Tsukuyomi",
        acceptableAnswers: ["Tsukuyomi"],
        source: "Naruto manga/anime Itachi vs Kakashi sequence; needs fan/source verification before shipping.",
      },
    ],
  },
  {
    topicId: "attack_on_titan",
    displayName: "Attack on Titan",
    parentCategoryId: "anime",
    questions: [
      {
        id: "aot_200_01",
        categoryId: "anime",
        tier: 200,
        prompt: "What military branch do Eren, Mikasa, and Armin join to fight Titans beyond the Walls?",
        answer: "Survey Corps",
        acceptableAnswers: ["Survey Corps", "Scout Regiment", "Scouts"],
        source: "https://attackontitan.fandom.com/wiki/Survey_Corps",
      },
      {
        id: "aot_200_02",
        categoryId: "anime",
        tier: 200,
        prompt: "What gear lets Attack on Titan soldiers swing through cities and forests to fight Titans?",
        answer: "ODM gear",
        acceptableAnswers: ["ODM gear", "Omni-Directional Mobility Gear", "Vertical Maneuvering Equipment"],
        source: "https://en.wikipedia.org/wiki/Attack_on_Titan",
      },
      {
        id: "aot_400_01",
        categoryId: "anime",
        tier: 400,
        prompt: "Which Titan is revealed to be Reiner Braun?",
        answer: "Armored Titan",
        acceptableAnswers: ["The Armored Titan", "Armored Titan"],
        source: "Attack on Titan manga/anime reveal; verify against official release before shipping.",
      },
      {
        id: "aot_400_02",
        categoryId: "anime",
        tier: 400,
        prompt: "What is Levi Ackerman's formal role within the Survey Corps?",
        answer: "Squad Captain",
        acceptableAnswers: ["Captain", "Squad Captain", "Captain Levi"],
        source: "https://attackontitan.fandom.com/wiki/Levi_Ackerman",
      },
      {
        id: "aot_600_01",
        categoryId: "anime",
        tier: 600,
        prompt: "What soldier's notebook gives Hange and Levi early evidence that some Titans may retain traces of human behavior?",
        answer: "Ilse Langnar",
        acceptableAnswers: ["Ilse", "Ilse Langnar", "Ilse's Notebook"],
        explanation: "This is a deep-cut lore question for fans who remember the OVA and early Titan mystery clues.",
        source: "https://attackontitan.fandom.com/wiki/Levi_Ackerman",
      },
      {
        id: "aot_600_02",
        categoryId: "anime",
        tier: 600,
        prompt: "What royal-family character does Eren need contact with to unlock the Founding Titan's full coordinate power?",
        answer: "Zeke Yeager",
        acceptableAnswers: ["Zeke", "Zeke Yeager", "Zeke Jaeger"],
        source: "https://en.wikipedia.org/wiki/Eren_Yeager",
      },
    ],
  },
  {
    topicId: "death_note",
    displayName: "Death Note",
    parentCategoryId: "anime",
    questions: [
      {
        id: "dn_200_01",
        categoryId: "anime",
        tier: 200,
        prompt: "What alias does Light Yagami use as the mysterious killer judged by the public?",
        answer: "Kira",
        acceptableAnswers: ["Kira"],
        source: "Death Note manga/anime premise; verify before shipping.",
      },
      {
        id: "dn_200_02",
        categoryId: "anime",
        tier: 200,
        prompt: "What shinigami drops the notebook that Light Yagami finds?",
        answer: "Ryuk",
        acceptableAnswers: ["Ryuk"],
        source: "Death Note manga/anime premise; verify before shipping.",
      },
      {
        id: "dn_400_01",
        categoryId: "anime",
        tier: 400,
        prompt: "What fake rule says a Death Note owner will die if they do not write a name for 13 days?",
        answer: "13-day rule",
        acceptableAnswers: ["The 13-day rule", "13 day rule"],
        source: "Death Note manga/anime notebook rules; needs source verification before shipping.",
      },
      {
        id: "dn_400_02",
        categoryId: "anime",
        tier: 400,
        prompt: "What food does Ryuk constantly crave in the human world?",
        answer: "Apples",
        acceptableAnswers: ["Apples", "Apple"],
        source: "Death Note manga/anime recurring character detail; verify before shipping.",
      },
      {
        id: "dn_600_01",
        categoryId: "anime",
        tier: 600,
        prompt: "What everyday snack bag does Light use to hide a mini TV while secretly watching criminal news under surveillance?",
        answer: "Potato chip bag",
        acceptableAnswers: ["Potato chips", "A potato chip bag", "Chip bag"],
        source: "Death Note manga/anime surveillance sequence; verify before shipping.",
      },
      {
        id: "dn_600_02",
        categoryId: "anime",
        tier: 600,
        prompt: "What successor of L is associated with toys, white hair, and the codename N?",
        answer: "Near",
        acceptableAnswers: ["Near", "N", "Nate River"],
        source: "Death Note manga/anime second arc; verify before shipping.",
      },
    ],
  },
];

export default ANIME_TOPIC_PACKS_DRAFT;
