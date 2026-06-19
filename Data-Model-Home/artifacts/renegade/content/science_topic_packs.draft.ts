import { Question } from "@/types/game";

// Draft-only internal topic packs for Science categories.
// Covers Physics, Chemistry, and Biology at all three tiers.
// Do not import this file into shipping category data until reviewed/playtested.

export interface ScienceTopicPack {
    topicId: string;
    displayName: string;
    parentCategoryId: "science";
    questions: Question[];
}

const SCIENCE_TOPIC_PACKS_DRAFT: ScienceTopicPack[] = [
  {
        topicId: "physics",
        displayName: "Physics",
        parentCategoryId: "science",
        questions: [
          {
                    id: "phy_200_01",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What is the SI unit of force?",
                    answer: "Newton",
                    acceptableAnswers: ["Newton", "N"],
                              explanation: "Named after Sir Isaac Newton, one newton is the force needed to accelerate 1 kg at 1 m/s².",
          },
          {
                    id: "phy_200_02",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What speed does light travel at in a vacuum, rounded to the nearest thousand km/s?",
                    answer: "300,000 km/s",
                    acceptableAnswers: ["300000 km/s", "300,000", "3 x 10^8 m/s"],
                              explanation: "The speed of light in a vacuum is approximately 299,792 km/s.",
          },
          {
                    id: "phy_200_03",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What force keeps planets in orbit around the Sun?",
                    answer: "Gravity",
                    acceptableAnswers: ["Gravity", "Gravitational force", "Gravitational pull"],
          },
          {
                    id: "phy_400_01",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "What physical quantity is measured in henrys?",
                    answer: "Inductance",
                    acceptableAnswers: ["Inductance", "Electrical inductance"],
                              explanation: "The henry (H) is named after Joseph Henry, who discovered electromagnetic self-inductance.",
          },
          {
                    id: "phy_400_02",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "In Einstein's famous equation E = mc², what does 'c' represent?",
                    answer: "The speed of light",
                    acceptableAnswers: ["Speed of light", "The speed of light in a vacuum", "c"],
          },
          {
                    id: "phy_400_03",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "What law states that the pressure of a gas is inversely proportional to its volume at constant temperature?",
                    answer: "Boyle's Law",
                    acceptableAnswers: ["Boyle's Law", "Boyles Law"],
          },
          {
                    id: "phy_600_01",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What is the name of the hypothetical particle that mediates the gravitational force in quantum field theory?",
                    answer: "Graviton",
                    acceptableAnswers: ["Graviton"],
                              explanation: "The graviton is a theoretical massless spin-2 boson that has not yet been experimentally detected.",
          },
          {
                    id: "phy_600_02",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What principle states that it is impossible to simultaneously know both the exact position and momentum of a particle?",
                    answer: "Heisenberg's Uncertainty Principle",
                    acceptableAnswers: ["Uncertainty Principle", "Heisenberg Uncertainty Principle", "Heisenberg's Uncertainty Principle"],
          },
          {
                    id: "phy_600_03",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What is the Chandrasekhar limit, approximately in solar masses?",
                    answer: "1.4 solar masses",
                    acceptableAnswers: ["1.4", "1.44", "1.4 solar masses", "1.44 solar masses"],
                              explanation: "Above this mass limit, electron degeneracy pressure cannot support a white dwarf against gravitational collapse.",
          },
              ],
  },
  {
        topicId: "chemistry",
        displayName: "Chemistry",
        parentCategoryId: "science",
        questions: [
          {
                    id: "chem_200_01",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What is the chemical symbol for gold?",
                    answer: "Au",
                    acceptableAnswers: ["Au"],
                              explanation: "From the Latin 'aurum', meaning gold.",
          },
          {
                    id: "chem_200_02",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What is the most abundant gas in Earth's atmosphere?",
                    answer: "Nitrogen",
                    acceptableAnswers: ["Nitrogen", "N2"],
                              explanation: "Nitrogen makes up about 78% of the atmosphere.",
          },
          {
                    id: "chem_200_03",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "How many elements are in the periodic table as of 2024?",
                    answer: "118",
                    acceptableAnswers: ["118"],
          },
          {
                    id: "chem_400_01",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "What type of chemical bond involves the sharing of electron pairs between atoms?",
                    answer: "Covalent bond",
                    acceptableAnswers: ["Covalent", "Covalent bond"],
          },
          {
                    id: "chem_400_02",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "What is the pH of a neutral solution at 25°C?",
                    answer: "7",
                    acceptableAnswers: ["7", "Seven"],
          },
          {
                    id: "chem_400_03",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "Which element has the highest electronegativity on the Pauling scale?",
                    answer: "Fluorine",
                    acceptableAnswers: ["Fluorine", "F"],
                              explanation: "Fluorine has an electronegativity of 3.98 on the Pauling scale.",
          },
          {
                    id: "chem_600_01",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What is the name of the reaction mechanism where a nucleophile attacks a saturated carbon in a single concerted step?",
                    answer: "SN2",
                    acceptableAnswers: ["SN2", "S_N2", "Bimolecular nucleophilic substitution"],
                              explanation: "SN2 reactions proceed with inversion of stereochemistry (Walden inversion).",
          },
          {
                    id: "chem_600_02",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What is the name of the rule that states each orbital in a subshell is singly occupied before any is doubly occupied?",
                    answer: "Hund's Rule",
                    acceptableAnswers: ["Hund's Rule", "Hunds Rule", "Hund's Rule of Maximum Multiplicity"],
          },
          {
                    id: "chem_600_03",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What catalyst is commonly used in the Haber process for synthesizing ammonia?",
                    answer: "Iron",
                    acceptableAnswers: ["Iron", "Fe", "Iron catalyst", "Magnetite"],
                              explanation: "The Haber process uses finely divided iron with potassium hydroxide promoter at ~450°C and 200 atm.",
          },
              ],
  },
  {
        topicId: "biology",
        displayName: "Biology",
        parentCategoryId: "science",
        questions: [
          {
                    id: "bio_200_01",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What organelle is known as the 'powerhouse of the cell'?",
                    answer: "Mitochondria",
                    acceptableAnswers: ["Mitochondria", "Mitochondrion"],
          },
          {
                    id: "bio_200_02",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What molecule carries genetic information in most living organisms?",
                    answer: "DNA",
                    acceptableAnswers: ["DNA", "Deoxyribonucleic acid"],
          },
          {
                    id: "bio_200_03",
                    categoryId: "science",
                    tier: 200,
                    prompt:
                      "What process do plants use to convert sunlight into energy?",
                    answer: "Photosynthesis",
                    acceptableAnswers: ["Photosynthesis"],
          },
          {
                    id: "bio_400_01",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "What is the name of the process by which cells divide to produce two identical daughter cells?",
                    answer: "Mitosis",
                    acceptableAnswers: ["Mitosis"],
          },
          {
                    id: "bio_400_02",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "What enzyme unwinds the DNA double helix during replication?",
                    answer: "Helicase",
                    acceptableAnswers: ["Helicase", "DNA helicase"],
          },
          {
                    id: "bio_400_03",
                    categoryId: "science",
                    tier: 400,
                    prompt:
                      "What is the term for an organism that can produce its own food using light or chemical energy?",
                    answer: "Autotroph",
                    acceptableAnswers: ["Autotroph", "Producer"],
          },
          {
                    id: "bio_600_01",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What is the name of the regulatory sequences in DNA that enhance transcription of a gene and can act at a distance from the promoter?",
                    answer: "Enhancers",
                    acceptableAnswers: ["Enhancers", "Enhancer sequences", "Enhancer elements"],
          },
          {
                    id: "bio_600_02",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "In the Calvin cycle, what enzyme catalyzes the fixation of CO2 to ribulose bisphosphate?",
                    answer: "RuBisCO",
                    acceptableAnswers: ["RuBisCO", "Rubisco", "Ribulose-1,5-bisphosphate carboxylase/oxygenase"],
                              explanation: "RuBisCO is the most abundant protein on Earth.",
          },
          {
                    id: "bio_600_03",
                    categoryId: "science",
                    tier: 600,
                    prompt:
                      "What is the term for horizontal gene transfer mediated by bacteriophages?",
                    answer: "Transduction",
                    acceptableAnswers: ["Transduction", "Phage transduction"],
                              explanation: "Transduction can be generalized (random DNA) or specialized (specific genes near phage integration site).",
          },
              ],
  },
  ];

export default SCIENCE_TOPIC_PACKS_DRAFT;
