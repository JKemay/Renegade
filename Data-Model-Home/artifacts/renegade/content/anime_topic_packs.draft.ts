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
        prompt:
          "What title does Naruto dream of earning as the leader of the Hidden Leaf Village?",
        answer: "Hokage",
        acceptableAnswers: ["Hokage", "The Hokage"],
        source:
          "Naruto manga/anime premise; verify against official Naruto materials before shipping.",
      },
      {
        id: "nar_200_02",
        categoryId: "anime",
        tier: 200,
        prompt: "What tailed beast is sealed inside Naruto as a baby?",
        answer: "Nine-Tails",
        acceptableAnswers: [
          "Nine Tails",
          "Nine-Tailed Fox",
          "Kurama",
          "The Nine-Tails",
        ],
        source: "https://en.wikipedia.org/wiki/Naruto_Uzumaki",
      },
      {
        id: "nar_400_01",
        categoryId: "anime",
        tier: 400,
        prompt:
          "During the Chunin Exams, which Sand Village ninja defeats Rock Lee after Lee opens multiple Inner Gates?",
        answer: "Gaara",
        acceptableAnswers: ["Gaara", "Gaara of the Sand"],
        source: "https://en.wikipedia.org/wiki/Rock_Lee",
      },
      {
        id: "nar_400_02",
        categoryId: "anime",
        tier: 400,
        prompt:
          "What lightning-based technique does Kakashi teach Sasuke before his fight with Gaara?",
        answer: "Chidori",
        acceptableAnswers: ["Chidori", "The Chidori"],
        source: "https://naruto.fandom.com/wiki/Chidori",
      },
      {
        id: "nar_600_01",
        categoryId: "anime",
        tier: 600,
        prompt:
          "What forbidden jutsu does Naruto learn from the stolen scroll in the very first chapter/episode?",
        answer: "Multi Shadow Clone Jutsu",
        acceptableAnswers: [
          "Shadow Clone Jutsu",
          "Multi Shadow Clone Technique",
          "Kage Bunshin",
        ],
        explanation:
          "This rewards fans who remember the exact first-episode setup rather than just Naruto's general powers.",
        source:
          "Naruto chapter 1 / episode 1; verify against official release before shipping.",
      },
      {
        id: "nar_600_02",
        categoryId: "anime",
        tier: 600,
        prompt:
          "What genjutsu does Itachi use to mentally torture Kakashi during their early Shippuden-era confrontation?",
        answer: "Tsukuyomi",
        acceptableAnswers: ["Tsukuyomi"],
        source:
          "Naruto manga/anime Itachi vs Kakashi sequence; needs fan/source verification before shipping.",
      },
      {
        id: "nar_600_03",
        categoryId: "anime",
        tier: 600,
        prompt:
          "Who was the only person to ever survive the 'Night Guy' technique performed by Might Guy during the Fourth Shinobi World War?",
        answer: "Madara Uchiha",
        acceptableAnswers: ["Madara", "Madara Uchiha"],
        explanation:
          "Might Guy opened all eight gates to use Night Guy against Madara. Although it nearly killed Madara and completely shattered Guy's leg, Madara survived due to his Six Paths regeneration.",
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
        prompt:
          "What military branch do Eren, Mikasa, and Armin join to fight Titans beyond the Walls?",
        answer: "Survey Corps",
        acceptableAnswers: ["Survey Corps", "Scout Regiment", "Scouts"],
        source: "https://attackontitan.fandom.com/wiki/Survey_Corps",
      },
      {
        id: "aot_200_02",
        categoryId: "anime",
        tier: 200,
        prompt:
          "What gear lets Attack on Titan soldiers swing through cities and forests to fight Titans?",
        answer: "ODM gear",
        acceptableAnswers: [
          "ODM gear",
          "Omni-Directional Mobility Gear",
          "Vertical Maneuvering Equipment",
        ],
        source: "https://en.wikipedia.org/wiki/Attack_on_Titan",
      },
      {
        id: "aot_400_01",
        categoryId: "anime",
        tier: 400,
        prompt: "Which Titan is revealed to be Reiner Braun?",
        answer: "Armored Titan",
        acceptableAnswers: ["The Armored Titan", "Armored Titan"],
        source:
          "Attack on Titan manga/anime reveal; verify against official release before shipping.",
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
        prompt:
          "What soldier's notebook gives Hange and Levi early evidence that some Titans may retain traces of human behavior?",
        answer: "Ilse Langnar",
        acceptableAnswers: ["Ilse", "Ilse Langnar", "Ilse's Notebook"],
        explanation:
          "This is a deep-cut lore question for fans who remember the OVA and early Titan mystery clues.",
        source: "https://attackontitan.fandom.com/wiki/Levi_Ackerman",
      },
      {
        id: "aot_600_02",
        categoryId: "anime",
        tier: 600,
        prompt:
          "What is the true identity of the 'Smiling Titan' who ate Eren's mother, and what was her relationship to the Yeager family?",
        answer: "Dina Fritz, Grisha Yeager's first wife.",
        acceptableAnswers: [
          "Dina Fritz",
          "Grisha's first wife",
          "Zeke's mother",
        ],
        explanation:
          "Dina Fritz was a member of the royal family and Grisha's first wife in Marley. She was turned into a Pure Titan, which later coincidentally encountered and ate Carla Yeager.",
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
        prompt:
          "What alias does Light Yagami use as the mysterious killer judged by the public?",
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
        prompt:
          "What fake rule says a Death Note owner will die if they do not write a name for 13 days?",
        answer: "13-day rule",
        acceptableAnswers: ["The 13-day rule", "13 day rule"],
        source:
          "Death Note manga/anime notebook rules; needs source verification before shipping.",
      },
      {
        id: "dn_400_02",
        categoryId: "anime",
        tier: 400,
        prompt: "What food does Ryuk constantly crave in the human world?",
        answer: "Apples",
        acceptableAnswers: ["Apples", "Apple"],
        source:
          "Death Note manga/anime recurring character detail; verify before shipping.",
      },
      {
        id: "dn_600_01",
        categoryId: "anime",
        tier: 600,
        prompt:
          "What everyday snack bag does Light use to hide a mini TV while secretly watching criminal news under surveillance?",
        answer: "Potato chip bag",
        acceptableAnswers: ["Potato chips", "A potato chip bag", "Chip bag"],
        source:
          "Death Note manga/anime surveillance sequence; verify before shipping.",
      },
      {
        id: "dn_600_02",
        categoryId: "anime",
        tier: 600,
        prompt:
          "What successor of L is associated with toys, white hair, and the codename N?",
        answer: "Near",
        acceptableAnswers: ["Near", "N", "Nate River"],
        source: "Death Note manga/anime second arc; verify before shipping.",
      },
    ],
  },
  {
    topicId: "tokyo_ghoul",
    displayName: "Tokyo Ghoul",
    parentCategoryId: "anime",
    questions: [
      {
        id: "tg_200_01",
        categoryId: "anime",
        tier: 200,
        prompt:
          "What is the name of the cafe in the 20th Ward where Kaneki and other ghouls meet to hide among humans?",
        answer: "Anteiku",
        acceptableAnswers: ["Anteiku"],
      },
      {
        id: "tg_400_01",
        categoryId: "anime",
        tier: 400,
        prompt:
          "Who is the ghoul known as 'The Gourmet' who becomes obsessed with Kaneki's unique smell after he becomes a half-ghoul?",
        answer: "Shu Tsukiyama",
        acceptableAnswers: ["Shu Tsukiyama", "Tsukiyama", "The Gourmet"],
      },
      {
        id: "tg_600_01",
        categoryId: "anime",
        tier: 600,
        prompt:
          "Why does Kaneki develop the iconic habit of cracking his index finger over his thumb, especially during intense combat?",
        answer:
          "It was a habit of his torturer, Yamori (Jason), which Kaneki adopted as a trauma response and symbol of his transformation.",
        acceptableAnswers: [
          "Trauma from Yamori's torture",
          "He copied it from Yamori",
          "Jason did it to him while torturing him",
          "Psychological response to abuse",
        ],
        explanation:
          "During his brutal torture by Yamori (Jason), the habit of finger-cracking was seared into Kaneki's subconscious. He later adopted it as he accepted his ghoul side, representing both his trauma and the cycle of violence.",
      },
    ],
  },
  {
    topicId: "one_piece",
    displayName: "One Piece",
    parentCategoryId: "anime",
    questions: [
      {
        id: "op_200_01",
        categoryId: "anime",
        tier: 200,
        prompt:
          "Who is the captain of the Straw Hat Pirates and the man who dreams of becoming the Pirate King?",
        answer: "Monkey D. Luffy",
        acceptableAnswers: ["Luffy", "Monkey D. Luffy", "Straw Hat Luffy"],
      },
      {
        id: "op_400_01",
        categoryId: "anime",
        tier: 400,
        prompt:
          "What is the true name of the Gomu Gomu no Mi, as revealed during the battle against Kaido in the Wano arc?",
        answer: "Hito Hito no Mi, Model: Nika",
        acceptableAnswers: [
          "Hito Hito no Mi Model Nika",
          "Human-Human Fruit Model Nika",
          "Sun God Nika fruit",
        ],
      },
      {
        id: "op_600_01",
        categoryId: "anime",
        tier: 600,
        prompt:
          "Which member of the Roger Pirates was the only one known to be able to read and write the ancient language of the Poneglyphs, besides the scholars of Ohara?",
        answer: "Kozuki Oden",
        acceptableAnswers: ["Oden", "Kozuki Oden"],
        explanation:
          "Oden was a descendant of the Kozuki family, the creators of the Poneglyphs, and was recruited by Roger specifically for his ability to read them.",
      },
    ],
  },
  {
    topicId: "jujutsu_kaisen",
    displayName: "Jujutsu Kaisen",
    parentCategoryId: "anime",
    questions: [
      {
        id: "jjk_200_01",
        categoryId: "anime",
        tier: 200,
        prompt:
          "Who is the main protagonist of Jujutsu Kaisen who becomes the vessel for Ryomen Sukuna?",
        answer: "Yuji Itadori",
        acceptableAnswers: ["Yuji Itadori", "Yuji", "Itadori"],
      },
      {
        id: "jjk_400_01",
        categoryId: "anime",
        tier: 400,
        prompt:
          "What is the name of Satoru Gojo's Domain Expansion, which traps opponents in a void of infinite information?",
        answer: "Infinite Void",
        acceptableAnswers: ["Infinite Void", "Muryo Kusho"],
      },
      {
        id: "jjk_600_01",
        categoryId: "anime",
        tier: 600,
        prompt:
          "What is the specific name of the 'Binding Vow' that Sukuna made with Yuji Itadori to allow him to take over Yuji's body for one minute?",
        answer: "Enchain",
        acceptableAnswers: ["Enchain", "Keiyaku"],
        explanation:
          "The vow 'Enchain' allows Sukuna to take control for one minute under the condition that he doesn't kill anyone during that time, and Yuji will forget the vow ever happened.",
      },
    ],
  },
  {
    topicId: "hunter_x_hunter",
    displayName: "Hunter x Hunter",
    parentCategoryId: "anime",
    questions: [
      {
        id: "hxh_200_01",
        categoryId: "anime",
        tier: 200,
        prompt:
          "What is the name of the mysterious energy that Hunters use to manifest their unique powers?",
        answer: "Nen",
        acceptableAnswers: ["Nen"],
      },
      {
        id: "hxh_600_01",
        categoryId: "anime",
        tier: 600,
        prompt:
          "During the Chimera Ant arc, what is the name of the complex board game that the King (Meruem) plays against the blind champion Komugi?",
        answer: "Gungi",
        acceptableAnswers: ["Gungi"],
        explanation:
          "Gungi is a fictional board game originating from the Republic of East Gorteau. The King's inability to defeat Komugi at Gungi is central to his character development and understanding of human potential.",
      },
    ],
  },
];

export default ANIME_TOPIC_PACKS_DRAFT;
