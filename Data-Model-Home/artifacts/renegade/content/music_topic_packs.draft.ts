import { Question } from "@/types/game";

// Draft-only internal topic packs for Music categories.
// Covers Hip-Hop, Rock, and Pop at all three tiers.
// Do not import this file into shipping category data until reviewed/playtested.

export interface MusicTopicPack {
    topicId: string;
    displayName: string;
    parentCategoryId: "music";
    questions: Question[];
}

const MUSIC_TOPIC_PACKS_DRAFT: MusicTopicPack[] = [
  {
        topicId: "hiphop",
        displayName: "Hip-Hop",
        parentCategoryId: "music",
        questions: [
          {
                    id: "hip_200_01",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "What rapper's debut album 'Illmatic' is widely regarded as one of the greatest hip-hop albums ever?",
                    answer: "Nas",
                    acceptableAnswers: ["Nas", "Nasir Jones"],
                              explanation: "Released in 1994, Illmatic defined the sound of East Coast hip-hop and is considered a masterpiece of lyricism.",
          },
          {
                    id: "hip_200_02",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "Which hip-hop group released the hit 'Hey Ya!' in 2003?",
                    answer: "OutKast",
                    acceptableAnswers: ["OutKast", "Outkast"],
                              explanation: "Andre 3000 and Big Boi formed OutKast. 'Hey Ya!' topped the Billboard Hot 100 for nine weeks.",
          },
          {
                    id: "hip_200_03",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "What is the stage name of Marshall Mathers?",
                    answer: "Eminem",
                    acceptableAnswers: ["Eminem", "Slim Shady"],
                              explanation: "Eminem is one of the best-selling music artists of all time, with over 220 million records sold worldwide.",
          },
          {
                    id: "hip_400_01",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What Kendrick Lamar album won the Pulitzer Prize for Music in 2018?",
                    answer: "DAMN.",
                    acceptableAnswers: ["DAMN.", "DAMN", "Damn"],
                              explanation: "DAMN. was the first non-classical, non-jazz album to win the Pulitzer Prize for Music.",
          },
          {
                    id: "hip_400_02",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "Which rapper founded the record label Death Row Records alongside Suge Knight?",
                    answer: "Dr. Dre",
                    acceptableAnswers: ["Dr. Dre", "Dre", "Andre Young"],
                              explanation: "Death Row Records was founded in 1991 and became one of the most influential hip-hop labels of the 1990s.",
          },
          {
                    id: "hip_400_03",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What Wu-Tang Clan member released the solo album 'Only Built 4 Cuban Linx...'?",
                    answer: "Raekwon",
                    acceptableAnswers: ["Raekwon", "Raekwon the Chef"],
                              explanation: "Released in 1995, it's considered a cornerstone of mafioso rap and one of the best hip-hop albums of the '90s.",
          },
          {
                    id: "hip_600_01",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What was the name of the first commercially released hip-hop single, recorded in 1979?",
                    answer: "Rapper's Delight",
                    acceptableAnswers: ["Rapper's Delight", "Rappers Delight"],
                              explanation: "Recorded by The Sugarhill Gang, it sampled Chic's 'Good Times' and reached #36 on the Billboard Hot 100.",
          },
          {
                    id: "hip_600_02",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What MF DOOM album, released in 1999, shares its name with a Marvel Comics character?",
                    answer: "Operation: Doomsday",
                    acceptableAnswers: ["Operation: Doomsday", "Operation Doomsday"],
                              explanation: "MF DOOM's debut solo album established his supervillain persona inspired by Marvel's Doctor Doom.",
          },
          {
                    id: "hip_600_03",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What DJ technique, pioneered by Grand Wizzard Theodore in the late 1970s, involves moving a vinyl record back and forth on a turntable?",
                    answer: "Scratching",
                    acceptableAnswers: ["Scratching", "Scratch", "Record scratching"],
                              explanation: "Grand Wizzard Theodore accidentally discovered scratching as a teenager and it became a foundational element of hip-hop DJing.",
          },
              ],
  },
  {
        topicId: "rock",
        displayName: "Rock",
        parentCategoryId: "music",
        questions: [
          {
                    id: "rock_200_01",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "What band recorded 'Stairway to Heaven'?",
                    answer: "Led Zeppelin",
                    acceptableAnswers: ["Led Zeppelin"],
                              explanation: "'Stairway to Heaven' appeared on Led Zeppelin IV (1971) and is one of the most iconic rock songs ever.",
          },
          {
                    id: "rock_200_02",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "Who was the lead singer of Queen?",
                    answer: "Freddie Mercury",
                    acceptableAnswers: ["Freddie Mercury", "Mercury"],
                              explanation: "Born Farrokh Bulsara, Freddie Mercury is regarded as one of the greatest vocalists in rock history.",
          },
          {
                    id: "rock_200_03",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "What Seattle band's 1991 album 'Nevermind' is credited with bringing grunge to the mainstream?",
                    answer: "Nirvana",
                    acceptableAnswers: ["Nirvana"],
                              explanation: "Led by Kurt Cobain, Nirvana's Nevermind sold over 30 million copies and featured the hit 'Smells Like Teen Spirit'.",
          },
          {
                    id: "rock_400_01",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What concept album by Pink Floyd was inspired by Roger Waters' feelings of isolation during live concerts?",
                    answer: "The Wall",
                    acceptableAnswers: ["The Wall"],
                              explanation: "Released in 1979, The Wall is a rock opera exploring themes of abandonment, isolation, and self-imposed barriers.",
          },
          {
                    id: "rock_400_02",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What guitarist is known for playing a homemade guitar called the 'Red Special'?",
                    answer: "Brian May",
                    acceptableAnswers: ["Brian May", "May"],
                              explanation: "Queen's guitarist Brian May built the Red Special with his father from an old fireplace mantel and other household items.",
          },
          {
                    id: "rock_400_03",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What Radiohead album, released in 2000, marked the band's experimental shift toward electronic music?",
                    answer: "Kid A",
                    acceptableAnswers: ["Kid A"],
                              explanation: "Kid A was a radical departure from Radiohead's guitar-driven sound and topped charts worldwide despite no singles being released.",
          },
          {
                    id: "rock_600_01",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What guitarist, known as 'Slowhand', played in the Yardbirds, Cream, and had a prolific solo career?",
                    answer: "Eric Clapton",
                    acceptableAnswers: ["Eric Clapton", "Clapton"],
                              explanation: "Clapton is the only three-time inductee into the Rock and Roll Hall of Fame.",
          },
          {
                    id: "rock_600_02",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What 1967 Jimi Hendrix album, often cited as one of the greatest debut albums, shares a name with a question about personal identity?",
                    answer: "Are You Experienced",
                    acceptableAnswers: ["Are You Experienced", "Are You Experienced?"],
                              explanation: "It reached #2 in the US and #5 in the UK, introducing the world to Hendrix's revolutionary guitar style.",
          },
          {
                    id: "rock_600_03",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What progressive rock band released 'Close to the Edge' in 1972, featuring a single 18-minute title track?",
                    answer: "Yes",
                    acceptableAnswers: ["Yes"],
                              explanation: "Close to the Edge is considered a pinnacle of progressive rock, showcasing complex arrangements and virtuoso musicianship.",
          },
              ],
  },
  {
        topicId: "pop",
        displayName: "Pop",
        parentCategoryId: "music",
        questions: [
          {
                    id: "pop_200_01",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "What artist's 'Thriller' is the best-selling album of all time?",
                    answer: "Michael Jackson",
                    acceptableAnswers: ["Michael Jackson", "MJ"],
                              explanation: "Released in 1982, Thriller has sold an estimated 66-70 million copies worldwide.",
          },
          {
                    id: "pop_200_02",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "What pop star is known as the 'Queen of Pop' and released 'Like a Virgin' in 1984?",
                    answer: "Madonna",
                    acceptableAnswers: ["Madonna"],
                              explanation: "Madonna has sold over 300 million records worldwide and is the best-selling female music artist of all time.",
          },
          {
                    id: "pop_200_03",
                    categoryId: "music",
                    tier: 200,
                    prompt:
                      "What Taylor Swift album, released in 2014, marked her transition from country to pop?",
                    answer: "1989",
                    acceptableAnswers: ["1989"],
                              explanation: "Named after her birth year, 1989 won the Grammy for Album of the Year and sold over 10 million copies.",
          },
          {
                    id: "pop_400_01",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What artist released the concept album 'Lemonade' as a visual album in 2016?",
                    answer: "Beyonce",
                    acceptableAnswers: ["Beyonce", "Beyoncé"],
                              explanation: "Lemonade debuted exclusively on Tidal and explored themes of infidelity, Black womanhood, and empowerment.",
          },
          {
                    id: "pop_400_02",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What ABBA song, featured in a 2008 movie musical, takes its title from an Italian exclamation?",
                    answer: "Mamma Mia",
                    acceptableAnswers: ["Mamma Mia", "Mamma Mia!"],
                              explanation: "The song was originally released in 1975. The film adaptation starring Meryl Streep grossed over $600 million.",
          },
          {
                    id: "pop_400_03",
                    categoryId: "music",
                    tier: 400,
                    prompt:
                      "What Prince album, released in 1984, includes 'When Doves Cry' and 'Let's Go Crazy'?",
                    answer: "Purple Rain",
                    acceptableAnswers: ["Purple Rain"],
                              explanation: "Purple Rain was both an album and a film, spending 24 consecutive weeks at #1 on the Billboard 200.",
          },
          {
                    id: "pop_600_01",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What Swedish producer, born Max Martin, has written more #1 Billboard hits than any songwriter except Lennon and McCartney?",
                    answer: "Max Martin",
                    acceptableAnswers: ["Max Martin", "Karl Martin Sandberg"],
                              explanation: "Max Martin has written or co-written 25+ #1 hits for artists including Britney Spears, Backstreet Boys, Taylor Swift, and The Weeknd.",
          },
          {
                    id: "pop_600_02",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What Kate Bush song, originally released in 1985, reached #1 on the UK charts in 2022 after featuring in Stranger Things?",
                    answer: "Running Up That Hill",
                    acceptableAnswers: ["Running Up That Hill", "Running Up That Hill (A Deal with God)"],
                              explanation: "The song's resurgence set a record for the longest time for a single to reach #1, taking 37 years.",
          },
          {
                    id: "pop_600_03",
                    categoryId: "music",
                    tier: 600,
                    prompt:
                      "What Phil Spector production technique, used on records like 'Be My Baby', layers multiple instruments to create a dense, orchestral sound?",
                    answer: "Wall of Sound",
                    acceptableAnswers: ["Wall of Sound", "The Wall of Sound"],
                              explanation: "The Wall of Sound technique used large ensembles, echo chambers, and multiple overdubs to create a rich, reverberant sound.",
          },
              ],
  },
  ];

export default MUSIC_TOPIC_PACKS_DRAFT;
