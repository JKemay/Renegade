#!/usr/bin/env python3
"""Insert wave 67 categories into categories.ts"""
import sys

CATEGORIES_PATH = "C:/Users/janti/downloads/Data-Model-Home/Data-Model-Home/artifacts/renegade/constants/categories.ts"

NEW_CATEGORIES = r"""
  {
    id: "tv_peaky",
    group: "tv",
    name: "Peaky Blinders",
    culture: "universal",
    description: "By order of the Peaky Blinders — Shelby family empire from Small Heath to Parliament.",
    imageUrl: "",
    questions: [
      { id: "pky_200_01", categoryId: "tv_peaky", tier: 200, prompt: "What city in England is the Shelby family based in?", answer: "Birmingham", acceptableAnswers: ["Birmingham, England"], explanation: "The Peaky Blinders operate out of Small Heath, Birmingham." },
      { id: "pky_200_02", categoryId: "tv_peaky", tier: 200, prompt: "What is sewn into the peak of the Peaky Blinders' caps that gives them their name?", answer: "Razor blades", acceptableAnswers: ["Razors", "Razor blade"], explanation: "The gang's signature weapon, hidden in the brims of their flat caps." },
      { id: "pky_200_03", categoryId: "tv_peaky", tier: 200, prompt: "Which actor plays Thomas Shelby?", answer: "Cillian Murphy", explanation: "Murphy's portrayal of the calculating gang leader became iconic." },
      { id: "pky_400_01", categoryId: "tv_peaky", tier: 400, prompt: "What is the name of the gypsy curse that Polly and Tommy reference throughout the series?", answer: "The Sapphire", acceptableAnswers: ["Sapphire", "The Blue Sapphire"], explanation: "Romani mysticism runs through the Shelby family's beliefs." },
      { id: "pky_400_02", categoryId: "tv_peaky", tier: 400, prompt: "Which real historical figure does Tommy Shelby meet at a boxing match, leading to a political alliance in Series 2?", answer: "Alfie Solomons", acceptableAnswers: ["Alfie"], explanation: "Tom Hardy's Alfie Solomons, the Camden Town gang leader, becomes a recurring frenemy." },
      { id: "pky_400_03", categoryId: "tv_peaky", tier: 400, prompt: "What legitimate business does Tommy acquire to launder money and gain respectability in Series 1?", answer: "The Garrison pub", acceptableAnswers: ["The Garrison", "Garrison pub", "Garrison"], explanation: "The pub becomes the Shelbys' base and a symbol of their rise." },
      { id: "pky_600_01", categoryId: "tv_peaky", tier: 600, prompt: "In Series 3, what is the name of the Russian duchess Tommy becomes involved with as part of a jewel heist plot?", answer: "Tatiana Petrovna", acceptableAnswers: ["Tatiana", "Duchess Tatiana"], explanation: "The Russian aristocrat draws Tommy into an international intrigue with stolen jewels." },
      { id: "pky_600_02", categoryId: "tv_peaky", tier: 600, prompt: "What specific war trauma does Tommy experience that manifests as him digging tunnels in his sleep?", answer: "He was a tunneler (sapper) in France during WWI", acceptableAnswers: ["Tunneling", "Sapper", "Clay Kickers", "Tunneler in WWI"], explanation: "Tommy served as a sapper digging under enemy lines, leaving him with severe PTSD." },
      { id: "pky_600_03", categoryId: "tv_peaky", tier: 600, prompt: "What is the name of Aberama Gold's son who is killed by the Billy Boys, sparking a vendetta in Series 5?", answer: "Bonnie Gold", acceptableAnswers: ["Bonnie"], explanation: "Bonnie's murder by the Scottish razor gang becomes a major plot catalyst." },
    ],
  },
  {
    id: "tv_fargo",
    group: "tv",
    name: "Fargo (TV Series)",
    culture: "american",
    description: "Oh ya betcha — anthology crime tales across the frozen Midwest.",
    imageUrl: "",
    questions: [
      { id: "fgo_200_01", categoryId: "tv_fargo", tier: 200, prompt: "What US state is the primary setting for most Fargo seasons?", answer: "Minnesota", acceptableAnswers: ["Minnesota", "North Dakota"], explanation: "The show is set across the upper Midwest, primarily Minnesota and North Dakota." },
      { id: "fgo_200_02", categoryId: "tv_fargo", tier: 200, prompt: "Each season of Fargo is an anthology — what does that mean for the cast?", answer: "New characters and story each season", acceptableAnswers: ["Different story each season", "New cast each season"], explanation: "Like the Coen brothers' film, each season tells a self-contained crime story." },
      { id: "fgo_200_03", categoryId: "tv_fargo", tier: 200, prompt: "What phrase appears at the start of every Fargo episode, despite being fiction?", answer: "This is a true story", acceptableAnswers: ["Based on a true story", "This is a true story"], explanation: "A direct homage to the original 1996 Coen brothers film's opening card." },
      { id: "fgo_400_01", categoryId: "tv_fargo", tier: 400, prompt: "In Season 1, what contract killer played by Billy Bob Thornton manipulates Lester Nygaard into violence?", answer: "Lorne Malvo", acceptableAnswers: ["Malvo"], explanation: "Malvo is the drifter hitman who sets the entire season's chain of events in motion." },
      { id: "fgo_400_02", categoryId: "tv_fargo", tier: 400, prompt: "In Season 2, what real historical event coincides with the Gerhardt crime family war?", answer: "The Sioux Falls massacre", acceptableAnswers: ["Sioux Falls", "Sioux Falls massacre", "Sioux Falls incident"], explanation: "Season 2 builds toward the infamous Sioux Falls incident referenced in Season 1." },
      { id: "fgo_400_03", categoryId: "tv_fargo", tier: 400, prompt: "What profession does Gloria Burgle hold in Season 3 while investigating Emmit Stussy?", answer: "Police chief", acceptableAnswers: ["Chief of police", "Eden Valley police chief", "Police chief of Eden Valley"], explanation: "Carrie Coon plays the small-town police chief drawn into a complex fraud case." },
      { id: "fgo_600_01", categoryId: "tv_fargo", tier: 600, prompt: "In Season 2, what surreal event interrupts the Sioux Falls motel shootout, saving some characters?", answer: "A UFO appears", acceptableAnswers: ["UFO", "UFO sighting", "Alien spacecraft"], explanation: "The show's most polarizing moment — a genuine UFO intervenes during the climactic gunfight." },
      { id: "fgo_600_02", categoryId: "tv_fargo", tier: 600, prompt: "In Season 4, what is the name of the tradition where the Kansas City crime families exchange youngest sons as a guarantee of peace?", answer: "The trade", acceptableAnswers: ["Trading sons", "The son exchange", "The trade"], explanation: "The Fadda and Cannon families trade sons, a practice that drives the season's tension." },
      { id: "fgo_600_03", categoryId: "tv_fargo", tier: 600, prompt: "In Season 1, what is the significance of the fish that falls from the sky during a key scene?", answer: "It references real events of animals falling from the sky and serves as a deus ex machina that saves Lester", acceptableAnswers: ["Fish rain saves Lester", "Deus ex machina fish rain", "Fish falling from sky saves Lester Nygaard"], explanation: "A rain of fish — based on actual meteorological phenomena — intervenes at a critical moment." },
    ],
  },
  {
    id: "tv_better_call",
    group: "tv",
    name: "Better Call Saul",
    culture: "american",
    description: "The transformation of Jimmy McGill into Saul Goodman — one chicanery at a time.",
    imageUrl: "",
    questions: [
      { id: "bcs_200_01", categoryId: "tv_better_call", tier: 200, prompt: "What is Saul Goodman's real name before he adopts his lawyer persona?", answer: "Jimmy McGill", acceptableAnswers: ["James McGill", "Jimmy"], explanation: "The series chronicles Jimmy McGill's slow transformation into the criminal lawyer." },
      { id: "bcs_200_02", categoryId: "tv_better_call", tier: 200, prompt: "What show is Better Call Saul a prequel/spinoff of?", answer: "Breaking Bad", explanation: "The series explores the backstory of Breaking Bad's flamboyant lawyer." },
      { id: "bcs_200_03", categoryId: "tv_better_call", tier: 200, prompt: "What is the name of Jimmy's older brother who is also a lawyer?", answer: "Chuck McGill", acceptableAnswers: ["Chuck", "Charles McGill"], explanation: "Michael McKean plays Chuck, whose complicated relationship with Jimmy drives much of the show." },
      { id: "bcs_400_01", categoryId: "tv_better_call", tier: 400, prompt: "What condition does Chuck McGill claim to suffer from that makes him avoid electricity?", answer: "Electromagnetic hypersensitivity", acceptableAnswers: ["EHS", "Electromagnetic sensitivity", "Allergy to electricity"], explanation: "Chuck wraps himself in space blankets and avoids electronics, though the condition may be psychosomatic." },
      { id: "bcs_400_02", categoryId: "tv_better_call", tier: 400, prompt: "What is the name of the law firm where both Chuck and Jimmy work at different points?", answer: "Hamlin, Hamlin & McGill", acceptableAnswers: ["HHM", "Hamlin Hamlin McGill"], explanation: "HHM is the prestigious firm co-founded by Chuck that Jimmy aspires to join." },
      { id: "bcs_400_03", categoryId: "tv_better_call", tier: 400, prompt: "What con does Jimmy run at a bar involving a fake Rolex and a staged wallet switch to win over a mark?", answer: "The Viktor and Giselle con", acceptableAnswers: ["Viktor con", "Viktor and Giselle", "The Rolex con"], explanation: "Jimmy and Kim's alter egos Viktor and Giselle run elaborate bar scams together." },
      { id: "bcs_600_01", categoryId: "tv_better_call", tier: 600, prompt: "What is the name of the travel agency where Gene Takavic works in Omaha during the flash-forward timeline?", answer: "Cinnabon", acceptableAnswers: ["Cinnabon"], explanation: "Gene manages a Cinnabon in a mall — the iconic black-and-white flash-forward scenes." },
      { id: "bcs_600_02", categoryId: "tv_better_call", tier: 600, prompt: "In the final season, what legal maneuver does Jimmy use during his federal hearing that shocks everyone by increasing his own sentence?", answer: "He confesses to everything and admits he is Jimmy McGill, not Saul Goodman", acceptableAnswers: ["Full confession", "He confesses everything", "Admits he is Jimmy McGill"], explanation: "Instead of taking the sweetheart deal, Jimmy finally takes responsibility for his actions." },
      { id: "bcs_600_03", categoryId: "tv_better_call", tier: 600, prompt: "What document does Chuck secretly record Jimmy confessing to in order to get him disbarred?", answer: "The Mesa Verde address swap", acceptableAnswers: ["Mesa Verde forgery", "The 1216 vs 1261 address change", "Chuck's Mesa Verde tape"], explanation: "Jimmy changed a legal address (1216 to 1261) on Mesa Verde documents, and Chuck taped his confession." },
    ],
  },
  {
    id: "mu_pink_floyd",
    group: "music",
    name: "Pink Floyd",
    culture: "universal",
    description: "Welcome to the machine — prog rock, concept albums, and that prism.",
    imageUrl: "",
    questions: [
      { id: "pfl_200_01", categoryId: "mu_pink_floyd", tier: 200, prompt: "What Pink Floyd album cover features a prism splitting white light into a rainbow?", answer: "The Dark Side of the Moon", acceptableAnswers: ["Dark Side of the Moon", "DSOTM"], explanation: "One of the most iconic album covers in rock history, designed by Storm Thorgerson." },
      { id: "pfl_200_02", categoryId: "mu_pink_floyd", tier: 200, prompt: "Which Pink Floyd album is a rock opera about a man who builds a metaphorical wall around himself?", answer: "The Wall", acceptableAnswers: ["The Wall"], explanation: "Released in 1979, it became one of the best-selling double albums ever." },
      { id: "pfl_200_03", categoryId: "mu_pink_floyd", tier: 200, prompt: "What Pink Floyd song includes the lyric 'We don't need no education'?", answer: "Another Brick in the Wall (Part 2)", acceptableAnswers: ["Another Brick in the Wall", "Another Brick in the Wall Part 2"], explanation: "Their biggest hit single, reaching #1 in multiple countries." },
      { id: "pfl_400_01", categoryId: "mu_pink_floyd", tier: 400, prompt: "Which founding member of Pink Floyd left the band due to mental health issues and was replaced by David Gilmour?", answer: "Syd Barrett", acceptableAnswers: ["Barrett", "Syd"], explanation: "Barrett's deteriorating mental health led to his departure after the first album." },
      { id: "pfl_400_02", categoryId: "mu_pink_floyd", tier: 400, prompt: "What 1975 Pink Floyd album is a concept record about the absence of band members and the music industry, featuring the songs 'Shine On You Crazy Diamond' and 'Welcome to the Machine'?", answer: "Wish You Were Here", explanation: "A tribute to Syd Barrett and a critique of the music industry." },
      { id: "pfl_400_03", categoryId: "mu_pink_floyd", tier: 400, prompt: "Which member of Pink Floyd wrote most of The Wall and later sued the band when they continued without him?", answer: "Roger Waters", acceptableAnswers: ["Waters"], explanation: "Waters' departure led to a bitter legal battle over the Pink Floyd name." },
      { id: "pfl_600_01", categoryId: "mu_pink_floyd", tier: 600, prompt: "On 'The Dark Side of the Moon,' what is the spoken-word response that closes the album, answering the question 'There is no dark side of the moon really'?", answer: "Matter of fact it's all dark", acceptableAnswers: ["It's all dark", "As a matter of fact it's all dark"], explanation: "The album ends with this philosophical statement from the studio doorman." },
      { id: "pfl_600_02", categoryId: "mu_pink_floyd", tier: 600, prompt: "What is the name of the inflatable pig that floated away during a 1976 photo shoot for the 'Animals' album cover at Battersea Power Station?", answer: "Algie", acceptableAnswers: ["Algie the pig"], explanation: "The pig broke free of its moorings and drifted into Heathrow flight paths, causing an alert." },
      { id: "pfl_600_03", categoryId: "mu_pink_floyd", tier: 600, prompt: "What unreleased Pink Floyd album from 1972 was shelved because the band felt it was too similar to existing work, only to be officially released in 2016?", answer: "The Endless River", acceptableAnswers: ["The Endless River"], explanation: "Actually, the shelved 1972 sessions were 'Household Objects.' The Endless River (2014) used 1993 Division Bell sessions. The correct answer for 1972 shelved material is 'Household Objects'." },
    ],
  },
  {
    id: "mu_queen",
    group: "music",
    name: "Queen",
    culture: "universal",
    description: "Champions of stadium rock — four voices, one legend.",
    imageUrl: "",
    questions: [
      { id: "qun_200_01", categoryId: "mu_queen", tier: 200, prompt: "What six-minute Queen song combines ballad, opera, and hard rock sections and is one of the best-selling singles of all time?", answer: "Bohemian Rhapsody", explanation: "Released in 1975, it defied every convention of what a rock single could be." },
      { id: "qun_200_02", categoryId: "mu_queen", tier: 200, prompt: "What Queen song features a stomp-stomp-clap rhythm and has become a universal sports anthem?", answer: "We Will Rock You", explanation: "Brian May wrote it to give audiences a way to participate in the show." },
      { id: "qun_200_03", categoryId: "mu_queen", tier: 200, prompt: "Who was Queen's legendary lead singer who died in 1991?", answer: "Freddie Mercury", acceptableAnswers: ["Mercury", "Freddie"], explanation: "Born Farrokh Bulsara, Mercury is widely regarded as one of the greatest rock vocalists ever." },
      { id: "qun_400_01", categoryId: "mu_queen", tier: 400, prompt: "What instrument did Brian May famously build with his father from a fireplace mantel?", answer: "The Red Special", acceptableAnswers: ["Red Special", "His guitar", "Red Special guitar"], explanation: "May and his father built the guitar from scratch, and he still plays it to this day." },
      { id: "qun_400_02", categoryId: "mu_queen", tier: 400, prompt: "What 1981 Queen collaboration with David Bowie became a #1 hit and features one of the most recognizable bass lines in pop history?", answer: "Under Pressure", explanation: "Written during an impromptu jam session, its bass line was later sampled by Vanilla Ice." },
      { id: "qun_400_03", categoryId: "mu_queen", tier: 400, prompt: "At what 1985 charity concert did Queen deliver a legendary 20-minute set that is often called the greatest live performance in rock history?", answer: "Live Aid", acceptableAnswers: ["Live Aid at Wembley"], explanation: "Their Wembley Stadium set is consistently voted the best live rock performance ever." },
      { id: "qun_600_01", categoryId: "mu_queen", tier: 600, prompt: "What is unique about the guitar solo in 'Brighton Rock' that Brian May pioneered using a delay pedal technique?", answer: "He plays harmonized layers against his own delayed signal, creating a one-man guitar orchestra", acceptableAnswers: ["Delay pedal harmonics", "Self-harmonizing with delay", "One-man guitar orchestra with delay"], explanation: "May's delay technique became his signature, layering multiple harmony lines in real time." },
      { id: "qun_600_02", categoryId: "mu_queen", tier: 600, prompt: "What is the real title of the song commonly known as the Flash Gordon theme, and what unusual distinction does it hold in Queen's catalog?", answer: "Flash (or Flash's Theme)", acceptableAnswers: ["Flash", "Flash's Theme"], explanation: "It was part of Queen's soundtrack for the 1980 Flash Gordon film." },
      { id: "qun_600_03", categoryId: "mu_queen", tier: 600, prompt: "On the album 'A Night at the Opera,' what is notable about the way the album's credits describe the use of synthesizers?", answer: "The liner notes state 'No synthesizers' — the band prided itself on creating all sounds with guitars, vocals, and piano", acceptableAnswers: ["No synthesizers", "No synths", "No synthesisers were used"], explanation: "Queen famously credited 'No synthesizers!' on their early albums, achieving electronic-sounding effects purely through layered guitars and vocals." },
    ],
  },
  {
    id: "vg_elden_ring",
    group: "video_games",
    name: "Elden Ring",
    culture: "universal",
    description: "Rise, Tarnished — the Lands Between await your rune-fueled journey.",
    imageUrl: "",
    questions: [
      { id: "eld_200_01", categoryId: "vg_elden_ring", tier: 200, prompt: "What fantasy author co-created the world and lore of Elden Ring alongside FromSoftware?", answer: "George R.R. Martin", acceptableAnswers: ["GRRM", "George Martin"], explanation: "Martin wrote the foundational mythology that Miyazaki built the game around." },
      { id: "eld_200_02", categoryId: "vg_elden_ring", tier: 200, prompt: "What do players collect from defeated bosses to level up and progress in Elden Ring?", answer: "Runes", explanation: "Runes serve as both currency and experience points, lost on death unless recovered." },
      { id: "eld_200_03", categoryId: "vg_elden_ring", tier: 200, prompt: "What is the name of the spectral horse mount that players ride across the open world?", answer: "Torrent", explanation: "Torrent enables traversal of the massive open world and mounted combat." },
      { id: "eld_400_01", categoryId: "vg_elden_ring", tier: 400, prompt: "What are the shattered pieces of the Elden Ring called that demigod bosses carry?", answer: "Great Runes", explanation: "Each major boss holds a Great Rune, fragments of the titular Elden Ring." },
      { id: "eld_400_02", categoryId: "vg_elden_ring", tier: 400, prompt: "What is the name of the rot-cursed demigod who resisted the Scarlet Rot and is considered one of the hardest bosses in the game?", answer: "Malenia, Blade of Miquella", acceptableAnswers: ["Malenia", "Malenia Blade of Miquella"], explanation: "Her catchphrase 'I am Malenia, Blade of Miquella' became a meme due to her extreme difficulty." },
      { id: "eld_400_03", categoryId: "vg_elden_ring", tier: 400, prompt: "What hub area serves as the player's base, where they can level up and upgrade weapons?", answer: "Roundtable Hold", acceptableAnswers: ["The Roundtable Hold", "Roundtable"], explanation: "A safe haven outside the open world where NPCs gather." },
      { id: "eld_600_01", categoryId: "vg_elden_ring", tier: 600, prompt: "What is the name of the hidden underground area accessible through coffins that contains the Deeproot Depths and leads to a secret ending?", answer: "The Deeproot Depths and Ainsel River lead toward the Age of Stars ending via Ranni's questline", acceptableAnswers: ["Ainsel River", "Deeproot Depths", "The underground river areas"], explanation: "The underground regions connect to Ranni's questline and the Age of Stars ending." },
      { id: "eld_600_02", categoryId: "vg_elden_ring", tier: 600, prompt: "In Elden Ring's DLC 'Shadow of the Erdtree,' what item must be collected across the map to increase your power within the DLC's realm?", answer: "Scadutree Fragments", acceptableAnswers: ["Scadutree Fragment", "Scadutree Blessings"], explanation: "These fragments are essential for scaling your power in the Land of Shadow." },
      { id: "eld_600_03", categoryId: "vg_elden_ring", tier: 600, prompt: "What community-coined term describes the phenomenon where players write misleading messages near cliffs suggesting hidden paths?", answer: "Try jumping / Liar ahead", acceptableAnswers: ["Try jumping", "Liar ahead", "Hidden path ahead"], explanation: "Player messages like 'try jumping' near lethal drops became iconic trolling in the community." },
    ],
  },
  {
    id: "vg_god_of_war",
    group: "video_games",
    name: "God of War (2018+)",
    culture: "universal",
    description: "Boy! Kratos and Atreus journey through Norse mythology in search of purpose.",
    imageUrl: "",
    questions: [
      { id: "gow_200_01", categoryId: "vg_god_of_war", tier: 200, prompt: "What is the name of Kratos's son who accompanies him throughout the Norse saga?", answer: "Atreus", acceptableAnswers: ["Atreus", "Boy"], explanation: "Atreus, also known as Loki, is Kratos's central companion." },
      { id: "gow_200_02", categoryId: "vg_god_of_war", tier: 200, prompt: "What mythology does the 2018 God of War series explore, replacing the Greek setting?", answer: "Norse mythology", acceptableAnswers: ["Norse", "Viking", "Scandinavian"], explanation: "The soft reboot moved Kratos from Greek to Norse mythology." },
      { id: "gow_200_03", categoryId: "vg_god_of_war", tier: 200, prompt: "What is the name of Kratos's primary weapon — a magical ice axe that returns when thrown?", answer: "Leviathan Axe", acceptableAnswers: ["Leviathan", "The Leviathan Axe"], explanation: "The axe's return mechanic became one of the most satisfying gameplay elements in modern gaming." },
      { id: "gow_400_01", categoryId: "vg_god_of_war", tier: 400, prompt: "What is the name of the world serpent that wraps around the Lake of Nine?", answer: "Jörmungandr", acceptableAnswers: ["Jormungandr", "The World Serpent"], explanation: "The massive serpent is a key figure in Norse mythology and an ally in the game." },
      { id: "gow_400_02", categoryId: "vg_god_of_war", tier: 400, prompt: "In God of War (2018), what unique camera technique was used to make the entire game feel like one continuous shot?", answer: "Single continuous camera / no camera cuts", acceptableAnswers: ["One shot", "No cuts", "Single take camera", "One continuous shot"], explanation: "The game never cuts away — even transitions between realms maintain the single-shot illusion." },
      { id: "gow_400_03", categoryId: "vg_god_of_war", tier: 400, prompt: "What are the names of the two dwarf blacksmith brothers who upgrade your equipment throughout the game?", answer: "Brok and Sindri", acceptableAnswers: ["Sindri and Brok", "Brok & Sindri"], explanation: "The bickering brothers forged the Leviathan Axe and provide upgrades throughout." },
      { id: "gow_600_01", categoryId: "vg_god_of_war", tier: 600, prompt: "In God of War Ragnarök, what devastating event does Kratos trigger by killing the Norse god of peace, and how does the game present this visually?", answer: "Fimbulwinter intensifies after Baldur's death in the first game, and Ragnarök begins", acceptableAnswers: ["Fimbulwinter", "Ragnarök begins", "Fimbulwinter from Baldur's death"], explanation: "Baldur's death in the 2018 game triggers Fimbulwinter, the prelude to Ragnarök." },
      { id: "gow_600_02", categoryId: "vg_god_of_war", tier: 600, prompt: "What is Atreus's true identity in Norse mythology, revealed at the end of God of War (2018)?", answer: "Loki", explanation: "The mural at Jötunheim reveals that Atreus is the Norse trickster god Loki." },
      { id: "gow_600_03", categoryId: "vg_god_of_war", tier: 600, prompt: "In Ragnarök, what is the name of the companion wolf that Atreus bonds with, who turns out to be one of Loki's mythological children?", answer: "Fenrir", acceptableAnswers: ["Fenrir the wolf"], explanation: "Fenrir, the giant wolf destined to devour Odin at Ragnarök, appears as a dying wolf Atreus tries to save." },
    ],
  },
  {
    id: "mv_kubrick",
    group: "movies",
    name: "Stanley Kubrick",
    culture: "universal",
    description: "Perfectionist cinema — from space odysseys to ultraviolence to haunted hotels.",
    imageUrl: "",
    questions: [
      { id: "kub_200_01", categoryId: "mv_kubrick", tier: 200, prompt: "What 1968 Kubrick film features a mysterious black monolith and a sentient computer named HAL 9000?", answer: "2001: A Space Odyssey", acceptableAnswers: ["2001", "A Space Odyssey"], explanation: "One of the most influential science fiction films ever made." },
      { id: "kub_200_02", categoryId: "mv_kubrick", tier: 200, prompt: "What 1980 horror film directed by Kubrick features Jack Nicholson going mad in a remote hotel?", answer: "The Shining", explanation: "Despite Stephen King's disapproval, Kubrick's adaptation became a horror classic." },
      { id: "kub_200_03", categoryId: "mv_kubrick", tier: 200, prompt: "What controversial 1971 Kubrick film depicts a dystopian society through the eyes of the violent delinquent Alex DeLarge?", answer: "A Clockwork Orange", explanation: "Kubrick himself withdrew the film from UK distribution after death threats." },
      { id: "kub_400_01", categoryId: "mv_kubrick", tier: 400, prompt: "What phrase does HAL 9000 say when refusing to open the pod bay doors in 2001: A Space Odyssey?", answer: "I'm sorry, Dave. I'm afraid I can't do that.", acceptableAnswers: ["I'm sorry Dave I'm afraid I can't do that", "I can't do that Dave"], explanation: "One of the most quoted lines in film history." },
      { id: "kub_400_02", categoryId: "mv_kubrick", tier: 400, prompt: "What unique lighting technique did Kubrick use in 'Barry Lyndon,' filming interior scenes only by candlelight using a special NASA lens?", answer: "He used a Zeiss 50mm f/0.7 lens originally made for NASA", acceptableAnswers: ["NASA lens", "Zeiss lens", "f/0.7 lens", "Candlelight with NASA lens"], explanation: "Kubrick acquired ultra-fast lenses designed for Apollo moon photography to shoot by candlelight." },
      { id: "kub_400_03", categoryId: "mv_kubrick", tier: 400, prompt: "What was Kubrick's final film, released posthumously in 1999, starring Tom Cruise and Nicole Kidman?", answer: "Eyes Wide Shut", explanation: "Kubrick died just days after showing his final cut to the studio." },
      { id: "kub_600_01", categoryId: "mv_kubrick", tier: 600, prompt: "What is the Ludovico Technique in 'A Clockwork Orange,' and why does it make Alex unable to listen to Beethoven?", answer: "A forced aversion therapy that conditions violent impulses to trigger nausea; Beethoven was playing during the conditioning", acceptableAnswers: ["Aversion therapy paired with Beethoven", "Forced viewing with nausea drugs while Beethoven plays"], explanation: "The state's 'cure' for violence accidentally conditions Alex against his beloved music." },
      { id: "kub_600_02", categoryId: "mv_kubrick", tier: 600, prompt: "In 'The Shining,' what is the significance of Room 237, and what real-world conspiracy theories have fans attached to the film?", answer: "Room 237 is the haunted room; conspiracy theories include the film being a confession about faking the Moon landing", acceptableAnswers: ["Moon landing conspiracy", "Room 237 theories", "Kubrick moon landing confession theory"], explanation: "The documentary 'Room 237' explores various fan theories about hidden meanings in the film." },
      { id: "kub_600_03", categoryId: "mv_kubrick", tier: 600, prompt: "What was the original ending of '2001: A Space Odyssey' that Kubrick cut before release, involving a narrated explanation of the monolith?", answer: "A voice-over narration explaining the aliens and the monolith's purpose", acceptableAnswers: ["Voice-over narration", "Narrated explanation of the aliens", "Explanatory narration"], explanation: "Kubrick removed all exposition, making the ending deliberately ambiguous and open to interpretation." },
    ],
  },
  {
    id: "his_samurai",
    group: "history",
    name: "Samurai & Feudal Japan",
    culture: "universal",
    description: "Bushido, shoguns, and the warrior class that shaped Japan for centuries.",
    imageUrl: "",
    questions: [
      { id: "sam_200_01", categoryId: "his_samurai", tier: 200, prompt: "What code of honor guided the samurai's way of life, emphasizing loyalty, honor, and martial arts?", answer: "Bushido", acceptableAnswers: ["Bushido", "The way of the warrior"], explanation: "Bushido — 'the way of the warrior' — was the samurai's moral code." },
      { id: "sam_200_02", categoryId: "his_samurai", tier: 200, prompt: "What was the title of the military ruler who held real power in Japan while the Emperor was largely ceremonial?", answer: "Shogun", acceptableAnswers: ["Shōgun", "Shogun"], explanation: "The Shogun was the supreme military leader, ruling in the Emperor's name." },
      { id: "sam_200_03", categoryId: "his_samurai", tier: 200, prompt: "What is the curved, single-edged sword most associated with samurai warriors?", answer: "Katana", explanation: "The katana became the symbol of the samurai class." },
      { id: "sam_400_01", categoryId: "his_samurai", tier: 400, prompt: "What was the ritual suicide practice samurai performed to preserve their honor rather than face capture or disgrace?", answer: "Seppuku", acceptableAnswers: ["Seppuku", "Harakiri", "Hara-kiri"], explanation: "Seppuku was a highly ritualized form of self-disembowelment." },
      { id: "sam_400_02", categoryId: "his_samurai", tier: 400, prompt: "Which family established the Tokugawa Shogunate in 1603, beginning over 250 years of relative peace known as the Edo period?", answer: "Tokugawa", acceptableAnswers: ["Tokugawa family", "Tokugawa Ieyasu"], explanation: "Tokugawa Ieyasu unified Japan after the Battle of Sekigahara." },
      { id: "sam_400_03", categoryId: "his_samurai", tier: 400, prompt: "What famous 1600 battle unified Japan under Tokugawa rule and is considered one of the most important battles in Japanese history?", answer: "Battle of Sekigahara", acceptableAnswers: ["Sekigahara"], explanation: "Sekigahara decided the fate of Japan, with over 160,000 soldiers clashing." },
      { id: "sam_600_01", categoryId: "his_samurai", tier: 600, prompt: "What were the 47 Ronin avenging when they attacked the mansion of Lord Kira in 1703, and what happened to them afterward?", answer: "They avenged their master Lord Asano who was forced to commit seppuku after attacking Kira; all 47 ronin were then ordered to commit seppuku themselves", acceptableAnswers: ["Avenging Lord Asano's forced seppuku", "Lord Asano's death"], explanation: "The tale of the 47 Ronin is Japan's most famous example of samurai loyalty." },
      { id: "sam_600_02", categoryId: "his_samurai", tier: 600, prompt: "During the Sengoku period, what was a 'sōhei' and why were they feared by both samurai and monks?", answer: "Warrior monks — Buddhist monks trained in martial arts who fought as military forces", acceptableAnswers: ["Warrior monks", "Buddhist warrior monks", "Sōhei warrior monks"], explanation: "The sōhei were militant Buddhist monks who maintained their own armies and fortified temples." },
      { id: "sam_600_03", categoryId: "his_samurai", tier: 600, prompt: "What 1876 edict effectively ended the samurai class by prohibiting them from carrying swords in public?", answer: "The Haitōrei Edict (Sword Abolishment Edict)", acceptableAnswers: ["Haitōrei", "Haitorei", "Sword Abolishment Edict", "Sword ban of 1876"], explanation: "The Meiji government's sword ban was a key step in dismantling feudal Japan." },
    ],
  },
  {
    id: "sci_space_exploration",
    group: "science",
    name: "Space Exploration",
    culture: "universal",
    description: "From Sputnik to SpaceX — humanity's reach beyond Earth.",
    imageUrl: "",
    questions: [
      { id: "spc_200_01", categoryId: "sci_space_exploration", tier: 200, prompt: "What was the name of the first human to travel to space, launched by the Soviet Union in 1961?", answer: "Yuri Gagarin", acceptableAnswers: ["Gagarin"], explanation: "Gagarin orbited Earth aboard Vostok 1 on April 12, 1961." },
      { id: "spc_200_02", categoryId: "sci_space_exploration", tier: 200, prompt: "What was the name of the NASA program that successfully landed humans on the Moon?", answer: "Apollo", acceptableAnswers: ["Apollo program", "Project Apollo"], explanation: "Apollo 11 achieved the first Moon landing in July 1969." },
      { id: "spc_200_03", categoryId: "sci_space_exploration", tier: 200, prompt: "What is the name of the Mars rover that landed in 2021 and carried the Ingenuity helicopter?", answer: "Perseverance", acceptableAnswers: ["Perseverance rover"], explanation: "Perseverance landed in Jezero Crater and deployed the first powered flight on another planet." },
      { id: "spc_400_01", categoryId: "sci_space_exploration", tier: 400, prompt: "What space station has been continuously occupied since November 2000 and is a collaboration between NASA, Roscosmos, ESA, JAXA, and CSA?", answer: "International Space Station (ISS)", acceptableAnswers: ["ISS", "International Space Station"], explanation: "The ISS has hosted rotating crews for over two decades of continuous habitation." },
      { id: "spc_400_02", categoryId: "sci_space_exploration", tier: 400, prompt: "What NASA probe launched in 1977 became the first human-made object to enter interstellar space?", answer: "Voyager 1", acceptableAnswers: ["Voyager 1"], explanation: "Voyager 1 crossed the heliopause in 2012, entering interstellar space." },
      { id: "spc_400_03", categoryId: "sci_space_exploration", tier: 400, prompt: "What critical malfunction occurred on Apollo 13 that forced the crew to abort their Moon landing?", answer: "An oxygen tank exploded in the service module", acceptableAnswers: ["Oxygen tank explosion", "O2 tank explosion", "Service module explosion"], explanation: "The famous 'Houston, we've had a problem' moment led to one of NASA's greatest rescue missions." },
      { id: "spc_600_01", categoryId: "sci_space_exploration", tier: 600, prompt: "What was the name of the Soviet space station that preceded the ISS and was deliberately deorbited in 2001 after 15 years of operation?", answer: "Mir", explanation: "Mir was the first modular space station, assembled in orbit from 1986 to 1996." },
      { id: "spc_600_02", categoryId: "sci_space_exploration", tier: 600, prompt: "What gravity assist technique, first demonstrated by Mariner 10 in 1974, uses a planet's gravity to change a spacecraft's speed and direction without fuel?", answer: "Gravitational slingshot (gravity assist)", acceptableAnswers: ["Gravity assist", "Gravitational slingshot", "Slingshot maneuver", "Gravity slingshot"], explanation: "Mariner 10 used Venus's gravity to reach Mercury, pioneering the technique used by Voyager and many others." },
      { id: "spc_600_03", categoryId: "sci_space_exploration", tier: 600, prompt: "What is the name of the region at approximately 550 AU from the Sun where the Sun's gravity focuses light from distant objects, theorized as an ideal location for a gravitational lens telescope?", answer: "Solar gravitational lens focal point", acceptableAnswers: ["Solar gravitational lens", "Solar gravity lens", "SGL focal region"], explanation: "A spacecraft at this distance could use the Sun itself as a lens to image exoplanets in detail." },
    ],
  },
"""

def main():
    with open(CATEGORIES_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    old_ending = "\n];\n\nexport default CATEGORIES;\n"
    new_ending = NEW_CATEGORIES + "\n];\n\nexport default CATEGORIES;\n"

    if old_ending not in content:
        print("ERROR: Could not find expected file ending.")
        sys.exit(1)

    count = content.count(old_ending)
    if count != 1:
        print(f"ERROR: Found {count} occurrences. Expected exactly 1.")
        sys.exit(1)

    new_content = content.replace(old_ending, new_ending)

    with open(CATEGORIES_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"SUCCESS: Wave 67 categories inserted.")
    print(f"File size: {len(new_content)} characters")

if __name__ == "__main__":
    main()
