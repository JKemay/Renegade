#!/usr/bin/env python3
"""Insert wave 78 categories into categories.ts"""
import sys

CATEGORIES_PATH = "C:/Users/janti/downloads/Data-Model-Home/Data-Model-Home/artifacts/renegade/constants/categories.ts"

NEW_CATEGORIES = r"""
  {
    id: "tv_penny",
    group: "TV Shows",
    name: "Penny Dreadful",
    culture: "universal",
    description: "The gothic horror series blending classic literary monsters",
    imageUrl: "",
    questions: [
      { id: "pdr_200_01", categoryId: "tv_penny", tier: 200, prompt: "What famous monster does Caliban turn out to be, sharing a name with a Mary Shelley character?", answer: "Frankenstein's Monster (The Creature)", acceptableAnswers: ["Frankenstein's Monster", "The Creature", "Frankenstein"], explanation: "Caliban is eventually revealed to be the reanimated creation, echoing Shelley's novel." },
      { id: "pdr_200_02", categoryId: "tv_penny", tier: 200, prompt: "Which actress plays Vanessa Ives, the series' central character with a dark spiritual connection?", answer: "Eva Green", explanation: "Eva Green's portrayal of Vanessa Ives was widely praised as the show's emotional core." },
      { id: "pdr_200_03", categoryId: "tv_penny", tier: 200, prompt: "What is the name of the vampiric Master that Sir Malcolm and his allies hunt throughout Season 1?", answer: "The Master (Dracula)", acceptableAnswers: ["The Master", "Dracula"], explanation: "The Master vampire in Season 1 is eventually connected to the larger Dracula mythology." },
      { id: "pdr_400_01", categoryId: "tv_penny", tier: 400, prompt: "What Egyptian goddess does Vanessa Ives discover she is the reincarnation of?", answer: "Amunet", explanation: "Vanessa learns she is the reincarnation of Amunet, the 'Mother of Evil,' destined to be claimed by the Devil or Dracula." },
      { id: "pdr_400_02", categoryId: "tv_penny", tier: 400, prompt: "What literary character does Billie Piper portray, who begins the series dying of consumption?", answer: "Brona Croft / Lily Frankenstein", acceptableAnswers: ["Brona Croft", "Lily", "Lily Frankenstein", "Brona"], explanation: "Brona Croft dies and is resurrected by Victor Frankenstein, renamed Lily." },
      { id: "pdr_400_03", categoryId: "tv_penny", tier: 400, prompt: "What real historical figure does Patti LuPone play in Season 2, serving as a Cut-Wife mentor to Vanessa?", answer: "Joan Clayton (the Cut-Wife)", acceptableAnswers: ["Joan Clayton", "The Cut-Wife"], explanation: "Joan Clayton is the Cut-Wife who teaches Vanessa the ways of protection against evil in a powerful Season 2 arc." },
      { id: "pdr_600_01", categoryId: "tv_penny", tier: 600, prompt: "In the 'Penny Dreadful' universe, what specific verbis diablo passage does Vanessa recite during her infamous one-take possession scene in Season 2?", answer: "The Demon's Sermon / Verbis Diablo invocation", acceptableAnswers: ["Verbis Diablo", "The Demon's Sermon"], explanation: "The extended possession scene in 'Closer Than Sisters' features Vanessa channeling the Verbis Diablo in a celebrated unbroken take." },
      { id: "pdr_600_02", categoryId: "tv_penny", tier: 600, prompt: "What is the name of Dracula's human alias when he courts Vanessa in Season 3?", answer: "Dr. Alexander Sweet", acceptableAnswers: ["Dr. Sweet", "Alexander Sweet"], explanation: "Dracula disguises himself as the mild-mannered zoologist Dr. Alexander Sweet to seduce Vanessa." },
      { id: "pdr_600_03", categoryId: "tv_penny", tier: 600, prompt: "What specific poem by Wordsworth does Vanessa recite to Caliban in the finale, and what is its significance to the show's title?", answer: "Ode: Intimations of Immortality", acceptableAnswers: ["Intimations of Immortality", "Ode Intimations of Immortality"], explanation: "The poem's themes of lost innocence mirror the show's gothic examination of mortal suffering." }
    ]
  },
  {
    id: "tv_hannibal_d",
    group: "TV Shows",
    name: "Hannibal (Deep Cut)",
    culture: "universal",
    description: "Bryan Fuller's lavish psychological horror series — the deeper details",
    imageUrl: "",
    questions: [
      { id: "hnd_200_01", categoryId: "tv_hannibal_d", tier: 200, prompt: "What is the name of the FBI profiler who develops an empathic connection with serial killers?", answer: "Will Graham", explanation: "Will Graham's 'pure empathy' allows him to reconstruct crimes but threatens his sanity." },
      { id: "hnd_200_02", categoryId: "tv_hannibal_d", tier: 200, prompt: "What dish does Hannibal frequently serve to his dinner guests, unbeknownst to them?", answer: "Human flesh / human organs", acceptableAnswers: ["Human flesh", "Human meat", "People", "Human organs"], explanation: "Hannibal's elaborate dinner parties are darkly ironic as guests unknowingly consume human remains." },
      { id: "hnd_200_03", categoryId: "tv_hannibal_d", tier: 200, prompt: "In what European city does Hannibal flee to at the beginning of Season 3?", answer: "Florence", acceptableAnswers: ["Florence", "Florence, Italy"], explanation: "Hannibal assumes the identity of Dr. Fell and lives in Florence, mirroring events from the novel 'Hannibal.'" },
      { id: "hnd_400_01", categoryId: "tv_hannibal_d", tier: 400, prompt: "What is the name of the 'wound man' killer in Season 2 who arranges his victims in elaborate tableaux?", answer: "The Muralist (James Gray)", acceptableAnswers: ["The Muralist", "James Gray"], explanation: "The Muralist creates a massive eye-shaped mural of sewn-together bodies, one of the show's most disturbing set pieces." },
      { id: "hnd_400_02", categoryId: "tv_hannibal_d", tier: 400, prompt: "What is the significance of the wendigo imagery that appears throughout Will Graham's hallucinations?", answer: "It represents Hannibal's dark influence / Will's perception of Hannibal's true nature", acceptableAnswers: ["Hannibal's influence", "Will's perception of Hannibal", "Hannibal as a monster"], explanation: "The wendigo — a cannibalistic spirit — manifests as Will's subconscious recognition of Hannibal's predatory nature." },
      { id: "hnd_400_03", categoryId: "tv_hannibal_d", tier: 400, prompt: "What happens to Mason Verger's face in the series, and who convinces him to do it?", answer: "He cuts off his own face and feeds it to Will's dogs, under Hannibal's influence/drugs", acceptableAnswers: ["Cuts off his own face", "He peels off his face", "He cuts his face off"], explanation: "Under Hannibal's psychotropic influence, Mason slices off pieces of his own face and feeds them to dogs." },
      { id: "hnd_600_01", categoryId: "tv_hannibal_d", tier: 600, prompt: "What specific Janice Poon creation was served as 'loin' in the Season 1 dinner party scene with the brass ensemble?", answer: "Clay-roasted thigh / Osso buco-style preparation", acceptableAnswers: ["Clay-roasted thigh", "Osso buco", "Loin served osso buco style"], explanation: "Food stylist Janice Poon meticulously designed every meal to be simultaneously beautiful and disturbing, using real haute cuisine techniques." },
      { id: "hnd_600_02", categoryId: "tv_hannibal_d", tier: 600, prompt: "In Season 3, what specific painting in the Palazzo Capponi does Hannibal replace with one of his own compositions?", answer: "Primavera by Botticelli", acceptableAnswers: ["Primavera", "Botticelli's Primavera"], explanation: "Hannibal, as Dr. Fell, replaces Botticelli's Primavera with his own work in the Palazzo Capponi collection." },
      { id: "hnd_600_03", categoryId: "tv_hannibal_d", tier: 600, prompt: "What is the last line spoken in the series finale as Will and Hannibal fall from the cliff?", answer: "It's beautiful", acceptableAnswers: ["It's beautiful", "Its beautiful"], explanation: "Will whispers 'It's beautiful' as he pulls Hannibal off the cliff, referring to their shared act of killing the Red Dragon." }
    ]
  },
  {
    id: "mu_depeche",
    group: "Music",
    name: "Depeche Mode",
    culture: "universal",
    description: "The electronic pioneers from Basildon who defined synth-pop and darkwave",
    imageUrl: "",
    questions: [
      { id: "dpm_200_01", categoryId: "mu_depeche", tier: 200, prompt: "What 1981 debut single launched Depeche Mode into the UK charts before Vince Clarke left the band?", answer: "Dreaming of Me", acceptableAnswers: ["Dreaming of Me"], explanation: "Though 'Just Can't Get Enough' became their bigger early hit, 'Dreaming of Me' was their actual first single." },
      { id: "dpm_200_02", categoryId: "mu_depeche", tier: 200, prompt: "Which member became the band's primary songwriter after Vince Clarke's departure?", answer: "Martin Gore", explanation: "Martin Gore took over songwriting from Vince Clarke and steered the band toward darker, more complex material." },
      { id: "dpm_200_03", categoryId: "mu_depeche", tier: 200, prompt: "What 1990 album is considered their commercial peak, featuring 'Enjoy the Silence' and 'Personal Jesus'?", answer: "Violator", explanation: "Violator reached #7 on the Billboard 200 and has sold over 15 million copies worldwide." },
      { id: "dpm_400_01", categoryId: "mu_depeche", tier: 400, prompt: "What was the name of the 1989 concert film documenting their massive Rose Bowl show attended by over 60,000 fans?", answer: "101", explanation: "The concert film '101' documented the final show of their Music for the Masses Tour and was directed by D.A. Pennebaker." },
      { id: "dpm_400_02", categoryId: "mu_depeche", tier: 400, prompt: "What near-fatal event happened to Dave Gahan in 1996 at the Sunset Marquis hotel?", answer: "He overdosed on a heroin/cocaine speedball and was clinically dead for two minutes", acceptableAnswers: ["Overdose", "Drug overdose", "He overdosed", "Heroin overdose"], explanation: "Gahan was clinically dead for two minutes before paramedics revived him during the Ultra sessions." },
      { id: "dpm_400_03", categoryId: "mu_depeche", tier: 400, prompt: "Which founding member left the band in 1995, citing 'an appalling atmosphere' during the Devotional Tour?", answer: "Alan Wilder", acceptableAnswers: ["Alan Wilder", "Wilder"], explanation: "Alan Wilder's departure after the grueling Devotional Tour left Depeche Mode as a trio." },
      { id: "dpm_600_01", categoryId: "mu_depeche", tier: 600, prompt: "What specific Synclavier preset did Martin Gore use for the iconic riff on 'Personal Jesus'?", answer: "A sampled blues guitar loop processed through the Synclavier", acceptableAnswers: ["Sampled guitar through Synclavier", "Guitar sample on the Synclavier", "Blues guitar sample"], explanation: "The apparently 'live' guitar riff was actually a sample manipulated through their Synclavier, blending organic and electronic sounds." },
      { id: "dpm_600_02", categoryId: "mu_depeche", tier: 600, prompt: "What was the name of Alan Wilder's post-Depeche Mode project that released 'Unsound Methods' in 1997?", answer: "Recoil", explanation: "Recoil was Wilder's solo project where he continued experimenting with dark electronic music and collaborations." },
      { id: "dpm_600_03", categoryId: "mu_depeche", tier: 600, prompt: "On which 1986 album track does Martin Gore sing lead while wearing women's clothing in the music video, exploring themes of dominance and submission?", answer: "A Question of Lust (from Black Celebration)", acceptableAnswers: ["A Question of Lust"], explanation: "Gore's gender-bending performances on tracks like 'A Question of Lust' pushed boundaries in mainstream synth-pop." }
    ]
  },
  {
    id: "mu_talking",
    group: "Music",
    name: "Talking Heads",
    culture: "american",
    description: "The art-rock band that merged punk energy with African rhythms and David Byrne's neurotic genius",
    imageUrl: "",
    questions: [
      { id: "tkh_200_01", categoryId: "mu_talking", tier: 200, prompt: "What 1984 concert film directed by Jonathan Demme is considered one of the greatest concert movies ever made?", answer: "Stop Making Sense", explanation: "Stop Making Sense revolutionized concert films with its minimalist staging and building band format." },
      { id: "tkh_200_02", categoryId: "mu_talking", tier: 200, prompt: "What is the name of the oversized suit David Byrne famously wore during live performances?", answer: "The Big Suit", acceptableAnswers: ["The Big Suit", "Big Suit", "Oversized suit"], explanation: "The Big Suit became an iconic image, inspired by Japanese Noh theater and designed to make Byrne's head look smaller." },
      { id: "tkh_200_03", categoryId: "mu_talking", tier: 200, prompt: "Which Talking Heads song features the famous lyrics 'Same as it ever was' repeated throughout?", answer: "Once in a Lifetime", explanation: "'Once in a Lifetime' from Remain in Light became their signature song with its water-flowing imagery." },
      { id: "tkh_400_01", categoryId: "mu_talking", tier: 400, prompt: "What Brian Eno-produced album was heavily influenced by Fela Kuti's Afrobeat and featured layered polyrhythms?", answer: "Remain in Light", explanation: "Remain in Light (1980) merged African polyrhythms with electronic production, creating a revolutionary sound." },
      { id: "tkh_400_02", categoryId: "mu_talking", tier: 400, prompt: "What was the name of the CBGB venue where Talking Heads got their start alongside the Ramones and Blondie?", answer: "CBGB (CBGB & OMFUG)", acceptableAnswers: ["CBGB", "CBGBs", "CBGB & OMFUG"], explanation: "CBGB on the Bowery was the birthplace of American punk and new wave, where Talking Heads became regulars in 1975." },
      { id: "tkh_400_03", categoryId: "mu_talking", tier: 400, prompt: "What side project did the three non-Byrne members form, releasing 'Casual Gods' and other albums?", answer: "Tom Tom Club", acceptableAnswers: ["Tom Tom Club"], explanation: "Chris Frantz and Tina Weymouth formed Tom Tom Club, scoring a hit with 'Genius of Love' in 1981." },
      { id: "tkh_600_01", categoryId: "mu_talking", tier: 600, prompt: "What specific Robert Farris Thompson text on African art and philosophy heavily influenced the making of Remain in Light?", answer: "African Art in Motion", acceptableAnswers: ["African Art in Motion", "Flash of the Spirit"], explanation: "Thompson's ethnographic studies of Yoruba and Kongo aesthetics directly influenced the album's polyrhythmic structures." },
      { id: "tkh_600_02", categoryId: "mu_talking", tier: 600, prompt: "What technique did Eno use during the Remain in Light sessions where band members played without hearing each other's parts?", answer: "Oblique Strategies / isolation booth recording", acceptableAnswers: ["Oblique Strategies", "Playing in isolation", "Isolation recording"], explanation: "Eno used his Oblique Strategies cards and had musicians record parts in isolation to create unpredictable layered textures." },
      { id: "tkh_600_03", categoryId: "mu_talking", tier: 600, prompt: "What legal dispute arose from the writing credits on Remain in Light, leading to tension that eventually broke up the band?", answer: "All four members demanded equal songwriting credit alongside Eno, which Byrne initially resisted", acceptableAnswers: ["Songwriting credit dispute", "Writing credits dispute", "Credit dispute between Byrne and the band"], explanation: "The other three members felt Byrne and Eno were taking disproportionate credit for what was a collaborative effort, creating lasting resentment." }
    ]
  },
  {
    id: "vg_celeste",
    group: "Video Games",
    name: "Celeste",
    culture: "universal",
    description: "The precision platformer about climbing a mountain and confronting inner demons",
    imageUrl: "",
    questions: [
      { id: "cel_200_01", categoryId: "vg_celeste", tier: 200, prompt: "What is the name of the protagonist who decides to climb Celeste Mountain?", answer: "Madeline", explanation: "Madeline's journey up the mountain serves as a metaphor for dealing with depression and anxiety." },
      { id: "cel_200_02", categoryId: "vg_celeste", tier: 200, prompt: "What dark reflection of Madeline serves as the main antagonist throughout the game?", answer: "Badeline / Part of Me / Dark Madeline", acceptableAnswers: ["Badeline", "Part of Me", "Dark Madeline", "Part of Her"], explanation: "Badeline represents Madeline's self-doubt and anxiety, splitting from her reflection in the mirror." },
      { id: "cel_200_03", categoryId: "vg_celeste", tier: 200, prompt: "What core mechanic allows Madeline to gain extra momentum in mid-air?", answer: "The dash", acceptableAnswers: ["Dash", "Air dash", "Dashing"], explanation: "The single-use air dash (refreshed on landing) is the game's fundamental mechanic that everything else builds upon." },
      { id: "cel_400_01", categoryId: "vg_celeste", tier: 400, prompt: "What are the hidden collectibles found in each chapter that unlock additional difficult content?", answer: "Crystal Hearts / B-Side cassette tapes", acceptableAnswers: ["Crystal Hearts", "B-Side tapes", "Cassette tapes", "B-Sides"], explanation: "Cassette tapes unlock B-Side remixed levels, while Crystal Hearts gate access to the hardest content." },
      { id: "cel_400_02", categoryId: "vg_celeste", tier: 400, prompt: "What is Chapter 9 called, the free DLC chapter that is considered the hardest content in the game?", answer: "Farewell", explanation: "Farewell was released as free DLC and is dedicated to the memory of the developer's friend, featuring the most demanding platforming in the game." },
      { id: "cel_400_03", categoryId: "vg_celeste", tier: 400, prompt: "What elderly character does Madeline meet near the base of the mountain who has climbed it before?", answer: "Granny / Old Woman", acceptableAnswers: ["Granny", "Old Woman", "The Old Woman"], explanation: "Granny serves as a wise mentor figure who has already made the climb and offers cryptic encouragement." },
      { id: "cel_600_01", categoryId: "vg_celeste", tier: 600, prompt: "What advanced technique, not intended by the developers but later embraced, involves chaining wavedashes and hyper-dashes for extreme speed?", answer: "Extended hyper-dashing / wavedashing", acceptableAnswers: ["Extended hyper", "Wavedash", "Hyper-dashing", "Extended hyper-dashing"], explanation: "The speedrunning community discovered chained wavedashes, which the developers later designed Chapter 9 around." },
      { id: "cel_600_02", categoryId: "vg_celeste", tier: 600, prompt: "What is the name of the original Celeste game jam prototype made in PICO-8 by Matt Thorson and Noel Berry?", answer: "Celeste Classic / PICO-8 Celeste", acceptableAnswers: ["Celeste Classic", "PICO-8 Celeste", "Classic Celeste"], explanation: "The original 4-day game jam version was made in PICO-8 and is playable within the full game as a secret." },
      { id: "cel_600_03", categoryId: "vg_celeste", tier: 600, prompt: "In the Farewell chapter, what specific new mechanic involves holding a pufferfish-like creature that explodes and launches Madeline?", answer: "Jellyfish / Jellyfish dashing", acceptableAnswers: ["Jellyfish", "Pufferfish", "Jellyfish dash"], explanation: "The jellyfish mechanic in Farewell requires precise timing as players carry the creature and use its explosion for momentum." }
    ]
  },
  {
    id: "vg_disco",
    group: "Video Games",
    name: "Disco Elysium",
    culture: "universal",
    description: "The revolutionary RPG where your skills are voices in your head and the world is a political powder keg",
    imageUrl: "",
    questions: [
      { id: "dse_200_01", categoryId: "vg_disco", tier: 200, prompt: "What is the protagonist's profession, which he has completely forgotten at the start of the game?", answer: "Police detective / cop", acceptableAnswers: ["Detective", "Police detective", "Cop", "RCM officer"], explanation: "The player character wakes up with total amnesia, not even knowing he's a detective investigating a murder." },
      { id: "dse_200_02", categoryId: "vg_disco", tier: 200, prompt: "What is the name of your long-suffering partner who meets you at the crime scene?", answer: "Kim Kitsuragi", acceptableAnswers: ["Kim Kitsuragi", "Kim", "Lieutenant Kitsuragi"], explanation: "Kim Kitsuragi from Precinct 57 is widely beloved as one of gaming's best companion characters." },
      { id: "dse_200_03", categoryId: "vg_disco", tier: 200, prompt: "What is hanging from a tree behind the Whirling-in-Rags hostel that you're investigating?", answer: "A hanged man / corpse / body", acceptableAnswers: ["A hanged man", "A body", "A corpse", "The hanged man"], explanation: "The lynched body of Lely, a mercenary, is the central murder case that drives the game's plot." },
      { id: "dse_400_01", categoryId: "vg_disco", tier: 400, prompt: "What are the four main attribute categories that house the game's 24 skills?", answer: "Intellect, Psyche, Physique, Motorics", acceptableAnswers: ["Intellect Psyche Physique Motorics"], explanation: "Each attribute contains six skills that act as internal voices, from Electrochemistry (addiction urges) to Inland Empire (intuition)." },
      { id: "dse_400_02", categoryId: "vg_disco", tier: 400, prompt: "What fictional political ideology can you fully embrace that involves communism, but with a distinctly pathetic, nostalgic flavor?", answer: "Mazovian Socio-Economics / Communism", acceptableAnswers: ["Mazovian Socio-Economics", "Communism", "Mazovian communism"], explanation: "The game's communist path involves Mazovian Socio-Economics, a failed revolutionary ideology tinged with melancholy and defeat." },
      { id: "dse_400_03", categoryId: "vg_disco", tier: 400, prompt: "What is the name of the fictional isola (district) where the entire game takes place?", answer: "Martinaise", explanation: "Martinaise is a run-down district in Revachol, scarred by revolution and corporate neglect." },
      { id: "dse_600_01", categoryId: "vg_disco", tier: 600, prompt: "What is the name of the mysterious phenomenon in the game's world — vast regions of reality that have dissolved into nothingness?", answer: "The Pale", explanation: "The Pale is entropy made manifest — regions between isolas where reality breaks down, and traveling through it causes memory loss and existential dread." },
      { id: "dse_600_02", categoryId: "vg_disco", tier: 600, prompt: "What is the '2mm hole in the world' that the Deserter describes, and what does it represent in the game's lore?", answer: "The bullet hole / phasmid nest area where the Pale is encroaching on reality", acceptableAnswers: ["The bullet hole", "Hole in the world", "Pale encroachment"], explanation: "The Deserter's '2mm hole' refers to both the literal bullet trajectory and the metaphysical thinning of reality in Martinaise." },
      { id: "dse_600_03", categoryId: "vg_disco", tier: 600, prompt: "What real-world country and its failed communist revolution was the primary inspiration for Revachol and the Commune of '02?", answer: "The Paris Commune of 1871 / France", acceptableAnswers: ["Paris Commune", "France", "The Paris Commune", "Paris Commune of 1871"], explanation: "ZA/UM drew heavily from the Paris Commune's brief revolutionary government and its violent suppression for Revachol's backstory." }
    ]
  },
  {
    id: "mv_coen",
    group: "Movies",
    name: "Coen Brothers Films",
    culture: "american",
    description: "The filmmaking duo behind Fargo, No Country for Old Men, and The Big Lebowski",
    imageUrl: "",
    questions: [
      { id: "coe_200_01", categoryId: "mv_coen", tier: 200, prompt: "In The Big Lebowski, what does The Dude's preferred drink consist of?", answer: "White Russian (vodka, Kahlúa, and cream)", acceptableAnswers: ["White Russian", "A White Russian"], explanation: "The Dude's love of White Russians became iconic, leading to real-world Lebowski Fest celebrations." },
      { id: "coe_200_02", categoryId: "mv_coen", tier: 200, prompt: "In Fargo, what piece of equipment does Carl Showalter get fed into at the end of the film?", answer: "A wood chipper", acceptableAnswers: ["Wood chipper", "A wood chipper", "Woodchipper"], explanation: "The wood chipper scene became one of cinema's most memorable dark comedy moments." },
      { id: "coe_200_03", categoryId: "mv_coen", tier: 200, prompt: "What weapon does Anton Chigurh use as his primary killing tool in No Country for Old Men?", answer: "Captive bolt pistol / cattle gun", acceptableAnswers: ["Captive bolt pistol", "Cattle gun", "Bolt gun", "Captive bolt gun"], explanation: "Chigurh's captive bolt pistol, normally used for slaughtering cattle, became an iconic symbol of his mechanical approach to killing." },
      { id: "coe_400_01", categoryId: "mv_coen", tier: 400, prompt: "What 1991 film starring John Turturro takes place in a hotel that may or may not be Hell?", answer: "Barton Fink", explanation: "Barton Fink's Hotel Earle, with its peeling wallpaper and mysterious fires, operates as a surreal purgatory for a blocked writer." },
      { id: "coe_400_02", categoryId: "mv_coen", tier: 400, prompt: "In O Brother, Where Art Thou?, what classic literary work is the film loosely based on?", answer: "Homer's Odyssey", acceptableAnswers: ["The Odyssey", "Homer's Odyssey", "Odyssey"], explanation: "The film transposes the Odyssey to Depression-era Mississippi, with Ulysses Everett McGill as its wily protagonist." },
      { id: "coe_400_03", categoryId: "mv_coen", tier: 400, prompt: "What is the name of the philosophy that Walter Sobchak accuses the nihilists of betraying in The Big Lebowski?", answer: "Nihilism (they 'believe in nothing')", acceptableAnswers: ["Nihilism", "They believe in nothing"], explanation: "Walter's rant about nihilists — 'Say what you want about the tenets of National Socialism, at least it's an ethos' — is one of the film's most quoted lines." },
      { id: "coe_600_01", categoryId: "mv_coen", tier: 600, prompt: "What specific Roger Deakins cinematography technique in No Country for Old Men involved shooting most scenes with only natural or practical light sources?", answer: "Available light / natural light cinematography with minimal supplemental lighting", acceptableAnswers: ["Natural light", "Available light", "Practical light only"], explanation: "Deakins used almost exclusively practical and available light to create the film's stark, documentary-like realism." },
      { id: "coe_600_02", categoryId: "mv_coen", tier: 600, prompt: "In A Serious Man, what is the significance of the Yiddish prologue involving a dybbuk, and how does it connect to the main narrative?", answer: "It establishes the theme of uncertainty about whether curses/divine punishment are real, mirroring Larry's inexplicable suffering", acceptableAnswers: ["Uncertainty about curses and divine punishment", "Whether the curse is real", "Ambiguity of divine punishment"], explanation: "The prologue's unresolved question — was the old man a dybbuk? — mirrors Larry Gopnik's inability to find meaning in his suffering." },
      { id: "coe_600_03", categoryId: "mv_coen", tier: 600, prompt: "What was the Coens' debut film, made for $1.5 million with a blood-simple plot involving double-crosses in Texas?", answer: "Blood Simple", acceptableAnswers: ["Blood Simple"], explanation: "Blood Simple (1984) established every Coen trademark: noir plotting, dark humor, sudden violence, and Texas settings." }
    ]
  },
  {
    id: "his_silk_d",
    group: "History & Culture",
    name: "The Silk Road (Deep Cut)",
    culture: "universal",
    description: "The ancient trade networks connecting East and West — beyond the basics",
    imageUrl: "",
    questions: [
      { id: "srd_200_01", categoryId: "his_silk_d", tier: 200, prompt: "What Chinese dynasty first established formal Silk Road trade by sending Zhang Qian westward as an envoy?", answer: "Han Dynasty", acceptableAnswers: ["Han", "Han Dynasty"], explanation: "Zhang Qian's diplomatic mission in 138 BC opened trade routes that would define Eurasian commerce for centuries." },
      { id: "srd_200_02", categoryId: "his_silk_d", tier: 200, prompt: "Besides silk, what other Chinese invention was carefully guarded as a trade secret for centuries along the Silk Road?", answer: "Paper / papermaking", acceptableAnswers: ["Paper", "Papermaking", "Paper making"], explanation: "The secret of papermaking was closely guarded until the Battle of Talas in 751 AD when Arab forces captured Chinese papermakers." },
      { id: "srd_200_03", categoryId: "his_silk_d", tier: 200, prompt: "What ancient city in modern Uzbekistan was a major Silk Road hub known for its stunning Islamic architecture?", answer: "Samarkand", acceptableAnswers: ["Samarkand", "Samarqand"], explanation: "Samarkand sat at the crossroads of trade routes and became one of the wealthiest cities in Central Asia." },
      { id: "srd_400_01", categoryId: "his_silk_d", tier: 400, prompt: "What devastating pandemic spread along Silk Road trade routes in the 14th century, killing roughly a third of Europe's population?", answer: "The Black Death / Bubonic Plague", acceptableAnswers: ["Black Death", "Bubonic Plague", "The Plague", "Black Plague"], explanation: "The plague traveled along trade routes from Central Asia to Europe, demonstrating how trade networks could spread disease." },
      { id: "srd_400_02", categoryId: "his_silk_d", tier: 400, prompt: "What system did the Mongol Empire establish to protect and facilitate Silk Road trade, including relay stations every 25-30 miles?", answer: "The Yam / Örtöö postal relay system", acceptableAnswers: ["Yam", "Yam system", "Örtöö", "Postal relay system"], explanation: "The Yam system of relay stations provided fresh horses, food, and shelter, enabling rapid communication across the vast Mongol Empire." },
      { id: "srd_400_03", categoryId: "his_silk_d", tier: 400, prompt: "What religion spread from India to China primarily via Silk Road missionaries and merchants, transforming East Asian culture?", answer: "Buddhism", explanation: "Buddhist monks and merchants carried their faith along the Silk Road, establishing monasteries and cave temples like Dunhuang." },
      { id: "srd_600_01", categoryId: "his_silk_d", tier: 600, prompt: "What specific event at the Battle of Talas in 751 AD led to the spread of papermaking technology to the Islamic world?", answer: "Arab Abbasid forces captured Chinese papermakers/craftsmen who revealed the manufacturing process", acceptableAnswers: ["Captured Chinese papermakers", "Chinese craftsmen were captured", "Papermakers captured at Talas"], explanation: "Chinese prisoners of war skilled in papermaking shared their knowledge, leading to paper mills in Samarkand and eventually throughout the Islamic world." },
      { id: "srd_600_02", categoryId: "his_silk_d", tier: 600, prompt: "What Sogdian merchant network dominated Silk Road trade from the 4th to 8th centuries, creating a commercial diaspora from China to Byzantium?", answer: "The Sogdian trade network / Sogdian merchants", acceptableAnswers: ["Sogdians", "Sogdian merchants", "Sogdian trade network"], explanation: "Sogdian merchants from modern-day Uzbekistan/Tajikistan created the most extensive commercial network on the ancient Silk Road, with colonies in every major city." },
      { id: "srd_600_03", categoryId: "his_silk_d", tier: 600, prompt: "What cache of ancient manuscripts was discovered in Cave 17 at the Mogao Grottoes near Dunhuang in 1900, revealing centuries of Silk Road history?", answer: "The Dunhuang manuscripts / Library Cave", acceptableAnswers: ["Dunhuang manuscripts", "Library Cave", "Cave 17 manuscripts", "Dunhuang Library Cave"], explanation: "The sealed Library Cave contained over 40,000 manuscripts in multiple languages dating from the 5th to 11th centuries, including the oldest printed book (Diamond Sutra)." }
    ]
  },
  {
    id: "sci_volcanoes",
    group: "Science & Nature",
    name: "Volcanoes & Geological Forces",
    culture: "universal",
    description: "The explosive science of Earth's interior and the eruptions that shape our world",
    imageUrl: "",
    questions: [
      { id: "vlc_200_01", categoryId: "sci_volcanoes", tier: 200, prompt: "What type of tectonic plate boundary occurs when one plate slides beneath another, often creating volcanic arcs?", answer: "Subduction zone / convergent boundary", acceptableAnswers: ["Subduction zone", "Convergent boundary", "Subduction"], explanation: "Subduction zones create chains of volcanoes as the descending plate melts and magma rises to the surface." },
      { id: "vlc_200_02", categoryId: "sci_volcanoes", tier: 200, prompt: "What term describes the molten rock inside a volcano before it reaches the surface?", answer: "Magma", explanation: "Magma becomes lava once it erupts; underground it's called magma and can be stored in chambers for thousands of years." },
      { id: "vlc_200_03", categoryId: "sci_volcanoes", tier: 200, prompt: "What volcanic eruption in 79 AD buried the Roman cities of Pompeii and Herculaneum?", answer: "Mount Vesuvius", acceptableAnswers: ["Vesuvius", "Mount Vesuvius", "Mt. Vesuvius"], explanation: "Vesuvius's eruption preserved Pompeii under meters of ash, creating an unparalleled archaeological time capsule." },
      { id: "vlc_400_01", categoryId: "sci_volcanoes", tier: 400, prompt: "What is a caldera, and how does it differ from a typical volcanic crater?", answer: "A large depression formed when a volcano collapses into its emptied magma chamber after a massive eruption", acceptableAnswers: ["Collapsed magma chamber", "Large depression from collapse", "Volcano collapse depression"], explanation: "Calderas like Yellowstone and Crater Lake form when eruptions are so massive that the volcano's structure can't support itself and collapses inward." },
      { id: "vlc_400_02", categoryId: "sci_volcanoes", tier: 400, prompt: "What 1815 eruption of Mount Tambora caused the 'Year Without a Summer' in 1816?", answer: "Mount Tambora", acceptableAnswers: ["Tambora", "Mount Tambora", "Mt. Tambora"], explanation: "Tambora's VEI-7 eruption ejected so much sulfur dioxide that global temperatures dropped 0.4-0.7°C, causing crop failures worldwide." },
      { id: "vlc_400_03", categoryId: "sci_volcanoes", tier: 400, prompt: "What type of fast-moving volcanic flow consists of superheated gas and rock fragments that can travel at 700 km/h?", answer: "Pyroclastic flow", acceptableAnswers: ["Pyroclastic flow", "Pyroclastic surge", "Nuée ardente"], explanation: "Pyroclastic flows are the deadliest volcanic hazard, reaching temperatures of 700°C and outrunning any vehicle." },
      { id: "vlc_600_01", categoryId: "sci_volcanoes", tier: 600, prompt: "What specific VEI-8 event approximately 74,000 years ago may have reduced the human population to as few as 10,000 individuals?", answer: "The Toba supereruption / Lake Toba", acceptableAnswers: ["Toba", "Lake Toba", "Toba supereruption", "Mount Toba"], explanation: "The Toba catastrophe theory suggests the supereruption caused a volcanic winter lasting 6-10 years, creating a genetic bottleneck in human evolution." },
      { id: "vlc_600_02", categoryId: "sci_volcanoes", tier: 600, prompt: "What phenomenon causes volcanic lightning inside eruption plumes, and what role do silicate particles play?", answer: "Triboelectric charging of ash particles / fractured silicate particles colliding and generating static charge", acceptableAnswers: ["Triboelectric charging", "Static charge from ash particles", "Fractured silicate charging"], explanation: "Silicate particles fracture during eruption, and the collision of differently-charged fragments creates spectacular lightning within the ash plume." },
      { id: "vlc_600_03", categoryId: "sci_volcanoes", tier: 600, prompt: "What is the difference between a hotspot volcano like Hawaii and an LIP (Large Igneous Province) like the Siberian Traps?", answer: "Hotspots produce focused plume volcanism over millions of years; LIPs are massive flood basalt events covering millions of km² in relatively short geological timeframes", acceptableAnswers: ["Hotspots are focused plumes; LIPs are massive flood basalts", "Scale and duration difference", "Focused vs flood basalt"], explanation: "The Siberian Traps LIP erupted ~252 MYA, covering 7 million km² and likely causing the Permian extinction, the worst mass extinction in history." }
    ]
  },
  {
    id: "sci_fungi",
    group: "Science & Nature",
    name: "The Kingdom of Fungi",
    culture: "universal",
    description: "The hidden kingdom that connects forests, decomposes the dead, and shapes ecosystems",
    imageUrl: "",
    questions: [
      { id: "fng_200_01", categoryId: "sci_fungi", tier: 200, prompt: "What underground network of fungal threads connects trees in a forest, sometimes called the 'Wood Wide Web'?", answer: "Mycelium / mycorrhizal network", acceptableAnswers: ["Mycelium", "Mycorrhizal network", "Wood Wide Web"], explanation: "Mycorrhizal networks allow trees to share nutrients and chemical signals through interconnected fungal threads." },
      { id: "fng_200_02", categoryId: "sci_fungi", tier: 200, prompt: "Are fungi more closely related to plants or animals on the tree of life?", answer: "Animals", explanation: "Fungi and animals share a common ancestor (the opisthokont clade), diverging roughly 1 billion years ago — much more recently than the plant-fungi split." },
      { id: "fng_200_03", categoryId: "sci_fungi", tier: 200, prompt: "What process do fungi primarily use to obtain nutrients — photosynthesis, absorption, or ingestion?", answer: "Absorption", explanation: "Fungi secrete enzymes externally to break down organic matter, then absorb the nutrients — a process called external digestion." },
      { id: "fng_400_01", categoryId: "sci_fungi", tier: 400, prompt: "What is the largest living organism on Earth, a honey fungus in Oregon's Blue Mountains spanning over 2,385 acres?", answer: "Armillaria ostoyae / the Humongous Fungus", acceptableAnswers: ["Armillaria ostoyae", "Humongous Fungus", "Armillaria", "Honey fungus"], explanation: "This single organism is estimated to be 2,400-8,650 years old and covers an area equivalent to 1,665 football fields." },
      { id: "fng_400_02", categoryId: "sci_fungi", tier: 400, prompt: "What parasitic fungus infects ants, takes control of their behavior, and forces them to climb to an optimal height before killing them?", answer: "Ophiocordyceps unilateralis / zombie ant fungus", acceptableAnswers: ["Ophiocordyceps", "Ophiocordyceps unilateralis", "Zombie ant fungus", "Cordyceps"], explanation: "The fungus manipulates ant behavior with remarkable precision, forcing them to bite into leaves at the exact height and orientation for optimal spore dispersal." },
      { id: "fng_400_03", categoryId: "sci_fungi", tier: 400, prompt: "What class of antibiotics was accidentally discovered by Alexander Fleming from a Penicillium mold contaminating a petri dish?", answer: "Penicillin", explanation: "Fleming's 1928 observation that Penicillium mold killed surrounding bacteria launched the antibiotic revolution." },
      { id: "fng_600_01", categoryId: "sci_fungi", tier: 600, prompt: "What specific mechanism allows fungi in the genus Pilobolus to launch their spore packets at accelerations exceeding 180,000 g?", answer: "Turgor pressure buildup in a subsporangial vesicle that explosively ruptures", acceptableAnswers: ["Turgor pressure", "Subsporangial vesicle pressure", "Hydraulic pressure explosion"], explanation: "Pilobolus builds osmotic pressure in a swollen vesicle beneath the sporangium until it bursts, launching spores up to 2 meters — one of nature's fastest accelerations." },
      { id: "fng_600_02", categoryId: "sci_fungi", tier: 600, prompt: "What role did Prototaxites, a structure up to 8 meters tall from the Devonian period, play in early land ecosystems, and why is its classification controversial?", answer: "It was likely a giant fungus (or fungal-algal consortium) that dominated landscapes before trees evolved", acceptableAnswers: ["Giant fungus before trees", "Largest land organism of the Devonian", "Pre-tree giant fungus"], explanation: "Prototaxites fossils show internal structure consistent with fungal hyphae, suggesting fungi were the tallest organisms on land for millions of years before trees evolved." },
      { id: "fng_600_03", categoryId: "sci_fungi", tier: 600, prompt: "What is the Glomalin hypothesis, and why might arbuscular mycorrhizal fungi be critical for global carbon sequestration?", answer: "Glomalin is a glycoprotein produced by AMF that binds soil particles and stores significant amounts of carbon, potentially accounting for 5-36% of soil organic carbon", acceptableAnswers: ["Glomalin stores carbon in soil", "AMF glycoprotein that sequesters carbon", "Soil carbon storage protein from mycorrhizae"], explanation: "Glomalin's role in soil carbon storage suggests that mycorrhizal fungi may be far more important for climate regulation than previously recognized." }
    ]
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

    print(f"SUCCESS: Wave 78 categories inserted.")
    print(f"File size: {len(new_content)} characters")

if __name__ == "__main__":
    main()
