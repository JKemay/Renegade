#!/usr/bin/env python3
"""Insert wave 69 categories into categories.ts"""
import sys

CATEGORIES_PATH = "C:/Users/janti/downloads/Data-Model-Home/Data-Model-Home/artifacts/renegade/constants/categories.ts"

NEW_CATEGORIES = r"""
  {
    id: "tv_the_wire",
    group: "tv",
    name: "The Wire",
    culture: "american",
    description: "All the pieces matter — Baltimore's institutions laid bare.",
    imageUrl: "",
    questions: [
      { id: "wir_200_01", categoryId: "tv_the_wire", tier: 200, prompt: "What city is The Wire set in?", answer: "Baltimore", acceptableAnswers: ["Baltimore, Maryland"], explanation: "The Wire is a love letter and critique of Baltimore's institutions." },
      { id: "wir_200_02", categoryId: "tv_the_wire", tier: 200, prompt: "What does detective Jimmy McNulty's obsession with a drug kingpin kick off in Season 1?", answer: "A wiretap investigation into the Barksdale organization", acceptableAnswers: ["A wiretap", "The Barksdale investigation", "Wire tap on drug dealers"], explanation: "McNulty's refusal to let the case go launches the entire series." },
      { id: "wir_200_03", categoryId: "tv_the_wire", tier: 200, prompt: "What game do the corner kids play throughout the series that mirrors the drug trade hierarchy?", answer: "Chess", acceptableAnswers: ["Chess"], explanation: "D'Angelo's chess lesson using drug trade metaphors is one of the show's most iconic scenes." },
      { id: "wir_400_01", categoryId: "tv_the_wire", tier: 400, prompt: "What institution does each season of The Wire primarily examine beyond the drug trade?", answer: "Season 2: the port/unions, Season 3: politics, Season 4: schools, Season 5: media", acceptableAnswers: ["Ports, politics, schools, media", "Docks unions politics education journalism"], explanation: "Each season adds a new Baltimore institution, building a comprehensive portrait of the city." },
      { id: "wir_400_02", categoryId: "tv_the_wire", tier: 400, prompt: "What is Omar Little's signature weapon and his famous code about who he robs?", answer: "A shotgun, and he only robs drug dealers — 'a man gotta have a code'", acceptableAnswers: ["Shotgun, only robs drug dealers", "Sawed-off shotgun, Omar don't scare"], explanation: "Omar's code of only targeting drug dealers made him one of TV's most beloved antiheroes." },
      { id: "wir_400_03", categoryId: "tv_the_wire", tier: 400, prompt: "What is 'Hamsterdam' in Season 3, and who creates it?", answer: "Major Bunny Colvin creates unofficial free zones where drug dealing is tolerated, dramatically reducing crime elsewhere", acceptableAnswers: ["Free drug zones by Bunny Colvin", "Legalized drug zones", "Colvin's free zones for dealers"], explanation: "Colvin's radical experiment — essentially legalizing drugs in specific areas — is one of the show's boldest plotlines." },
      { id: "wir_600_01", categoryId: "tv_the_wire", tier: 600, prompt: "What is the significance of the 'fuck' scene between McNulty and Bunk, where they investigate a crime scene using only variations of one word?", answer: "They reconstruct an entire murder scene communicating only with the word 'fuck' and its variations — demonstrating the show's unconventional storytelling", acceptableAnswers: ["Crime scene with only the word fuck", "Entire investigation using one word"], explanation: "The four-minute scene uses no other dialogue, yet the detectives solve the case." },
      { id: "wir_600_02", categoryId: "tv_the_wire", tier: 600, prompt: "What is the thematic significance of Michael becoming the 'new Omar' and Dukie becoming the 'new Bubbles' in the series finale?", answer: "The cycle repeats — new generations fill the same roles in Baltimore's ecosystem, showing that the system perpetuates itself regardless of individual fates", acceptableAnswers: ["The cycle repeats with new people", "Systemic cycles continue with new faces", "Baltimore's cycle perpetuates itself"], explanation: "The Wire's final montage shows how every character is replaced by a younger version, the system unchanged." },
      { id: "wir_600_03", categoryId: "tv_the_wire", tier: 600, prompt: "What real-life inspiration did creator David Simon draw from for The Wire, and what was his professional background?", answer: "Simon was a Baltimore Sun crime reporter who spent a year embedded with the homicide unit, which he chronicled in his book 'Homicide: A Year on the Killing Streets'", acceptableAnswers: ["Baltimore Sun reporter, wrote Homicide book", "Crime reporter embedded with homicide unit", "His book Homicide: A Year on the Killing Streets"], explanation: "Simon's journalism background gave The Wire its documentary-like authenticity." },
    ],
  },
  {
    id: "tv_mr_robot",
    group: "tv",
    name: "Mr. Robot",
    culture: "american",
    description: "Elliot Alderson vs the world — hacking, mental illness, and revolution.",
    imageUrl: "",
    questions: [
      { id: "mrr_200_01", categoryId: "tv_mr_robot", tier: 200, prompt: "What is the name of the main character, a cybersecurity engineer and hacker with social anxiety?", answer: "Elliot Alderson", acceptableAnswers: ["Elliot"], explanation: "Rami Malek's Elliot is a brilliant but troubled hacker who talks directly to the audience." },
      { id: "mrr_200_02", categoryId: "tv_mr_robot", tier: 200, prompt: "What major corporation does the hacker group fsociety plan to take down?", answer: "E Corp (Evil Corp)", acceptableAnswers: ["E Corp", "Evil Corp"], explanation: "Elliot's mind substitutes 'Evil Corp' for E Corp, and the show follows suit." },
      { id: "mrr_200_03", categoryId: "tv_mr_robot", tier: 200, prompt: "What is the name of the mysterious anarchist figure who recruits Elliot, played by Christian Slater?", answer: "Mr. Robot", explanation: "The titular character who leads fsociety's revolution against corporate America." },
      { id: "mrr_400_01", categoryId: "tv_mr_robot", tier: 400, prompt: "What major twist about Mr. Robot's identity is revealed at the end of Season 1?", answer: "Mr. Robot is a hallucination — he's Elliot's dead father, and Elliot has dissociative identity disorder", acceptableAnswers: ["Mr. Robot is Elliot's alter ego", "He's Elliot's dead father hallucination", "Mr. Robot is a split personality"], explanation: "The Fight Club-inspired twist recontextualizes everything in the first season." },
      { id: "mrr_400_02", categoryId: "tv_mr_robot", tier: 400, prompt: "What makes Mr. Robot's depiction of hacking notable compared to most TV shows and movies?", answer: "The hacking is technically accurate — real tools, real techniques, and real vulnerabilities are shown", acceptableAnswers: ["Technically accurate hacking", "Real hacking tools and methods", "Realistic cybersecurity"], explanation: "The show employed real security consultants and used actual hacking tools like Kali Linux." },
      { id: "mrr_400_03", categoryId: "tv_mr_robot", tier: 400, prompt: "What is the '5/9 hack' that fsociety executes, and what is its intended effect on society?", answer: "Encrypting and destroying E Corp's financial records to erase all consumer debt", acceptableAnswers: ["Erasing all debt", "Encrypting E Corp financial records", "Destroying debt records"], explanation: "The hack succeeds but creates economic chaos rather than the liberation fsociety envisioned." },
      { id: "mrr_600_01", categoryId: "tv_mr_robot", tier: 600, prompt: "In Season 3, one entire episode is filmed to appear as a single continuous take during a building takeover. What makes this episode technically remarkable?", answer: "Episode 'eps3.4_runtime-error.r00' appears to be one unbroken 45-minute shot, achieved through hidden cuts and precise choreography across multiple floors and locations", acceptableAnswers: ["Single-take episode with hidden cuts", "45-minute continuous shot episode", "Oner episode across multiple floors"], explanation: "The episode follows multiple characters in real-time through an elaborate sequence." },
      { id: "mrr_600_02", categoryId: "tv_mr_robot", tier: 600, prompt: "What is the final revelation about Elliot's identity in the series finale — who has the audience been talking to the entire series?", answer: "The 'Elliot' we've been watching is another alter personality called 'The Mastermind' who took over the real Elliot's life; the audience is yet another alter called 'The Voyeur'", acceptableAnswers: ["We watched an alter called The Mastermind", "Elliot is an alter personality, not the real Elliot", "The Mastermind alter"], explanation: "The real Elliot has been hidden away while his 'Mastermind' alter ran the revolution." },
      { id: "mrr_600_03", categoryId: "tv_mr_robot", tier: 600, prompt: "What real-world hacking group and incident did Sam Esmail cite as a primary inspiration for fsociety's methods?", answer: "Anonymous and the Sony Pictures hack / LulzSec hacktivism", acceptableAnswers: ["Anonymous", "LulzSec", "Anonymous and LulzSec", "Sony hack"], explanation: "The show drew from real hacktivism movements and corporate breaches of the 2010s." },
    ],
  },
  {
    id: "mu_led_zeppelin",
    group: "music",
    name: "Led Zeppelin",
    culture: "universal",
    description: "The hammer of the gods — heavy riffs, mysticism, and rock immortality.",
    imageUrl: "",
    questions: [
      { id: "lzp_200_01", categoryId: "mu_led_zeppelin", tier: 200, prompt: "What iconic Led Zeppelin song features a famous guitar solo and the lyric 'And she's buying a stairway to heaven'?", answer: "Stairway to Heaven", explanation: "Often called the greatest rock song ever written, despite never being released as a single." },
      { id: "lzp_200_02", categoryId: "mu_led_zeppelin", tier: 200, prompt: "Who was Led Zeppelin's legendary guitarist known for his Gibson Les Paul and occult interests?", answer: "Jimmy Page", acceptableAnswers: ["Page", "Jimmy Page"], explanation: "Page was a session guitarist prodigy before forming Led Zeppelin." },
      { id: "lzp_200_03", categoryId: "mu_led_zeppelin", tier: 200, prompt: "What Led Zeppelin song contains the iconic drum intro that is one of the most recognized in rock history?", answer: "Rock and Roll", acceptableAnswers: ["Rock and Roll"], explanation: "John Bonham's opening drum fill is instantly recognizable." },
      { id: "lzp_400_01", categoryId: "mu_led_zeppelin", tier: 400, prompt: "What is the actual title of Led Zeppelin's untitled fourth album, commonly called 'Led Zeppelin IV'?", answer: "It has no official title — it's often called 'Led Zeppelin IV,' 'Zoso,' or 'Four Symbols'", acceptableAnswers: ["Untitled", "No title", "Zoso", "Four Symbols"], explanation: "The band deliberately left it untitled, using four symbols instead of names on the cover." },
      { id: "lzp_400_02", categoryId: "mu_led_zeppelin", tier: 400, prompt: "What tragic event in 1980 led to the immediate breakup of Led Zeppelin?", answer: "The death of drummer John Bonham", acceptableAnswers: ["John Bonham's death", "Bonham died", "John Bonham died"], explanation: "Bonham died after a heavy drinking session; the band dissolved within months, saying they couldn't continue without him." },
      { id: "lzp_400_03", categoryId: "mu_led_zeppelin", tier: 400, prompt: "What J.R.R. Tolkien references appear in Led Zeppelin songs like 'Ramble On' and 'The Battle of Evermore'?", answer: "Ramble On mentions Gollum and Mordor; Battle of Evermore references the Ringwraiths and the Lord of the Rings", acceptableAnswers: ["Gollum, Mordor, Ringwraiths", "Lord of the Rings references", "Tolkien characters and places"], explanation: "Page and Plant were avid Tolkien fans, weaving Middle-earth references throughout their catalog." },
      { id: "lzp_600_01", categoryId: "mu_led_zeppelin", tier: 600, prompt: "What is the 'Mudshark incident' at the Edgewater Inn in Seattle that became one of rock's most notorious tour stories?", answer: "Members of the band's entourage allegedly used a mud shark caught from the hotel window in a groupie encounter — it became one of rock's most infamous legends", acceptableAnswers: ["Mud shark groupie incident", "Fish incident at Edgewater Inn", "Shark/fish hotel incident"], explanation: "The incident, likely involving road manager Richard Cole, became synonymous with rock excess." },
      { id: "lzp_600_02", categoryId: "mu_led_zeppelin", tier: 600, prompt: "What legal controversy surrounded 'Stairway to Heaven' when the band Spirit sued Led Zeppelin, and what was the outcome?", answer: "Spirit claimed the opening notes were taken from their instrumental 'Taurus'; after years of litigation, Led Zeppelin ultimately won the case", acceptableAnswers: ["Spirit's Taurus lawsuit", "Taurus plagiarism case, Zeppelin won", "Spirit sued over Taurus similarity"], explanation: "The case went through multiple trials before Led Zeppelin was cleared of copyright infringement." },
      { id: "lzp_600_03", categoryId: "mu_led_zeppelin", tier: 600, prompt: "What was Jimmy Page's pre-Led Zeppelin career that made him one of the most sought-after musicians in London?", answer: "He was one of the top session guitarists in London, playing on recordings for The Who, The Kinks, Joe Cocker, and many others before joining The Yardbirds", acceptableAnswers: ["Session guitarist", "Top London session musician", "Session guitarist for The Who, Kinks etc."], explanation: "Page played on hundreds of recordings before forming Led Zeppelin from the ashes of The Yardbirds." },
    ],
  },
  {
    id: "mu_classical_composers",
    group: "music",
    name: "Classical Composers",
    culture: "universal",
    description: "From Bach to Beethoven — the geniuses who built Western music.",
    imageUrl: "",
    questions: [
      { id: "cls_200_01", categoryId: "mu_classical_composers", tier: 200, prompt: "What composer, who became completely deaf, wrote his famous Ninth Symphony without being able to hear it?", answer: "Ludwig van Beethoven", acceptableAnswers: ["Beethoven"], explanation: "Beethoven's Ninth, featuring 'Ode to Joy,' was composed while he was profoundly deaf." },
      { id: "cls_200_02", categoryId: "mu_classical_composers", tier: 200, prompt: "What Austrian child prodigy was composing symphonies by age 8 and died at 35?", answer: "Wolfgang Amadeus Mozart", acceptableAnswers: ["Mozart"], explanation: "Mozart composed over 600 works in his short life, beginning as a touring child prodigy." },
      { id: "cls_200_03", categoryId: "mu_classical_composers", tier: 200, prompt: "What piece of classical music is famously used in the 'Ride of the Valkyries' helicopter scene in 'Apocalypse Now'?", answer: "Ride of the Valkyries by Richard Wagner", acceptableAnswers: ["Ride of the Valkyries", "Wagner's Ride of the Valkyries"], explanation: "Wagner's operatic piece became inseparable from the Vietnam War film scene." },
      { id: "cls_400_01", categoryId: "mu_classical_composers", tier: 400, prompt: "What innovative technique did Johann Sebastian Bach perfect that involves multiple independent melodies played simultaneously?", answer: "Counterpoint (specifically fugue)", acceptableAnswers: ["Counterpoint", "Fugue", "Polyphony", "Contrapuntal writing"], explanation: "Bach's mastery of counterpoint, especially in his fugues, remains unmatched." },
      { id: "cls_400_02", categoryId: "mu_classical_composers", tier: 400, prompt: "What Russian composer wrote 'The Rite of Spring,' which caused a riot at its 1913 Paris premiere?", answer: "Igor Stravinsky", acceptableAnswers: ["Stravinsky"], explanation: "The avant-garde ballet's dissonant music and provocative choreography literally caused a brawl in the audience." },
      { id: "cls_400_03", categoryId: "mu_classical_composers", tier: 400, prompt: "What is the name of Antonio Vivaldi's most famous work, a set of four violin concertos each representing a season?", answer: "The Four Seasons", acceptableAnswers: ["Four Seasons", "Le quattro stagioni"], explanation: "Composed around 1720, The Four Seasons remains one of the most performed classical works." },
      { id: "cls_600_01", categoryId: "mu_classical_composers", tier: 600, prompt: "What mystery surrounds Mozart's Requiem, and why was it left unfinished?", answer: "Mozart died before completing it; it was commissioned anonymously (by Count Walsegg), and his student Franz Xaver Süssmayr finished it", acceptableAnswers: ["He died before finishing, student completed it", "Anonymous commission, died during composition, Süssmayr finished", "Died composing it, Süssmayr completed"], explanation: "The mystery commissioner and Mozart's deathbed work on the Requiem have fueled legends for centuries." },
      { id: "cls_600_02", categoryId: "mu_classical_composers", tier: 600, prompt: "What was the musical innovation Beethoven introduced in his Third Symphony ('Eroica') that fundamentally changed the symphony as a form?", answer: "He dramatically expanded the symphony's emotional range, length, and complexity — making it a vehicle for personal expression rather than courtly entertainment", acceptableAnswers: ["Expanded symphonic form for personal expression", "Made symphony a vehicle for individual expression", "Revolutionized symphony from entertainment to art"], explanation: "The Eroica was twice as long as typical symphonies and expressed individual heroism rather than serving aristocratic patrons." },
      { id: "cls_600_03", categoryId: "mu_classical_composers", tier: 600, prompt: "What unusual condition did Shostakovich supposedly have that allowed him to hear music from a piece of shrapnel lodged in his skull?", answer: "A metal fragment near his auditory cortex allegedly caused him to hear melodies when he tilted his head — though this story is disputed", acceptableAnswers: ["Shrapnel in skull made him hear music", "Metal fragment caused phantom melodies", "Head shrapnel auditory hallucinations"], explanation: "The story, while possibly apocryphal, is one of classical music's most fascinating legends." },
    ],
  },
  {
    id: "vg_red_dead",
    group: "video_games",
    name: "Red Dead Redemption 2",
    culture: "american",
    description: "The last days of the Van der Linde gang — outlaws in a dying frontier.",
    imageUrl: "",
    questions: [
      { id: "rdr_200_01", categoryId: "vg_red_dead", tier: 200, prompt: "What is the name of the outlaw gang that Arthur Morgan belongs to in RDR2?", answer: "The Van der Linde gang", acceptableAnswers: ["Van der Linde gang", "Dutch's gang"], explanation: "The gang, led by Dutch van der Linde, is the heart of the story." },
      { id: "rdr_200_02", categoryId: "vg_red_dead", tier: 200, prompt: "What is the name of the main playable character in RDR2?", answer: "Arthur Morgan", acceptableAnswers: ["Arthur"], explanation: "Arthur Morgan is widely considered one of the greatest video game protagonists." },
      { id: "rdr_200_03", categoryId: "vg_red_dead", tier: 200, prompt: "What historical era is RDR2 set in — the decline of what American period?", answer: "The end of the Wild West / American frontier era (1899)", acceptableAnswers: ["End of the Wild West", "1899", "Dying Old West", "End of the frontier"], explanation: "Set in 1899, the game chronicles the death of the outlaw way of life." },
      { id: "rdr_400_01", categoryId: "vg_red_dead", tier: 400, prompt: "What illness does Arthur Morgan contract that fundamentally changes the game's tone and Arthur's perspective?", answer: "Tuberculosis", acceptableAnswers: ["TB", "Tuberculosis"], explanation: "Arthur's TB diagnosis transforms him from outlaw to a man seeking redemption." },
      { id: "rdr_400_02", categoryId: "vg_red_dead", tier: 400, prompt: "What is the 'Honor' system in RDR2, and how does it affect the ending?", answer: "A morality system that tracks good/bad deeds and determines which of several endings Arthur receives", acceptableAnswers: ["Morality system affecting endings", "Good/bad karma affecting story ending", "Honor meter changes the ending"], explanation: "High honor leads to a more redemptive ending; low honor leads to a bleaker one." },
      { id: "rdr_400_03", categoryId: "vg_red_dead", tier: 400, prompt: "What is Dutch van der Linde's repeated promise to the gang that becomes increasingly hollow as the story progresses?", answer: "He always has 'a plan' and promises one more big score before they can escape to freedom", acceptableAnswers: ["He has a plan", "One more score", "I have a plan", "Just one more score"], explanation: "'I have a plan' becomes Dutch's catchphrase as his promises ring increasingly hollow." },
      { id: "rdr_600_01", categoryId: "vg_red_dead", tier: 600, prompt: "What happens in the 'final ride' sequence when Arthur returns to camp for the last time, and how does the Honor system affect it?", answer: "Arthur rides back as memories of people he helped or hurt flash on screen; high honor shows grateful faces and the music is redemptive, low honor shows victims and the music is darker", acceptableAnswers: ["Memory flashbacks during the ride", "Flashbacks of helped/hurt people based on honor", "Honor determines flashback montage"], explanation: "The final ride is one of gaming's most emotional sequences, personalized by the player's choices." },
      { id: "rdr_600_02", categoryId: "vg_red_dead", tier: 600, prompt: "What is the significance of the deer and wolf visions Arthur sees throughout the game?", answer: "The deer appears with high honor (representing grace/redemption) and the wolf appears with low honor (representing predation/violence) — they're spiritual reflections of Arthur's morality", acceptableAnswers: ["Deer = high honor, wolf = low honor", "Spirit animals reflecting morality", "Honor-based animal visions"], explanation: "These subtle vision sequences serve as spiritual barometers of the player's moral choices." },
      { id: "rdr_600_03", categoryId: "vg_red_dead", tier: 600, prompt: "What detail about the game's horse bonding system made players emotionally devastated during a specific late-game scene?", answer: "Arthur's final horse dies in the last mission; if the player bonded with one horse the whole game, Arthur thanks the horse by name — 'Thank you' — as it dies", acceptableAnswers: ["Arthur thanks his dying horse", "Horse death scene with thank you", "Final horse goodbye scene"], explanation: "The moment Arthur says 'thank you' to his dying horse is cited as one of gaming's most heartbreaking scenes." },
    ],
  },
  {
    id: "vg_hollow_knight",
    group: "video_games",
    name: "Hollow Knight",
    culture: "universal",
    description: "Beneath the fading town of Dirtmouth lies the vast kingdom of Hallownest.",
    imageUrl: "",
    questions: [
      { id: "hlk_200_01", categoryId: "vg_hollow_knight", tier: 200, prompt: "What type of creatures make up the entire cast of Hollow Knight?", answer: "Bugs / Insects", acceptableAnswers: ["Bugs", "Insects", "Bug characters"], explanation: "Every character in Hallownest is some form of insect or arthropod." },
      { id: "hlk_200_02", categoryId: "vg_hollow_knight", tier: 200, prompt: "What genre is Hollow Knight, combining exploration, platforming, and ability-gated progression?", answer: "Metroidvania", acceptableAnswers: ["Metroidvania", "Action-adventure metroidvania"], explanation: "Hollow Knight is one of the most acclaimed Metroidvanias ever made." },
      { id: "hlk_200_03", categoryId: "vg_hollow_knight", tier: 200, prompt: "What small town sits above the entrance to the underground kingdom of Hallownest?", answer: "Dirtmouth", explanation: "The quiet village of Dirtmouth serves as the game's hub and save point." },
      { id: "hlk_400_01", categoryId: "vg_hollow_knight", tier: 400, prompt: "What is the 'Infection' or 'Orange plague' that has driven most of Hallownest's inhabitants mindless?", answer: "The Radiance's light — a forgotten god whose influence turns bugs into mindless husks", acceptableAnswers: ["The Radiance", "Radiance's infection", "Light of the Radiance"], explanation: "The Radiance is a moth goddess whose suppressed light manifests as the orange Infection." },
      { id: "hlk_400_02", categoryId: "vg_hollow_knight", tier: 400, prompt: "What currency do you collect from enemies and use to buy items, maps, and upgrades?", answer: "Geo", explanation: "Geo is dropped on death and must be recovered from your Shade — like souls in Dark Souls." },
      { id: "hlk_400_03", categoryId: "vg_hollow_knight", tier: 400, prompt: "What is the Grimm Troupe, and what does the player do when they arrive in Hallownest?", answer: "A traveling circus of nightmare creatures; the player participates in a ritual involving collecting flames and fighting Grimm/Nightmare King Grimm", acceptableAnswers: ["Traveling nightmare circus", "Nightmare ritual circus DLC", "Flame-collecting ritual with Grimm"], explanation: "The Grimm Troupe DLC adds one of the game's hardest boss fights and a mysterious ritual." },
      { id: "hlk_600_01", categoryId: "vg_hollow_knight", tier: 600, prompt: "What is the 'Pantheon of Hallownest' and why is it considered one of the hardest challenges in any game?", answer: "A boss rush of every boss in the game played back-to-back with limited healing, culminating in Absolute Radiance — widely considered one of gaming's hardest challenges", acceptableAnswers: ["All-boss rush ending with Absolute Radiance", "Boss rush gauntlet ending in Absolute Radiance", "Every boss back to back with Absolute Radiance"], explanation: "The Pantheon of Hallownest requires defeating ~40+ bosses consecutively with no saves." },
      { id: "hlk_600_02", categoryId: "vg_hollow_knight", tier: 600, prompt: "What is the true nature of the Knight (the player character) and its relationship to the Hollow Knight?", answer: "The Knight is one of many Void-born vessels created by the Pale King to contain the Radiance; the Hollow Knight was the chosen vessel but was imperfect, and the player character is a sibling/failed vessel", acceptableAnswers: ["Void vessel sibling of the Hollow Knight", "Failed vessel of the Pale King", "Sibling vessel born from Void"], explanation: "The lore reveals the Knight is one of thousands of discarded vessels, all children of the Pale King." },
      { id: "hlk_600_03", categoryId: "vg_hollow_knight", tier: 600, prompt: "What is the significance of 'The Abyss' area and what does the player discover there about their own origin?", answer: "The Abyss is where the Pale King cast thousands of failed Void vessels; the Knight was one of these discarded children who somehow escaped", acceptableAnswers: ["Birthplace of discarded vessels", "Where failed vessels were thrown away", "Pale King's vessel dumping ground"], explanation: "The sea of masks in The Abyss represents all the Knight's dead siblings — a harrowing revelation." },
    ],
  },
  {
    id: "mv_scifi_classics",
    group: "movies",
    name: "Sci-Fi Cinema Classics",
    culture: "universal",
    description: "Blade runners, alien encounters, and visions of tomorrow.",
    imageUrl: "",
    questions: [
      { id: "sfi_200_01", categoryId: "mv_scifi_classics", tier: 200, prompt: "What 1982 Ridley Scott film asks what it means to be human through the story of artificial 'replicants'?", answer: "Blade Runner", explanation: "Harrison Ford hunts rogue replicants in a rain-soaked cyberpunk Los Angeles." },
      { id: "sfi_200_02", categoryId: "mv_scifi_classics", tier: 200, prompt: "In 'Alien,' what is the tagline that became one of cinema's most famous marketing lines?", answer: "In space, no one can hear you scream", explanation: "The 1979 tagline perfectly captured the film's horror-in-space premise." },
      { id: "sfi_200_03", categoryId: "mv_scifi_classics", tier: 200, prompt: "What 1999 film features a simulated reality called 'the Matrix' and a choice between a red and blue pill?", answer: "The Matrix", explanation: "The Wachowskis' film redefined action cinema and became a cultural touchstone." },
      { id: "sfi_400_01", categoryId: "mv_scifi_classics", tier: 400, prompt: "In Blade Runner, what is Roy Batty's famous 'Tears in Rain' monologue about?", answer: "His memories and experiences dying with him — 'All those moments will be lost in time, like tears in rain'", acceptableAnswers: ["Memories lost like tears in rain", "His dying experiences being lost", "Tears in rain speech about mortality"], explanation: "Rutger Hauer partially improvised one of cinema's greatest monologues about mortality." },
      { id: "sfi_400_02", categoryId: "mv_scifi_classics", tier: 400, prompt: "What is the 'xenomorph' lifecycle in the Alien franchise, from face-hugger to adult?", answer: "Egg → Face-hugger → Chest-burster → Adult xenomorph", acceptableAnswers: ["Egg, facehugger, chestburster, adult", "Egg face-hugger chest-burster xenomorph"], explanation: "H.R. Giger's creature design and its horrifying lifecycle became iconic sci-fi horror." },
      { id: "sfi_400_03", categoryId: "mv_scifi_classics", tier: 400, prompt: "What scientific concept is central to Christopher Nolan's 'Interstellar,' causing time to move differently near a black hole?", answer: "Gravitational time dilation", acceptableAnswers: ["Time dilation", "Gravitational time dilation", "Relativity / time dilation near black hole"], explanation: "Time passes slower near massive objects — one hour on Miller's planet equals seven years on the ship." },
      { id: "sfi_600_01", categoryId: "mv_scifi_classics", tier: 600, prompt: "In the original 'Alien,' what was the secret directive that the android Ash was following, and what corporation issued it?", answer: "Weyland-Yutani's Special Order 937: bring back the alien organism, crew expendable", acceptableAnswers: ["Special Order 937", "Bring back organism crew expendable", "Weyland-Yutani order to retrieve alien"], explanation: "The revelation that the company considered the crew disposable added a corporate horror layer." },
      { id: "sfi_600_02", categoryId: "mv_scifi_classics", tier: 600, prompt: "What controversial change did Ridley Scott make in the Director's Cut of Blade Runner regarding Deckard's identity?", answer: "Added a unicorn dream sequence suggesting Deckard himself is a replicant, since Gaff's origami unicorn implies knowledge of implanted memories", acceptableAnswers: ["Unicorn dream suggesting Deckard is a replicant", "Deckard is a replicant hint", "Unicorn dream/origami replicant theory"], explanation: "Whether Deckard is human or replicant remains one of cinema's great debates." },
      { id: "sfi_600_03", categoryId: "mv_scifi_classics", tier: 600, prompt: "What physicist served as scientific consultant and executive producer on 'Interstellar,' and what visual breakthrough did the film achieve?", answer: "Kip Thorne — the film's black hole visualization was so scientifically accurate it led to a published physics paper", acceptableAnswers: ["Kip Thorne, published physics paper from VFX", "Kip Thorne, scientifically accurate black hole", "Thorne's black hole led to real research"], explanation: "The Gargantua black hole was rendered using Thorne's equations, producing genuinely new scientific insights." },
    ],
  },
  {
    id: "his_roman_empire",
    group: "history",
    name: "Roman Empire",
    culture: "universal",
    description: "From republic to empire — the civilization that shaped the Western world.",
    imageUrl: "",
    questions: [
      { id: "rom_200_01", categoryId: "his_roman_empire", tier: 200, prompt: "What famous structure in Rome was used for gladiatorial combat and public spectacles?", answer: "The Colosseum", acceptableAnswers: ["Colosseum", "The Coliseum", "Flavian Amphitheatre"], explanation: "The Colosseum could hold up to 80,000 spectators." },
      { id: "rom_200_02", categoryId: "his_roman_empire", tier: 200, prompt: "Who was the Roman dictator assassinated on the Ides of March, 44 BC?", answer: "Julius Caesar", acceptableAnswers: ["Caesar", "Julius Caesar"], explanation: "Caesar's assassination by senators including Brutus changed the course of Roman history." },
      { id: "rom_200_03", categoryId: "his_roman_empire", tier: 200, prompt: "What language did the Romans speak that became the basis for French, Spanish, Italian, and other languages?", answer: "Latin", explanation: "Latin evolved into the Romance languages and remained the language of learning for centuries." },
      { id: "rom_400_01", categoryId: "his_roman_empire", tier: 400, prompt: "What engineering achievement allowed Romans to transport water over long distances to their cities?", answer: "Aqueducts", acceptableAnswers: ["Aqueducts", "Roman aqueducts"], explanation: "Rome's aqueduct system transported water across hundreds of miles using gravity alone." },
      { id: "rom_400_02", categoryId: "his_roman_empire", tier: 400, prompt: "What was the 'Pax Romana,' and approximately how long did it last?", answer: "A roughly 200-year period of relative peace and stability across the Roman Empire (27 BC – 180 AD)", acceptableAnswers: ["200 years of peace", "Roman Peace 27 BC to 180 AD", "Two centuries of stability"], explanation: "The Pax Romana enabled trade, cultural exchange, and infrastructure development across the empire." },
      { id: "rom_400_03", categoryId: "his_roman_empire", tier: 400, prompt: "What military formation did Roman legions use, where soldiers interlocked shields above and around them to form a protective shell?", answer: "The testudo (tortoise formation)", acceptableAnswers: ["Testudo", "Tortoise formation", "Testudo formation"], explanation: "The testudo was nearly impervious to arrows and thrown weapons." },
      { id: "rom_600_01", categoryId: "his_roman_empire", tier: 600, prompt: "What was the Crisis of the Third Century, and how did it nearly destroy the Roman Empire?", answer: "A 50-year period (235-284 AD) of military anarchy, civil wars, plague, and economic collapse where the empire fragmented into three competing states", acceptableAnswers: ["50 years of civil war and fragmentation", "Military anarchy 235-284 AD", "Empire split into three states during civil wars"], explanation: "The empire nearly collapsed before Diocletian's reforms restored stability." },
      { id: "rom_600_02", categoryId: "his_roman_empire", tier: 600, prompt: "What was 'decimation' in the Roman military, and how was it carried out?", answer: "A punishment where one in every ten soldiers in a unit was beaten to death by the other nine — selected by drawing lots", acceptableAnswers: ["Kill 1 in 10 soldiers as punishment", "Killing every tenth soldier by lot", "One in ten beaten to death by comrades"], explanation: "Decimation was the ultimate disciplinary measure, used when units showed cowardice or mutiny." },
      { id: "rom_600_03", categoryId: "his_roman_empire", tier: 600, prompt: "What was the significance of the Battle of Adrianople in 378 AD, and why do historians consider it a turning point?", answer: "The Gothic cavalry destroyed a Roman army and killed Emperor Valens — it demonstrated that heavy cavalry could defeat Roman infantry, foreshadowing the empire's decline", acceptableAnswers: ["Goths defeated Rome, Emperor Valens killed", "Gothic victory showing Rome's vulnerability", "Cavalry defeated Roman legions, Valens died"], explanation: "Adrianople is often cited as the beginning of the end of Roman military supremacy." },
    ],
  },
  {
    id: "sci_dinosaurs",
    group: "science",
    name: "Dinosaurs & Paleontology",
    culture: "universal",
    description: "Terrible lizards — 165 million years of prehistoric dominance.",
    imageUrl: "",
    questions: [
      { id: "din_200_01", categoryId: "sci_dinosaurs", tier: 200, prompt: "What massive asteroid impact is widely believed to have caused the extinction of non-avian dinosaurs 66 million years ago?", answer: "The Chicxulub impactor", acceptableAnswers: ["Chicxulub", "Chicxulub asteroid", "The asteroid that hit Mexico"], explanation: "The Chicxulub crater in Mexico's Yucatán Peninsula marks the impact site." },
      { id: "din_200_02", categoryId: "sci_dinosaurs", tier: 200, prompt: "What group of modern animals are the direct descendants of dinosaurs?", answer: "Birds", acceptableAnswers: ["Birds", "Avian dinosaurs"], explanation: "Birds are literally living dinosaurs — they evolved from small theropod dinosaurs." },
      { id: "din_200_03", categoryId: "sci_dinosaurs", tier: 200, prompt: "What is the name of the largest known predatory dinosaur, famous for its tiny arms and massive jaws?", answer: "Tyrannosaurus rex", acceptableAnswers: ["T. rex", "T-rex", "Tyrannosaurus"], explanation: "T. rex had a bite force estimated at over 12,000 pounds — the strongest of any land animal ever." },
      { id: "din_400_01", categoryId: "sci_dinosaurs", tier: 400, prompt: "What major discovery proved that many dinosaurs, including velociraptors, had feathers?", answer: "Fossils from China (particularly Liaoning Province) preserved feather impressions on dinosaur specimens", acceptableAnswers: ["Chinese feathered dinosaur fossils", "Liaoning fossils with feathers", "Sinosauropteryx and other feathered fossils"], explanation: "Discoveries in the 1990s-2000s revolutionized our understanding of dinosaur appearance." },
      { id: "din_400_02", categoryId: "sci_dinosaurs", tier: 400, prompt: "What is the difference between the Jurassic and Cretaceous periods, and in which period did T. rex actually live?", answer: "The Cretaceous came after the Jurassic; T. rex lived in the Late Cretaceous, not the Jurassic — it's closer in time to us than to Stegosaurus", acceptableAnswers: ["Cretaceous, not Jurassic", "T. rex lived in Cretaceous", "Late Cretaceous period"], explanation: "T. rex lived 68-66 million years ago; Stegosaurus lived 155 million years ago — a 90-million-year gap." },
      { id: "din_400_03", categoryId: "sci_dinosaurs", tier: 400, prompt: "What adaptation allowed sauropods like Brachiosaurus and Argentinosaurus to grow to such enormous sizes?", answer: "An avian-like respiratory system with air sacs that lightened their bones and improved oxygen intake, combined with not chewing their food", acceptableAnswers: ["Air sac respiratory system", "Hollow bones and air sacs", "Bird-like breathing with air sacs"], explanation: "Their pneumatized bones and efficient breathing system allowed growth to over 100 feet long." },
      { id: "din_600_01", categoryId: "sci_dinosaurs", tier: 600, prompt: "What is the 'Bone Wars' in paleontology, and which two rival scientists were involved?", answer: "A fierce rivalry between Othniel Charles Marsh and Edward Drinker Cope in the late 1800s — they sabotaged each other's digs and raced to name the most species", acceptableAnswers: ["Marsh vs Cope rivalry", "Cope and Marsh fossil war", "Othniel Marsh and Edward Cope"], explanation: "Their destructive rivalry actually accelerated paleontology, with over 140 new species discovered." },
      { id: "din_600_02", categoryId: "sci_dinosaurs", tier: 600, prompt: "What is the significance of the Burgess Shale, and why did Stephen Jay Gould argue it changed our understanding of evolution?", answer: "It preserved bizarre Cambrian creatures showing that early life was far more diverse and experimental than modern life; Gould argued evolution isn't progressive but contingent", acceptableAnswers: ["Cambrian fossils showing early life diversity", "Weird Cambrian creatures, evolution is contingent", "Cambrian explosion diversity fossils"], explanation: "The Burgess Shale's weird creatures (like Anomalocaris and Hallucigenia) challenged the idea of evolution as a ladder." },
      { id: "din_600_03", categoryId: "sci_dinosaurs", tier: 600, prompt: "What did the discovery of soft tissue in a T. rex femur by Mary Schweitzer in 2005 challenge about fossilization?", answer: "She found preserved blood vessels, cells, and proteins inside a 68-million-year-old bone — challenging the assumption that all organic material degrades within thousands of years", acceptableAnswers: ["Preserved soft tissue in 68 million year old bone", "Blood vessels found in T. rex fossil", "Organic tissue surviving millions of years"], explanation: "Schweitzer's discovery was initially met with extreme skepticism but has been repeatedly confirmed." },
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

    print(f"SUCCESS: Wave 69 categories inserted.")
    print(f"File size: {len(new_content)} characters")

if __name__ == "__main__":
    main()
