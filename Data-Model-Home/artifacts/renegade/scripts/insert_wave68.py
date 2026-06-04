#!/usr/bin/env python3
"""Insert wave 68 categories into categories.ts"""
import sys

CATEGORIES_PATH = "C:/Users/janti/downloads/Data-Model-Home/Data-Model-Home/artifacts/renegade/constants/categories.ts"

NEW_CATEGORIES = r"""
  {
    id: "tv_succession",
    group: "tv",
    name: "Succession",
    culture: "american",
    description: "The Roy family — media moguls tearing each other apart for the throne.",
    imageUrl: "",
    questions: [
      { id: "suc_200_01", categoryId: "tv_succession", tier: 200, prompt: "What media conglomerate does the Roy family control in Succession?", answer: "Waystar Royco", acceptableAnswers: ["Waystar RoyCo", "Waystar"], explanation: "The fictional media and entertainment empire at the center of the show." },
      { id: "suc_200_02", categoryId: "tv_succession", tier: 200, prompt: "Who is the aging patriarch and CEO whose potential retirement drives the show's central conflict?", answer: "Logan Roy", acceptableAnswers: ["Logan"], explanation: "Brian Cox's Logan Roy controls the family and the company with an iron fist." },
      { id: "suc_200_03", categoryId: "tv_succession", tier: 200, prompt: "What real-world media family is the Roy family widely believed to be based on?", answer: "The Murdoch family", acceptableAnswers: ["Murdochs", "Rupert Murdoch's family"], explanation: "Creator Jesse Armstrong drew inspiration from several media dynasties, primarily the Murdochs." },
      { id: "suc_400_01", categoryId: "tv_succession", tier: 400, prompt: "What is the name of Tom Wambsgans' favorite phrase when describing his position as Greg's superior — the concept of being a 'something' in the family hierarchy?", answer: "He's not family, he married in — he's Shiv's husband and an outsider", acceptableAnswers: ["Tom is an outsider who married in", "He married into the family"], explanation: "Tom's precarious position as a non-Roy drives much of his scheming." },
      { id: "suc_400_02", categoryId: "tv_succession", tier: 400, prompt: "What scandalous corporate secret involving cruise ship operations threatens to bring down Waystar Royco?", answer: "Coverups of deaths and sexual misconduct on the cruise line division", acceptableAnswers: ["Cruise ship scandals", "Cruise line coverups", "Deaths and misconduct on cruises"], explanation: "The cruises scandal becomes the show's central legal and moral threat." },
      { id: "suc_400_03", categoryId: "tv_succession", tier: 400, prompt: "What nickname does the family use for the Roy children's practice of swooping in on failing businesses?", answer: "They don't have a specific family nickname for it — but the kids' scramble for position is called 'the game'", acceptableAnswers: ["The game", "Playing the game"], explanation: "The Roys treat corporate succession as a blood sport." },
      { id: "suc_600_01", categoryId: "tv_succession", tier: 600, prompt: "In the series finale, who ultimately becomes CEO of Waystar Royco after the final boardroom vote?", answer: "Tom Wambsgans", acceptableAnswers: ["Tom"], explanation: "In a shocking twist, Tom — the ultimate company man — ends up on top while the Roy siblings lose." },
      { id: "suc_600_02", categoryId: "tv_succession", tier: 600, prompt: "What is the significance of the meal Kendall orders at the diner in the series finale after losing the CEO vote?", answer: "He sits alone, defeated, mirroring his father's isolation — the meal symbolizes his final acceptance that he lost", acceptableAnswers: ["He sits alone accepting defeat", "Mirrors Logan's isolation"], explanation: "The final scenes show each Roy child processing their loss in isolation." },
      { id: "suc_600_03", categoryId: "tv_succession", tier: 600, prompt: "What phrase does Logan Roy repeatedly use as a loyalty test, and what does a 'wrong' answer typically cost the person?", answer: "Various loyalty tests, but 'Are you with me?' or demands for absolute allegiance — wrong answers mean exile from the inner circle", acceptableAnswers: ["Are you with me", "Loyalty tests", "Boar on the floor"], explanation: "Logan's paranoid loyalty tests, including the infamous 'Boar on the Floor' scene, define his management style." },
    ],
  },
  {
    id: "tv_severance",
    group: "tv",
    name: "Severance",
    culture: "american",
    description: "Your work self and your outside self — severed at the elevator door.",
    imageUrl: "",
    questions: [
      { id: "svr_200_01", categoryId: "tv_severance", tier: 200, prompt: "What is the 'severance' procedure in the show — what does it do to employees?", answer: "It surgically divides work memories from personal memories so employees don't remember their outside life at work and vice versa", acceptableAnswers: ["Splits work and personal memories", "Separates work and life memories", "Brain procedure splitting memories"], explanation: "The core premise — a brain implant creates two separate consciousnesses." },
      { id: "svr_200_02", categoryId: "tv_severance", tier: 200, prompt: "What fictional corporation employs the severed workers?", answer: "Lumon Industries", acceptableAnswers: ["Lumon"], explanation: "The mysterious company with cult-like qualities that performs the severance procedure." },
      { id: "svr_200_03", categoryId: "tv_severance", tier: 200, prompt: "What is the name of the main character who begins questioning the severance procedure?", answer: "Mark Scout", acceptableAnswers: ["Mark", "Mark S."], explanation: "Adam Scott plays Mark, a widower who chose severance to escape his grief during work hours." },
      { id: "svr_400_01", categoryId: "tv_severance", tier: 400, prompt: "What is the name of the department where Mark's team works, sorting numbers into bins based on emotional reactions?", answer: "Macrodata Refinement", acceptableAnswers: ["MDR", "Macrodata Refinement department"], explanation: "No one — not even the workers — knows what the numbers actually mean." },
      { id: "svr_400_02", categoryId: "tv_severance", tier: 400, prompt: "What are the 'perks' that Lumon gives to high-performing severed employees, like waffle parties and music dance experiences?", answer: "Incentives / rewards for meeting quotas on the severed floor", acceptableAnswers: ["Incentives", "Rewards", "Perks for quota completion"], explanation: "The absurd corporate rewards — waffle parties, finger traps, melon bars — satirize workplace culture." },
      { id: "svr_400_03", categoryId: "tv_severance", tier: 400, prompt: "Who is the founder figure of Lumon that employees are taught to revere almost religiously?", answer: "Kier Eagan", acceptableAnswers: ["Kier", "Kier Eagan"], explanation: "Lumon's founder is treated like a deity, with employees reciting his teachings." },
      { id: "svr_600_01", categoryId: "tv_severance", tier: 600, prompt: "In the Season 1 finale, what does the 'overtime contingency' protocol allow the innies to do that creates the climactic tension?", answer: "It activates the innie consciousness in the outside world, letting them experience life outside Lumon for the first time", acceptableAnswers: ["Activates innies in the outside world", "Innies wake up outside", "Overtime contingency activates work selves outside"], explanation: "The innies wake up in their outies' lives with no context, desperately trying to get help before being switched back." },
      { id: "svr_600_02", categoryId: "tv_severance", tier: 600, prompt: "What does Helly R. discover about her outie identity during the overtime contingency that makes her situation even more horrifying?", answer: "She is Helena Eagan, an heir to the Lumon family dynasty, and her outie voluntarily chose severance as a PR stunt", acceptableAnswers: ["She is Helena Eagan", "She's a Lumon heir", "Helena Eagan"], explanation: "Helly's innie discovers her outie is promoting severance as a company spokesperson — the ultimate betrayal." },
      { id: "svr_600_03", categoryId: "tv_severance", tier: 600, prompt: "What mysterious room on the severed floor contains a baby goat and seemingly has no corporate purpose?", answer: "The goat room (or perpetuity wing birthing area)", acceptableAnswers: ["The goat room", "Baby goat room", "Perpetuity wing goats"], explanation: "The unexplained baby goats remain one of the show's most surreal and unresolved mysteries." },
    ],
  },
  {
    id: "mu_kendrick",
    group: "music",
    name: "Kendrick Lamar",
    culture: "american",
    description: "Compton's poet laureate — concept albums, lyrical warfare, and cultural impact.",
    imageUrl: "",
    questions: [
      { id: "ken_200_01", categoryId: "mu_kendrick", tier: 200, prompt: "What city is Kendrick Lamar from, which heavily influences his music and storytelling?", answer: "Compton", acceptableAnswers: ["Compton, California", "Compton CA"], explanation: "Compton is central to Kendrick's identity and much of his lyrical content." },
      { id: "ken_200_02", categoryId: "mu_kendrick", tier: 200, prompt: "What 2017 Kendrick Lamar song features the repeated refrain 'sit down — be humble'?", answer: "HUMBLE.", acceptableAnswers: ["Humble", "HUMBLE"], explanation: "HUMBLE. became one of Kendrick's biggest commercial hits." },
      { id: "ken_200_03", categoryId: "mu_kendrick", tier: 200, prompt: "Kendrick won a Pulitzer Prize for what album, making him the first non-jazz or classical artist to win?", answer: "DAMN.", acceptableAnswers: ["DAMN", "Damn"], explanation: "DAMN. won the 2018 Pulitzer Prize for Music, a historic first for hip-hop." },
      { id: "ken_400_01", categoryId: "mu_kendrick", tier: 400, prompt: "What concept album tells the story of Kendrick's visit to the White House and features a spoken-word conversation with Tupac?", answer: "To Pimp a Butterfly", acceptableAnswers: ["TPAB", "To Pimp a Butterfly"], explanation: "TPAB weaves jazz, funk, and spoken word into one of hip-hop's most ambitious albums." },
      { id: "ken_400_02", categoryId: "mu_kendrick", tier: 400, prompt: "What is the name of Kendrick's independent label, through which he releases his music under the Top Dawg Entertainment umbrella?", answer: "pgLang", acceptableAnswers: ["pg Lang", "pgLang"], explanation: "pgLang is Kendrick's creative company co-founded with Dave Free." },
      { id: "ken_400_03", categoryId: "mu_kendrick", tier: 400, prompt: "On 'good kid, m.A.A.d city,' what does the album subtitle 'A Short Film by Kendrick Lamar' signify about its structure?", answer: "The album is meant to be experienced as a linear narrative film, telling a single day in Compton", acceptableAnswers: ["It's a narrative/cinematic album", "Linear story of a day in Compton", "Short film narrative structure"], explanation: "The album plays like a movie, following young Kendrick through a transformative day." },
      { id: "ken_600_01", categoryId: "mu_kendrick", tier: 600, prompt: "On 'To Pimp a Butterfly,' each song ends with Kendrick reading a growing poem. What is the full poem ultimately revealed to be?", answer: "A conversation/letter to Tupac Shakur that builds piece by piece across the album", acceptableAnswers: ["A letter to Tupac", "A poem/conversation with Tupac", "The poem builds into a dialogue with 2Pac"], explanation: "Each track adds lines to a poem that culminates in a posthumous interview with Tupac." },
      { id: "ken_600_02", categoryId: "mu_kendrick", tier: 600, prompt: "What is the dual meaning of the album title 'DAMN.' — one reading the tracklist forward and one reading it backward?", answer: "Forward tells a story of weakness to wickedness; backward tells wickedness to weakness — the album works in both directions", acceptableAnswers: ["Forward and backward tracklist narratives", "Two narrative directions", "Weakness to wickedness forward, reversed backward"], explanation: "Kendrick confirmed the album has two narrative arcs depending on track order." },
      { id: "ken_600_03", categoryId: "mu_kendrick", tier: 600, prompt: "In the 2024 Drake-Kendrick beef, what diss track by Kendrick contained allegations so specific that it dominated social media and effectively ended the battle?", answer: "Not Like Us", acceptableAnswers: ["Not Like Us"], explanation: "Not Like Us became a cultural phenomenon, going #1 and being performed at the Super Bowl." },
    ],
  },
  {
    id: "mu_bob_marley",
    group: "music",
    name: "Bob Marley",
    culture: "universal",
    description: "One love, one heart — reggae's global ambassador from Trench Town.",
    imageUrl: "",
    questions: [
      { id: "bml_200_01", categoryId: "mu_bob_marley", tier: 200, prompt: "What genre of music is Bob Marley most associated with?", answer: "Reggae", explanation: "Marley brought reggae from Jamaica to the entire world." },
      { id: "bml_200_02", categoryId: "mu_bob_marley", tier: 200, prompt: "What is the name of Bob Marley's backing band?", answer: "The Wailers", acceptableAnswers: ["Wailers", "The Wailers"], explanation: "Bob Marley and the Wailers became the most recognized reggae act in history." },
      { id: "bml_200_03", categoryId: "mu_bob_marley", tier: 200, prompt: "What spiritual movement was Bob Marley a devout follower of, which influenced his music and lifestyle?", answer: "Rastafari", acceptableAnswers: ["Rastafarianism", "Rasta", "Rastafari movement"], explanation: "Rastafari beliefs about peace, justice, and African identity permeate Marley's music." },
      { id: "bml_400_01", categoryId: "mu_bob_marley", tier: 400, prompt: "What neighborhood in Kingston, Jamaica did Bob Marley grow up in, which became synonymous with reggae culture?", answer: "Trench Town", acceptableAnswers: ["Trenchtown"], explanation: "Trench Town was the birthplace of reggae and ska, and Marley immortalized it in song." },
      { id: "bml_400_02", categoryId: "mu_bob_marley", tier: 400, prompt: "In 1976, Bob Marley was shot during a politically motivated assassination attempt. What did he famously do two days later?", answer: "He performed at the Smile Jamaica concert as planned", acceptableAnswers: ["Performed at Smile Jamaica", "He still performed", "Played the concert anyway"], explanation: "Despite bullet wounds, Marley took the stage, saying 'The people who are trying to make this world worse never take a day off.'" },
      { id: "bml_400_03", categoryId: "mu_bob_marley", tier: 400, prompt: "What album, released in 1977, contains the songs 'Jamming,' 'Waiting in Vain,' and 'One Love/People Get Ready'?", answer: "Exodus", explanation: "Exodus was named Album of the Century by Time magazine in 1999." },
      { id: "bml_600_01", categoryId: "mu_bob_marley", tier: 600, prompt: "What specific injury led to the discovery of the melanoma that eventually killed Bob Marley, and why did he refuse the recommended treatment?", answer: "A toe injury during a football match revealed melanoma; he refused amputation due to Rastafari beliefs about bodily wholeness", acceptableAnswers: ["Toe injury from football, refused amputation for religious reasons", "Soccer toe injury, Rastafari beliefs prevented amputation"], explanation: "The cancer spread from his toe throughout his body because he refused amputation on religious grounds." },
      { id: "bml_600_02", categoryId: "mu_bob_marley", tier: 600, prompt: "What was the One Love Peace Concert in 1978, and what iconic moment occurred on stage involving two rival Jamaican political leaders?", answer: "Marley brought rival politicians Michael Manley and Edward Seaga together on stage, joining their hands overhead", acceptableAnswers: ["He joined Manley and Seaga's hands on stage", "United Manley and Seaga on stage"], explanation: "In a legendary moment, Marley physically united Jamaica's two warring political leaders during a performance." },
      { id: "bml_600_03", categoryId: "mu_bob_marley", tier: 600, prompt: "What was the original lineup of The Wailers before Bob became the frontman, and which two members left to pursue solo careers?", answer: "Peter Tosh and Bunny Wailer left; the original trio was Bob, Peter, and Bunny", acceptableAnswers: ["Peter Tosh and Bunny Wailer", "Tosh and Bunny Livingston"], explanation: "The original Wailers were Bob, Peter Tosh, and Bunny Wailer — both left in 1974 for solo careers." },
    ],
  },
  {
    id: "mv_horror_classics",
    group: "movies",
    name: "Horror Classics",
    culture: "universal",
    description: "The films that defined fear — from silent shadows to modern nightmares.",
    imageUrl: "",
    questions: [
      { id: "hor_200_01", categoryId: "mv_horror_classics", tier: 200, prompt: "What 1973 horror film about a possessed girl is often called the scariest movie ever made?", answer: "The Exorcist", explanation: "William Friedkin's film about the possession of Regan MacNeil shocked audiences worldwide." },
      { id: "hor_200_02", categoryId: "mv_horror_classics", tier: 200, prompt: "In 'Psycho,' what famous scene involves a murder in a motel bathroom?", answer: "The shower scene", acceptableAnswers: ["Shower scene", "The shower murder"], explanation: "Hitchcock's shower scene is the most analyzed sequence in horror history." },
      { id: "hor_200_03", categoryId: "mv_horror_classics", tier: 200, prompt: "What masked killer stalks babysitters in the 1978 slasher film 'Halloween'?", answer: "Michael Myers", acceptableAnswers: ["Michael Myers", "The Shape"], explanation: "John Carpenter's Michael Myers defined the slasher genre." },
      { id: "hor_400_01", categoryId: "mv_horror_classics", tier: 400, prompt: "What is the 'final girl' trope in horror films, and which 1974 film is often credited with establishing it?", answer: "The last surviving female character who confronts the killer; 'The Texas Chain Saw Massacre' or 'Black Christmas' helped establish it", acceptableAnswers: ["Last surviving woman", "Final surviving girl trope", "Sally Hardesty in Texas Chain Saw Massacre"], explanation: "The 'final girl' — the sole female survivor — became a defining slasher convention." },
      { id: "hor_400_02", categoryId: "mv_horror_classics", tier: 400, prompt: "What 1968 George Romero film essentially created the modern zombie genre?", answer: "Night of the Living Dead", explanation: "Romero's low-budget film established the rules for zombies that the genre still follows." },
      { id: "hor_400_03", categoryId: "mv_horror_classics", tier: 400, prompt: "In 'The Shining,' what does Danny Torrance write on the door using his mother's lipstick, and what is it when read in a mirror?", answer: "REDRUM — which reads MURDER backwards", acceptableAnswers: ["REDRUM / MURDER", "Redrum which is murder backwards"], explanation: "One of horror's most iconic reveals, using a mirror to decode Danny's warning." },
      { id: "hor_600_01", categoryId: "mv_horror_classics", tier: 600, prompt: "What German Expressionist silent film from 1922 is considered the first vampire movie, and why was it nearly lost forever?", answer: "Nosferatu — a court ordered all copies destroyed because it was an unauthorized Dracula adaptation", acceptableAnswers: ["Nosferatu", "Nosferatu, eine Symphonie des Grauens"], explanation: "Bram Stoker's estate sued, and a court ordered every print destroyed. Surviving copies are why we have the film today." },
      { id: "hor_600_02", categoryId: "mv_horror_classics", tier: 600, prompt: "What production technique did William Friedkin use during 'The Exorcist' filming to get genuine shocked reactions from the actors?", answer: "He fired a gun on set without warning, physically rigged harnesses to yank actors, and kept the set freezing cold", acceptableAnswers: ["Fired guns on set", "Shocked actors with real gunfire and cold", "Physical manipulation of actors"], explanation: "Friedkin's extreme methods — including discharging firearms — were controversial but created authentic terror." },
      { id: "hor_600_03", categoryId: "mv_horror_classics", tier: 600, prompt: "What is the 'Lewton Bus' technique named after producer Val Lewton, and which 1942 film introduced it?", answer: "A fake jump scare where tension builds but the 'scare' is something harmless — named after a bus scene in 'Cat People'", acceptableAnswers: ["False scare technique from Cat People", "Misdirection scare from Cat People 1942", "Fake-out scare"], explanation: "In 'Cat People,' a terrifying stalking scene climaxes with a bus's sudden air brakes — not the expected monster." },
    ],
  },
  {
    id: "his_ancient_egypt",
    group: "history",
    name: "Ancient Egypt",
    culture: "universal",
    description: "Pharaohs, pyramids, and the Nile — 3000 years of civilization.",
    imageUrl: "",
    questions: [
      { id: "egy_200_01", categoryId: "his_ancient_egypt", tier: 200, prompt: "What river was the lifeline of ancient Egyptian civilization?", answer: "The Nile", acceptableAnswers: ["Nile", "Nile River", "The Nile River"], explanation: "The Nile's annual flooding created fertile land that sustained Egypt for millennia." },
      { id: "egy_200_02", categoryId: "his_ancient_egypt", tier: 200, prompt: "What massive stone structures at Giza were built as tombs for the pharaohs?", answer: "The Pyramids", acceptableAnswers: ["Pyramids", "Great Pyramids", "Pyramids of Giza"], explanation: "The Great Pyramid of Giza is the last surviving Wonder of the Ancient World." },
      { id: "egy_200_03", categoryId: "his_ancient_egypt", tier: 200, prompt: "What stone slab discovered in 1799 allowed scholars to finally decode Egyptian hieroglyphics?", answer: "The Rosetta Stone", acceptableAnswers: ["Rosetta Stone"], explanation: "The Rosetta Stone contained the same text in hieroglyphics, Demotic, and Greek." },
      { id: "egy_400_01", categoryId: "his_ancient_egypt", tier: 400, prompt: "What process did ancient Egyptians use to preserve bodies for the afterlife, involving removal of organs and wrapping in linen?", answer: "Mummification", acceptableAnswers: ["Mummification", "Embalming"], explanation: "The 70-day process involved removing internal organs, desiccation with natron, and careful wrapping." },
      { id: "egy_400_02", categoryId: "his_ancient_egypt", tier: 400, prompt: "Which female pharaoh ruled Egypt for over 20 years and is often depicted with a false beard in statues?", answer: "Hatshepsut", acceptableAnswers: ["Hatshepsut"], explanation: "One of the most successful pharaohs, her stepson later tried to erase her from history." },
      { id: "egy_400_03", categoryId: "his_ancient_egypt", tier: 400, prompt: "In Egyptian mythology, what happens during the 'Weighing of the Heart' ceremony after death?", answer: "The deceased's heart is weighed against the feather of Ma'at (truth); if heavier, the heart is devoured by Ammit", acceptableAnswers: ["Heart weighed against feather of truth", "Heart weighed against Ma'at's feather"], explanation: "Only those with a light heart — free of sin — could enter the afterlife." },
      { id: "egy_600_01", categoryId: "his_ancient_egypt", tier: 600, prompt: "What revolutionary religious reform did Pharaoh Akhenaten impose, and how did it end after his death?", answer: "He imposed monotheistic worship of the sun disk Aten, abandoning all other gods; it was reversed after his death and his monuments were destroyed", acceptableAnswers: ["Monotheistic Aten worship", "Sun disk Aten monotheism", "Atenism"], explanation: "Akhenaten's religious revolution was one of history's first attempts at monotheism, completely reversed by his successors." },
      { id: "egy_600_02", categoryId: "his_ancient_egypt", tier: 600, prompt: "What is the significance of the Narmer Palette, and what event in Egyptian history does it commemorate?", answer: "It commemorates the unification of Upper and Lower Egypt under one pharaoh, showing Narmer wearing both crowns", acceptableAnswers: ["Unification of Upper and Lower Egypt", "First pharaoh unifying Egypt"], explanation: "Dating to around 3100 BC, it's one of the earliest historical documents from Egypt." },
      { id: "egy_600_03", categoryId: "his_ancient_egypt", tier: 600, prompt: "What engineering technique do modern archaeologists believe was used to lift the 2.3 million stone blocks of the Great Pyramid, based on a recently discovered internal ramp?", answer: "An internal spiral ramp system that wound up through the pyramid's interior", acceptableAnswers: ["Internal ramp", "Spiral internal ramp", "Internal spiral ramp"], explanation: "Jean-Pierre Houdin's internal ramp theory, supported by thermal imaging, challenges the traditional external ramp theory." },
    ],
  },
  {
    id: "sci_psychology",
    group: "science",
    name: "Famous Psychology Experiments",
    culture: "universal",
    description: "The studies that revealed how humans really think, obey, and conform.",
    imageUrl: "",
    questions: [
      { id: "psy_200_01", categoryId: "sci_psychology", tier: 200, prompt: "What famous experiment by Stanley Milgram showed that ordinary people would administer what they believed were painful electric shocks when instructed by an authority figure?", answer: "The Milgram obedience experiment", acceptableAnswers: ["Milgram experiment", "Milgram obedience study", "Obedience experiment"], explanation: "65% of participants delivered the maximum 450-volt shock when ordered to by the experimenter." },
      { id: "psy_200_02", categoryId: "sci_psychology", tier: 200, prompt: "What is Pavlov's dog experiment famous for demonstrating — the process where a neutral stimulus triggers a learned response?", answer: "Classical conditioning", acceptableAnswers: ["Conditioning", "Pavlovian conditioning", "Classical conditioning"], explanation: "Pavlov showed dogs could learn to salivate at the sound of a bell associated with food." },
      { id: "psy_200_03", categoryId: "sci_psychology", tier: 200, prompt: "What controversial 1971 experiment at Stanford simulated a prison environment and had to be stopped early because participants became abusive?", answer: "The Stanford Prison Experiment", acceptableAnswers: ["Stanford Prison Experiment", "Zimbardo prison experiment"], explanation: "Philip Zimbardo's experiment showed how quickly people adopt authoritarian roles." },
      { id: "psy_400_01", categoryId: "sci_psychology", tier: 400, prompt: "What did Solomon Asch's conformity experiments demonstrate when participants were asked to compare line lengths while confederates gave obviously wrong answers?", answer: "People conformed to the group's wrong answer about 37% of the time, showing the power of social pressure", acceptableAnswers: ["People conform to wrong group answers", "Social conformity pressure", "Asch conformity effect"], explanation: "Even when the correct answer was obvious, many participants went along with the group." },
      { id: "psy_400_02", categoryId: "sci_psychology", tier: 400, prompt: "What psychological phenomenon did the 'Bobo doll experiment' by Albert Bandura demonstrate about children and aggression?", answer: "Children who watched adults act aggressively toward the doll imitated the aggressive behavior — demonstrating observational learning", acceptableAnswers: ["Observational learning of aggression", "Children imitate observed aggression", "Social learning theory"], explanation: "Bandura showed that children learn aggressive behavior by watching adults, not just through direct experience." },
      { id: "psy_400_03", categoryId: "sci_psychology", tier: 400, prompt: "What cognitive bias did Kahneman and Tversky demonstrate with their 'Linda problem,' where people judge a specific scenario as more likely than a general one?", answer: "The conjunction fallacy", acceptableAnswers: ["Conjunction fallacy", "Linda problem fallacy"], explanation: "People rated 'Linda is a feminist bank teller' as more likely than 'Linda is a bank teller,' violating basic probability." },
      { id: "psy_600_01", categoryId: "sci_psychology", tier: 600, prompt: "What ethical violations made John Watson's 'Little Albert' experiment infamous, and what happened to the child subject?", answer: "Watson conditioned an infant to fear white rats by pairing them with loud noises; the child was never deconditioned, and his identity remained unknown until researchers tracked him down decades later", acceptableAnswers: ["Conditioned infant fear without deconditionin", "Baby conditioned to fear without cure", "Infant fear conditioning never reversed"], explanation: "The experiment would be considered deeply unethical today — a baby was deliberately traumatized and never treated." },
      { id: "psy_600_02", categoryId: "sci_psychology", tier: 600, prompt: "What major criticism has been leveled at the Stanford Prison Experiment's methodology that has led many psychologists to question its conclusions?", answer: "Zimbardo coached the guards on how to be cruel, demand characteristics influenced behavior, and the sample was self-selected — it wasn't a natural emergence of cruelty", acceptableAnswers: ["Guards were coached", "Experimenter bias and demand characteristics", "Zimbardo influenced the guards"], explanation: "Recent evidence shows Zimbardo actively encouraged guard brutality rather than letting it emerge naturally." },
      { id: "psy_600_03", categoryId: "sci_psychology", tier: 600, prompt: "What is 'learned helplessness,' which experiment first demonstrated it, and what broader theory did it contribute to?", answer: "Seligman's experiments showed dogs that couldn't escape shocks eventually stopped trying even when escape was possible — it became a model for understanding depression", acceptableAnswers: ["Seligman's dog shock experiments, model for depression", "Dogs stopped escaping, led to depression theory"], explanation: "Martin Seligman's work became foundational for understanding clinical depression and later, positive psychology." },
    ],
  },
  {
    id: "cul_coffee",
    group: "culture",
    name: "Coffee Culture & History",
    culture: "universal",
    description: "From Ethiopian goats to third-wave pour-overs — the world's favorite stimulant.",
    imageUrl: "",
    questions: [
      { id: "cof_200_01", categoryId: "cul_coffee", tier: 200, prompt: "What country is widely considered the birthplace of coffee, where legend says a goatherd noticed his goats becoming energetic after eating certain berries?", answer: "Ethiopia", acceptableAnswers: ["Ethiopia"], explanation: "The legend of Kaldi the goatherd is the most popular coffee origin story." },
      { id: "cof_200_02", categoryId: "cul_coffee", tier: 200, prompt: "What Italian coffee drink is made by forcing hot water through finely-ground coffee under pressure?", answer: "Espresso", explanation: "Espresso is the foundation of most coffee shop drinks worldwide." },
      { id: "cof_200_03", categoryId: "cul_coffee", tier: 200, prompt: "What are the two main commercial species of coffee bean?", answer: "Arabica and Robusta", acceptableAnswers: ["Arabica and Robusta", "Coffea arabica and Coffea canephora"], explanation: "Arabica accounts for about 60% of world production, Robusta for most of the rest." },
      { id: "cof_400_01", categoryId: "cul_coffee", tier: 400, prompt: "What were the Ottoman-era coffeehouses called, and why did authorities sometimes try to ban them?", answer: "Qahveh khaneh — authorities feared they were centers of political dissent and free thinking", acceptableAnswers: ["Qahveh khaneh", "Kahvehane", "Ottoman coffeehouses banned for political dissent"], explanation: "Coffeehouses became hotbeds of intellectual discussion, making rulers nervous." },
      { id: "cof_400_02", categoryId: "cul_coffee", tier: 400, prompt: "What is 'third wave coffee,' and how does it differ from first and second wave?", answer: "Third wave treats coffee as an artisanal product like wine, focusing on origin, processing, and brewing technique — versus first wave (commodity) and second wave (Starbucks-style chains)", acceptableAnswers: ["Artisanal/craft coffee movement", "Coffee as artisanal craft", "Focus on origin and quality vs commodity"], explanation: "Third wave coffee emphasizes single-origin beans, light roasting, and manual brewing methods." },
      { id: "cof_400_03", categoryId: "cul_coffee", tier: 400, prompt: "What is the most expensive coffee in the world, produced using beans that have been eaten and excreted by a civet cat?", answer: "Kopi luwak", acceptableAnswers: ["Kopi luwak", "Civet coffee"], explanation: "The civet's digestive process ferments the beans, though ethical concerns about caged civets have emerged." },
      { id: "cof_600_01", categoryId: "cul_coffee", tier: 600, prompt: "What role did the 1773 Boston Tea Party play in establishing coffee as America's preferred drink over tea?", answer: "After the tea boycott, drinking coffee became a patriotic act — switching from British tea to coffee was a political statement", acceptableAnswers: ["Coffee became patriotic after tea boycott", "Tea boycott made coffee patriotic", "Political rejection of tea for coffee"], explanation: "The shift from tea to coffee in America was as much political as it was culinary." },
      { id: "cof_600_02", categoryId: "cul_coffee", tier: 600, prompt: "What is the 'coffee rust' (la roya) crisis, and how did it devastate Central American coffee production in the 2010s?", answer: "A fungal disease (Hemileia vastatrix) that attacks coffee leaves, causing massive crop losses — it destroyed up to 70% of crops in some Central American countries", acceptableAnswers: ["Hemileia vastatrix fungal disease", "Fungal leaf disease devastating crops", "La roya fungal crisis"], explanation: "Coffee leaf rust has been called the most economically important coffee disease in the world." },
      { id: "cof_600_03", categoryId: "cul_coffee", tier: 600, prompt: "What was the role of the Yemeni port city of Mocha in coffee history, and how did it give its name to the chocolate-coffee drink?", answer: "Mocha (Al-Makha) was the main port for coffee trade from the 15th-17th centuries; Yemeni coffee had natural chocolate notes, so 'mocha' became associated with chocolate-coffee flavor", acceptableAnswers: ["Al-Makha port for coffee trade", "Yemen coffee port with chocolate-noted beans", "Coffee trade port whose beans had chocolate notes"], explanation: "The port of Mocha was the world's coffee trading capital, and its beans' natural flavor profile gave us the term." },
    ],
  },
  {
    id: "his_vikings",
    group: "history",
    name: "Vikings",
    culture: "universal",
    description: "Norse raiders, traders, and explorers who reshaped medieval Europe.",
    imageUrl: "",
    questions: [
      { id: "vik_200_01", categoryId: "his_vikings", tier: 200, prompt: "What Scandinavian countries did the Vikings primarily come from?", answer: "Norway, Sweden, and Denmark", acceptableAnswers: ["Scandinavia", "Norway Sweden Denmark", "Denmark Norway and Sweden"], explanation: "The Viking Age (roughly 793-1066 AD) saw Norse seafarers from all three countries." },
      { id: "vik_200_02", categoryId: "his_vikings", tier: 200, prompt: "What type of ship were the Vikings famous for, characterized by a shallow draft and symmetrical design that could sail in both directions?", answer: "Longship", acceptableAnswers: ["Longship", "Longboat", "Viking longship"], explanation: "Longships could navigate both open seas and shallow rivers, enabling Viking expansion." },
      { id: "vik_200_03", categoryId: "his_vikings", tier: 200, prompt: "What was the name of the Viking afterlife hall where warriors who died in battle were taken by Odin?", answer: "Valhalla", acceptableAnswers: ["Valhalla", "Valhöll"], explanation: "Warriors in Valhalla feast and fight in preparation for Ragnarök." },
      { id: "vik_400_01", categoryId: "his_vikings", tier: 400, prompt: "Which Viking explorer is credited with reaching North America roughly 500 years before Columbus?", answer: "Leif Erikson", acceptableAnswers: ["Leif Eriksson", "Leif Ericson", "Leif Erikson"], explanation: "Leif established a settlement at Vinland, identified as L'Anse aux Meadows in Newfoundland." },
      { id: "vik_400_02", categoryId: "his_vikings", tier: 400, prompt: "What system of writing did the Vikings use, carving symbols into stone, wood, and bone?", answer: "Runes", acceptableAnswers: ["Runes", "Runic alphabet", "Futhark"], explanation: "The Elder Futhark and Younger Futhark runic alphabets were used throughout the Viking world." },
      { id: "vik_400_03", categoryId: "his_vikings", tier: 400, prompt: "What was the Danelaw in England, established after Viking invasions in the 9th century?", answer: "The area of England under Danish law and control, covering roughly the northern and eastern regions", acceptableAnswers: ["Danish-controlled area of England", "Viking-ruled part of England", "Area under Danish/Norse law"], explanation: "The Danelaw was formally recognized in a treaty between Alfred the Great and the Viking leader Guthrum." },
      { id: "vik_600_01", categoryId: "his_vikings", tier: 600, prompt: "What was the 'Great Heathen Army' that invaded England in 865 AD, and what motivated its leaders beyond typical raiding?", answer: "A coalition of Norse warriors led by the sons of Ragnar Lothbrok, seeking revenge for their father's execution by King Ælla of Northumbria", acceptableAnswers: ["Sons of Ragnar avenging his death", "Revenge army of Ragnar's sons", "Norse coalition avenging Ragnar Lothbrok"], explanation: "The Great Heathen Army transformed Viking activity in England from raiding to conquest and settlement." },
      { id: "vik_600_02", categoryId: "his_vikings", tier: 600, prompt: "What is a 'blood eagle,' and what is the historical debate about whether it was actually practiced?", answer: "A ritualistic execution where the ribs were cut from the spine and lungs pulled out to resemble wings; historians debate whether it was real or a later literary invention", acceptableAnswers: ["Ritual execution cutting ribs from spine", "Lung-spreading execution, debated if real", "Possibly mythical Viking execution method"], explanation: "Described in Norse sagas, many modern historians believe it may be a misinterpretation of poetic metaphor." },
      { id: "vik_600_03", categoryId: "his_vikings", tier: 600, prompt: "What role did the Varangian Guard play in Byzantine history, and how did Norse warriors end up protecting the Emperor in Constantinople?", answer: "Viking mercenaries who became the elite bodyguard unit of the Byzantine Emperor, recruited through trade routes connecting Scandinavia to Constantinople via Russian rivers", acceptableAnswers: ["Viking bodyguards of Byzantine Emperor", "Norse elite guard unit in Constantinople", "Scandinavian mercenary imperial guard"], explanation: "The Varangian Guard served from the 10th to 14th centuries, with famous members including Harald Hardrada." },
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

    print(f"SUCCESS: Wave 68 categories inserted.")
    print(f"File size: {len(new_content)} characters")

if __name__ == "__main__":
    main()
