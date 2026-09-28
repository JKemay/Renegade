import { Question } from "@/types/game";

// Draft-only internal topic packs for Sports categories.
// Covers Basketball, Football (American), and Soccer at all three tiers.
// Do not import this file into shipping category data until reviewed/playtested.

export interface SportsTopicPack {
  topicId: string;
  displayName: string;
  parentCategoryId: "sports";
  questions: Question[];
}

const SPORTS_TOPIC_PACKS_DRAFT: SportsTopicPack[] = [
  {
    topicId: "basketball",
    displayName: "Basketball",
    parentCategoryId: "sports",
    questions: [
      {
        id: "bball_200_01",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What player holds the NBA all-time scoring record with 38,387 points?",
        answer: "LeBron James",
        acceptableAnswers: ["LeBron James", "LeBron"],
        explanation: "LeBron surpassed Kareem Abdul-Jabbar's long-standing record of 38,387 points in February 2023.",
      },
      {
        id: "bball_200_02",
        categoryId: "sports",
        tier: 200,
        prompt:
          "How many championships did Michael Jordan win with the Chicago Bulls?",
        answer: "6",
        acceptableAnswers: ["6", "Six"],
        explanation: "Jordan won two three-peats: 1991-1993 and 1996-1998, earning Finals MVP in all six appearances.",
      },
      {
        id: "bball_200_03",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What NBA team plays their home games at Madison Square Garden?",
        answer: "New York Knicks",
        acceptableAnswers: ["New York Knicks", "Knicks", "NY Knicks"],
        explanation: "Madison Square Garden, known as 'The Mecca of Basketball', has been the Knicks' home since 1968.",
      },
      {
        id: "bball_400_01",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What team drafted Kobe Bryant in 1996 before trading him to the Lakers?",
        answer: "Charlotte Hornets",
        acceptableAnswers: ["Charlotte Hornets", "Hornets"],
        explanation: "The Hornets selected Bryant 13th overall and traded him to the Lakers for Vlade Divac.",
      },
      {
        id: "bball_400_02",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What player, nicknamed 'The Big Fundamental', spent his entire 19-year career with the San Antonio Spurs?",
        answer: "Tim Duncan",
        acceptableAnswers: ["Tim Duncan", "Duncan"],
        explanation: "Duncan won 5 NBA championships and was a 15-time All-Star, widely regarded as the greatest power forward ever.",
      },
      {
        id: "bball_400_03",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What defensive rule, eliminated in 2001-02, prohibited defenders from standing in the paint without guarding a specific player?",
        answer: "Illegal defense",
        acceptableAnswers: ["Illegal defense", "Illegal defence", "Zone defense ban"],
        explanation: "The NBA's removal of illegal defense rules opened the door for zone defense, fundamentally changing modern NBA strategy.",
      },
      {
        id: "bball_600_01",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What player set the single-game scoring record with 100 points on March 2, 1962?",
        answer: "Wilt Chamberlain",
        acceptableAnswers: ["Wilt Chamberlain", "Wilt"],
        explanation: "Chamberlain scored 100 points for the Philadelphia Warriors against the New York Knicks in Hershey, Pennsylvania.",
      },
      {
        id: "bball_600_02",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What 1992 USA Olympic basketball team, featuring Jordan, Magic, and Bird, was the first to use active NBA players?",
        answer: "The Dream Team",
        acceptableAnswers: ["The Dream Team", "Dream Team"],
        explanation: "The Dream Team won the gold medal in Barcelona, defeating opponents by an average of 43.8 points per game.",
      },
      {
        id: "bball_600_03",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What coach holds the record for most NBA championships won, with 11 titles as head coach of the Boston Celtics?",
        answer: "Red Auerbach",
        acceptableAnswers: ["Red Auerbach", "Auerbach", "Arnold Auerbach"],
        explanation: "Auerbach coached the Celtics from 1950-1966, winning 9 championships in his last 10 seasons including 8 consecutive titles.",
      },
    ],
  },
  {
    topicId: "football",
    displayName: "Football (NFL)",
    parentCategoryId: "sports",
    questions: [
      {
        id: "nfl_200_01",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What quarterback has won the most Super Bowls in NFL history with 7 titles?",
        answer: "Tom Brady",
        acceptableAnswers: ["Tom Brady", "Brady"],
        explanation: "Brady won 6 Super Bowls with the New England Patriots and 1 with the Tampa Bay Buccaneers.",
      },
      {
        id: "nfl_200_02",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What is the name of the trophy awarded to the Super Bowl winner?",
        answer: "Vince Lombardi Trophy",
        acceptableAnswers: ["Vince Lombardi Trophy", "Lombardi Trophy", "Lombardi"],
        explanation: "Named after legendary Green Bay Packers coach Vince Lombardi, who won the first two Super Bowls.",
      },
      {
        id: "nfl_200_03",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What NFL team is known as 'America's Team' and plays in AT&T Stadium?",
        answer: "Dallas Cowboys",
        acceptableAnswers: ["Dallas Cowboys", "Cowboys"],
        explanation: "The Cowboys earned the nickname from a 1978 NFL Films highlight reel and are one of the most valuable sports franchises.",
      },
      {
        id: "nfl_400_01",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What running back, who played for the Detroit Lions from 1989-1998, retired at age 30 despite being close to the all-time rushing record?",
        answer: "Barry Sanders",
        acceptableAnswers: ["Barry Sanders", "Sanders"],
        explanation: "Sanders retired with 15,269 rushing yards, just 1,457 yards short of Walter Payton's then-record, shocking the football world.",
      },
      {
        id: "nfl_400_02",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What defensive formation, popularized by Buddy Ryan with the 1985 Bears, uses heavy blitzing from linebackers and defensive backs?",
        answer: "46 defense",
        acceptableAnswers: ["46 defense", "46 Defence", "The 46"],
        explanation: "Named after safety Doug Plank (#46), not the number of defenders, the 46 defense helped the '85 Bears become one of the greatest defenses ever.",
      },
      {
        id: "nfl_400_03",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What wide receiver holds the NFL single-season receiving yards record with 1,964 yards in 2012?",
        answer: "Calvin Johnson",
        acceptableAnswers: ["Calvin Johnson", "Megatron"],
        explanation: "Johnson, nicknamed 'Megatron', set the record while playing for the Detroit Lions and was inducted into the Hall of Fame in 2021.",
      },
      {
        id: "nfl_600_01",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What 1958 NFL Championship Game between the Colts and Giants is often called 'The Greatest Game Ever Played'?",
        answer: "1958 NFL Championship Game",
        acceptableAnswers: ["1958 NFL Championship Game", "1958 NFL Championship", "The Greatest Game Ever Played"],
        explanation: "The Baltimore Colts beat the New York Giants 23-17 in sudden death overtime, the first ever in an NFL title game, televised nationally.",
      },
      {
        id: "nfl_600_02",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What offensive scheme, developed by Bill Walsh with the San Francisco 49ers, emphasizes short, horizontal passing to control the ball?",
        answer: "West Coast offense",
        acceptableAnswers: ["West Coast offense", "West Coast Offense", "West Coast"],
        explanation: "Walsh's system used precise timing routes and short passes as an extension of the run game, revolutionizing offensive football.",
      },
      {
        id: "nfl_600_03",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What NFL team went 0-16 in 2008, becoming the first team to lose every game in a 16-game season?",
        answer: "Detroit Lions",
        acceptableAnswers: ["Detroit Lions", "Lions"],
        explanation: "The 2008 Lions finished 0-16 under Rod Marinelli, the worst record in NFL history at the time.",
      },
    ],
  },
  {
    topicId: "soccer",
    displayName: "Soccer (Football)",
    parentCategoryId: "sports",
    questions: [
      {
        id: "soc_200_01",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What country has won the most FIFA World Cup titles with 5 victories?",
        answer: "Brazil",
        acceptableAnswers: ["Brazil"],
        explanation: "Brazil won in 1958, 1962, 1970, 1994, and 2002, making them the most successful nation in World Cup history.",
      },
      {
        id: "soc_200_02",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What Argentine footballer won the 2022 World Cup and is widely considered one of the greatest players of all time?",
        answer: "Lionel Messi",
        acceptableAnswers: ["Lionel Messi", "Messi", "Leo Messi"],
        explanation: "Messi led Argentina to their third World Cup title in Qatar, scoring twice in the final against France.",
      },
      {
        id: "soc_200_03",
        categoryId: "sports",
        tier: 200,
        prompt:
          "What Spanish club has won the most UEFA Champions League titles?",
        answer: "Real Madrid",
        acceptableAnswers: ["Real Madrid", "Madrid"],
        explanation: "Real Madrid has won 15 Champions League titles, more than any other club in European football history.",
      },
      {
        id: "soc_400_01",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What tactical formation, popularized by Barcelona under Pep Guardiola, emphasizes possession and short passing?",
        answer: "Tiki-taka",
        acceptableAnswers: ["Tiki-taka", "Tiki taka"],
        explanation: "Tiki-taka is characterized by short passing, movement, and maintaining possession, dominating European football from 2008-2012.",
      },
      {
        id: "soc_400_02",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What goalkeeper record of 1,311 minutes without conceding a goal was set by Edwin van der Sar in the 2008-09 Premier League season?",
        answer: "Consecutive clean sheet minutes",
        acceptableAnswers: ["Consecutive clean sheet minutes", "Clean sheet record", "Minutes without conceding"],
        explanation: "Van der Sar's record of 1,311 minutes without conceding for Manchester United remains unbroken in the Premier League.",
      },
      {
        id: "soc_400_03",
        categoryId: "sports",
        tier: 400,
        prompt:
          "What rule, introduced in 1992, prevents goalkeepers from handling deliberate back-passes from teammates?",
        answer: "Back-pass rule",
        acceptableAnswers: ["Back-pass rule", "Back pass rule", "The back-pass rule"],
        explanation: "FIFA introduced the rule to discourage time-wasting and encourage more attacking football, fundamentally changing goalkeeper skills.",
      },
      {
        id: "soc_600_01",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What Brazilian striker holds the record for most goals in a single calendar year with 75 goals in 2012?",
        answer: "Lionel Messi",
        acceptableAnswers: ["Lionel Messi", "Messi"],
        explanation: "Messi scored 79 goals in 2012 across all competitions for Barcelona and Argentina, breaking Gerd Muller's 1972 record of 85.",
      },
      {
        id: "soc_600_02",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What is the name of the phenomenon where a team wins their domestic league, domestic cup, and the Champions League in the same season?",
        answer: "The Treble",
        acceptableAnswers: ["The Treble", "Treble", "Continental treble"],
        explanation: "Manchester United in 1999 was the first English club to win the Treble. Manchester City achieved it in 2023.",
      },
      {
        id: "soc_600_03",
        categoryId: "sports",
        tier: 600,
        prompt:
          "What Italian defensive strategy, translating to 'door bolt', uses a sweeper behind the defensive line?",
        answer: "Catenaccio",
        acceptableAnswers: ["Catenaccio"],
        explanation: "Catenaccio was perfected by Helenio Herrera's Inter Milan in the 1960s, emphasizing defensive solidity and counter-attacking football.",
      },
    ],
  },
];

export default SPORTS_TOPIC_PACKS_DRAFT;
