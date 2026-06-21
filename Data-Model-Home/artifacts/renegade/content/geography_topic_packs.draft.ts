import { Question } from "@/types/game";

// Draft-only internal topic packs for Geography categories.
// Covers World Capitals, Natural Wonders, and Famous Landmarks at all three tiers.
// Do not import this file into shipping category data until reviewed/playtested.

export interface GeographyTopicPack {
    topicId: string;
    displayName: string;
    parentCategoryId: "geography";
    questions: Question[];
}

const GEOGRAPHY_TOPIC_PACKS_DRAFT: GeographyTopicPack[] = [
  {
        topicId: "world_capitals",
        displayName: "World Capitals",
        parentCategoryId: "geography",
        questions: [
          {
                    id: "geo_cap_200_01",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "What is the capital of France?",
                    answer: "Paris",
                    acceptableAnswers: ["Paris"],
                              explanation: "Paris has been the capital of France since the 10th century and is the country's largest city.",
          },
          {
                    id: "geo_cap_200_02",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "What is the capital of Japan?",
                    answer: "Tokyo",
                    acceptableAnswers: ["Tokyo"],
                              explanation: "Tokyo became Japan's capital in 1868 when the Emperor moved from Kyoto. Its metropolitan area is the most populous in the world.",
          },
          {
                    id: "geo_cap_200_03",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "What is the capital of Brazil?",
                    answer: "Brasília",
                    acceptableAnswers: ["Brasilia", "Brasília"],
                              explanation: "Brasília replaced Rio de Janeiro as Brazil's capital in 1960. It was purpose-built and designed by Oscar Niemeyer.",
          },
          {
                    id: "geo_cap_400_01",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "What is the capital of Myanmar?",
                    answer: "Naypyidaw",
                    acceptableAnswers: ["Naypyidaw", "Nay Pyi Taw"],
                              explanation: "Naypyidaw replaced Yangon (Rangoon) as Myanmar's capital in 2006. The move was largely kept secret until it was announced.",
          },
          {
                    id: "geo_cap_400_02",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "What is the capital of Nigeria?",
                    answer: "Abuja",
                    acceptableAnswers: ["Abuja"],
                              explanation: "Abuja replaced Lagos as Nigeria's capital in 1991. It was chosen for its central location and political neutrality.",
          },
          {
                    id: "geo_cap_400_03",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "What is the capital of Sri Lanka?",
                    answer: "Sri Jayawardenepura Kotte",
                    acceptableAnswers: ["Sri Jayawardenepura Kotte", "Kotte"],
                              explanation: "Sri Jayawardenepura Kotte is the legislative capital, while Colombo serves as the commercial capital.",
          },
          {
                    id: "geo_cap_600_01",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What is the capital of Palau?",
                    answer: "Ngerulmud",
                    acceptableAnswers: ["Ngerulmud"],
                              explanation: "Ngerulmud replaced Koror as Palau's capital in 2006. It is one of the least populated capital cities in the world.",
          },
          {
                    id: "geo_cap_600_02",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What is the capital of Nauru?",
                    answer: "Yaren",
                    acceptableAnswers: ["Yaren", "no official capital"],
                              explanation: "Nauru has no official capital, but Yaren is the de facto seat of government and largest settlement.",
          },
          {
                    id: "geo_cap_600_03",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What Central Asian capital was known as Astana, then Nur-Sultan, then reverted back to Astana in 2022?",
                    answer: "Astana",
                    acceptableAnswers: ["Astana", "Nur-Sultan"],
                              explanation: "Kazakhstan's capital was renamed Nur-Sultan in 2019 to honor former president Nursultan Nazarbayev, but reverted to Astana in September 2022.",
          },
              ],
  },
  {
        topicId: "natural_wonders",
        displayName: "Natural Wonders",
        parentCategoryId: "geography",
        questions: [
          {
                    id: "geo_nat_200_01",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "What is the longest river in the world?",
                    answer: "The Nile",
                    acceptableAnswers: ["Nile", "The Nile", "Nile River"],
                              explanation: "The Nile stretches approximately 6,650 km through northeastern Africa, flowing through 11 countries.",
          },
          {
                    id: "geo_nat_200_02",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "What is the largest desert in the world?",
                    answer: "The Sahara",
                    acceptableAnswers: ["Sahara", "The Sahara", "Sahara Desert"],
                              explanation: "The Sahara covers about 9.2 million square kilometers across North Africa, making it the largest hot desert. Antarctica is the largest desert overall.",
          },
          {
                    id: "geo_nat_200_03",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "What is the tallest mountain in the world?",
                    answer: "Mount Everest",
                    acceptableAnswers: ["Everest", "Mount Everest", "Mt. Everest", "Mt Everest"],
                              explanation: "Mount Everest stands at 8,849 meters (29,032 feet) above sea level on the border of Nepal and Tibet.",
          },
          {
                    id: "geo_nat_400_01",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "In which country would you find Angel Falls, the world's tallest uninterrupted waterfall?",
                    answer: "Venezuela",
                    acceptableAnswers: ["Venezuela"],
                              explanation: "Angel Falls drops 979 meters from the Auyán-tepui mountain in Canaima National Park, Venezuela.",
          },
          {
                    id: "geo_nat_400_02",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "What is the deepest lake in the world?",
                    answer: "Lake Baikal",
                    acceptableAnswers: ["Baikal", "Lake Baikal"],
                              explanation: "Lake Baikal in Siberia, Russia reaches a maximum depth of 1,642 meters and contains roughly 20% of the world's unfrozen surface fresh water.",
          },
          {
                    id: "geo_nat_400_03",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "The Mariana Trench, the deepest point in the ocean, is located in which ocean?",
                    answer: "Pacific Ocean",
                    acceptableAnswers: ["Pacific", "Pacific Ocean"],
                              explanation: "The Mariana Trench reaches nearly 11,000 meters deep at Challenger Deep, located in the western Pacific near the Mariana Islands.",
          },
          {
                    id: "geo_nat_600_01",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What volcanic island in the Indian Ocean is the only known habitat of the Aldabra giant tortoise in the wild?",
                    answer: "Aldabra Atoll",
                    acceptableAnswers: ["Aldabra", "Aldabra Atoll"],
                              explanation: "Aldabra Atoll in the Seychelles is a UNESCO World Heritage Site and home to about 100,000 giant tortoises.",
          },
          {
                    id: "geo_nat_600_02",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What is the name of the large, high plateau in South America that spans parts of Bolivia, Peru, Argentina, and Chile?",
                    answer: "Altiplano",
                    acceptableAnswers: ["Altiplano", "Andean Plateau"],
                              explanation: "The Altiplano is the most extensive high plateau outside Tibet, sitting at about 3,750 meters elevation in the Andes.",
          },
          {
                    id: "geo_nat_600_03",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What Ethiopian geological depression, one of the hottest places on Earth, sits at the junction of three tectonic plates?",
                    answer: "Danakil Depression",
                    acceptableAnswers: ["Danakil", "Danakil Depression", "Afar Depression"],
                              explanation: "The Danakil Depression in the Afar Triangle averages 34.4°C year-round and sits where the Nubian, Somali, and Arabian plates diverge.",
          },
              ],
  },
  {
        topicId: "famous_landmarks",
        displayName: "Famous Landmarks",
        parentCategoryId: "geography",
        questions: [
          {
                    id: "geo_lmk_200_01",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "In which city would you find the Colosseum?",
                    answer: "Rome",
                    acceptableAnswers: ["Rome", "Roma"],
                              explanation: "The Colosseum was completed in 80 AD and could hold between 50,000 and 80,000 spectators for gladiatorial contests.",
          },
          {
                    id: "geo_lmk_200_02",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "The Great Wall was primarily built to protect which country from invasions?",
                    answer: "China",
                    acceptableAnswers: ["China"],
                              explanation: "Construction of the Great Wall spanned centuries, with the most well-known sections built during the Ming Dynasty (1368-1644).",
          },
          {
                    id: "geo_lmk_200_03",
                    categoryId: "geography",
                    tier: 200,
                    prompt:
                      "In which country is Machu Picchu located?",
                    answer: "Peru",
                    acceptableAnswers: ["Peru"],
                              explanation: "Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge 2,430 meters above sea level in the Andes.",
          },
          {
                    id: "geo_lmk_400_01",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "In which country is the ancient rock-carved city of Petra?",
                    answer: "Jordan",
                    acceptableAnswers: ["Jordan"],
                              explanation: "Petra was the capital of the Nabataean Kingdom and is famous for its rock-cut architecture and water conduit system.",
          },
          {
                    id: "geo_lmk_400_02",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "What is the name of the massive temple complex in Cambodia that is the largest religious structure in the world?",
                    answer: "Angkor Wat",
                    acceptableAnswers: ["Angkor Wat"],
                              explanation: "Angkor Wat was originally built as a Hindu temple in the early 12th century and gradually transformed into a Buddhist temple.",
          },
          {
                    id: "geo_lmk_400_03",
                    categoryId: "geography",
                    tier: 400,
                    prompt:
                      "What iconic bridge in San Francisco was the longest suspension bridge span in the world when it opened in 1937?",
                    answer: "Golden Gate Bridge",
                    acceptableAnswers: ["Golden Gate", "Golden Gate Bridge"],
                              explanation: "The Golden Gate Bridge's main span of 1,280 meters held the record until 1964. Its distinctive orange color is called 'International Orange.'",
          },
          {
                    id: "geo_lmk_600_01",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What ancient Ethiopian city is home to a cluster of eleven medieval monolithic rock-hewn churches, a UNESCO World Heritage Site?",
                    answer: "Lalibela",
                    acceptableAnswers: ["Lalibela"],
                              explanation: "The rock-hewn churches of Lalibela were carved in the 12th-13th centuries and are still active places of worship and pilgrimage.",
          },
          {
                    id: "geo_lmk_600_02",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What megalithic temple complex on Malta, dating to around 3600 BC, is older than Stonehenge and the Egyptian pyramids?",
                    answer: "Ggantija",
                    acceptableAnswers: ["Ggantija", "Ggantija Temples"],
                              explanation: "The Ggantija temples on the island of Gozo are among the world's oldest free-standing structures, predating Stonehenge by over 1,000 years.",
          },
          {
                    id: "geo_lmk_600_03",
                    categoryId: "geography",
                    tier: 600,
                    prompt:
                      "What ancient Polynesian statues on Easter Island are known by what name?",
                    answer: "Moai",
                    acceptableAnswers: ["Moai", "Moai statues"],
                              explanation: "The Rapa Nui people carved roughly 900 Moai between 1250 and 1500 AD. The tallest erected Moai stands nearly 10 meters tall.",
          },
              ],
  },
  ];

export default GEOGRAPHY_TOPIC_PACKS_DRAFT;
