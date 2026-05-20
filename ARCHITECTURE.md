# Architecture — Renegade

This document describes the high-level design of the Renegade app: how data flows, how state is managed, and why we made certain choices.

---

## Data Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      USER INTERACTION                        │
│                    (Screens, buttons, etc)                   │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │   React Components      │
        │  (app/, components/)    │
        └────────────┬────────────┘
                     │
     ┌───────────────┼───────────────┐
     │               │               │
     ▼               ▼               ▼
┌─────────┐   ┌──────────┐   ┌────────────┐
│ Context │   │  Stores  │   │ AsyncStore │
│ (RN)    │   │(gameSession)│(persistence)
└────┬────┘   └────┬─────┘   └─────┬──────┘
     │             │               │
     │         ┌───▼────────────────▼────┐
     │         │    Local State Layer     │
     │         │   (AsyncStorage cache)   │
     │         └───┬────────────────────┬─┘
     │             │                    │
     └─────────────┼────────────────────┘
                   │
          ┌────────▼────────┐
          │  Supabase API   │
          │ (Remote source) │
          └─────────────────┘
```

### Flow Explanation

1. **User interacts** with screen (taps a button, scrolls, etc.)
2. **Component state updates** via React hooks (Context, local useState)
3. **Stores** (`store/gameSession.ts`, etc.) are notified of changes
4. **AsyncStorage** persists to device (instant, offline-capable)
5. **Supabase** syncs for cloud backup (async, eventual consistency)
6. **Component re-renders** with new state

---

## State Management Strategy

### Layer 1: React Context (`context/RenegadeContext.tsx`)

**What it holds:** `GameConfig` — setup-phase state that rarely changes per session.

```ts
interface GameConfig {
  team1Name: string
  team2Name: string
  team1Categories: Category[]
  team2Categories: Category[]
  team1Aids: AidId[]
  team2Aids: AidId[]
}
```

**Why Context?**
- Setup state needs to be accessed from multiple screens (categories, teams, board)
- It changes infrequently (only during game setup)
- Context avoids prop drilling

**Usage:**
```ts
const { gameConfig, setGameConfig } = useRenegade();
```

**Persistence:** AsyncStorage key `renegade:current_game`

---

### Layer 2: Module-Level Stores (`store/*.ts`)

**Philosophy:** Avoid Redux/Zustand overhead. Use plain TypeScript functions + AsyncStorage.

#### `gameSession.ts`
Manages the **board state** during gameplay.

```ts
interface BoardSession {
  tileStatuses: Record<string, TileStatus>  // open|answered|locked
  team1Score: number
  team2Score: number
  currentTurn: TeamKey
  usedAids: Record<TeamKey, AidId[]>
  pendingResult?: QuestionResult
}
```

**Key functions:**
- `loadBoardSession()` — Load from AsyncStorage
- `saveBoardSession(session)` — Persist to AsyncStorage
- `clearBoardSession()` — Wipe (e.g., on game end)
- `setPendingResult(result)` — Store answer result before returning to board
- `consumePendingResult()` — Retrieve and clear

**Why this pattern?**
- Simple: functions are easier to reason about than class instances
- Testable: no magic, just functions and data
- Persistent: automatic AsyncStorage sync

#### `games.ts`
Inserts completed games to Supabase for history/leaderboard.

```ts
recordGame({
  team1Name, team2Name,
  team1Score, team2Score,
  winner: TeamKey,
  categories: Category[],
})
```

#### `seenQuestions.ts`
Tracks which questions have been shown (deduplicates across sessions).

```ts
addSeenQuestion(questionId: string)
hasSeen(questionId: string): Promise<boolean>
```

Persists to both AsyncStorage (cache) and Supabase (source of truth).

#### `settings.ts`
App-wide configuration.

```ts
timerSeconds: number     // default 30, configurable
```

---

### Layer 3: AsyncStorage (Local Persistence)

Keys used:
```
renegade:current_game        → JSON-stringified GameConfig
renegade:board_session       → JSON-stringified BoardSession
renegade:timer_seconds       → string (number)
renegade:intro_seen          → "1" (first-launch modal flag)
```

**Why AsyncStorage?**
- Instant reads/writes (no network latency)
- Works offline
- Syncs to Supabase asynchronously (eventual consistency)

---

### Layer 4: Supabase (Remote Persistence & Sync)

Three tables:

#### `games`
Completed game records for leaderboard/history.

```sql
CREATE TABLE games (
  id UUID PRIMARY KEY,
  team1_name TEXT,
  team2_name TEXT,
  team1_score INT,
  team2_score INT,
  winner TEXT,
  categories JSONB,
  created_at TIMESTAMP DEFAULT now()
);
```

#### `seen_questions`
Which questions have been shown (prevents repeats).

```sql
CREATE TABLE seen_questions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  question_id TEXT,
  seen_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, question_id)
);
```

#### Other (TBD)
Auth, user profiles, etc.

**Why Supabase?**
- Serverless (no backend to maintain)
- Real-time subscriptions (future: multiplayer)
- Built-in auth
- PostgreSQL (powerful queries)

---

## Component Hierarchy

```
app/
├── (tabs)/
│   └── index.tsx              ← Home screen (New Game / Continue Game)
├── create-game/
│   ├── categories.tsx         ← Step 1: Pick categories (6 total)
│   └── teams.tsx              ← Step 2: Name teams, pick aids (3 each)
├── board.tsx                  ← Main game board (6×3 grid)
├── question.tsx               ← Single question + timer + aids
└── results.tsx                ← Winner screen, game recorded

components/
├── Board.tsx                  ← 6×3 grid of tiles
├── Tile.tsx                   ← Single tile (clickable)
├── Timer.tsx                  ← Countdown with pause
├── AidButton.tsx              ← One aid button (shows used/available)
├── CategoryBadge.tsx          ← Visual category label
├── Button.tsx                 ← Reusable button
├── Modal.tsx                  ← Overlay for dialogs
└── ... (other reusable components)
```

---

## Screen Navigation & Route Params

### Home Screen (`(tabs)/index.tsx`)
Entry point. Two buttons:
- **New Game** → navigate to `create-game/categories`
- **Continue Game** → check AsyncStorage for `renegade:current_game`, resume or go to home

### Create Game / Categories (`create-game/categories.tsx`)
Team 1 picks 3 categories. Team 2 picks Team 1's 3 categories (role reversal).

**Next:** navigate to `create-game/teams`

### Create Game / Teams (`create-game/teams.tsx`)
Name both teams. Each team picks 3 Aids from available list.

**Next:** navigate to `board` with params: (none, GameConfig in Context)

### Board (`board.tsx`)
6×3 grid of tiles. Teams alternate tapping tiles.

**On tile tap:** navigate to `question` with params:
```ts
{ categoryId, tier, slotIndex, team: TeamKey }
```

### Question (`question.tsx`)
Display question, 30-second timer, answer reveal, aid options.

Route params: `{ categoryId, tier, slotIndex, team }`

**On answer submit:**
- Set `pendingResult` in store
- Navigate back to `board`
- Board checks `pendingResult`, updates scores, clears it

### Results (`results.tsx`)
Show winner, record game to Supabase.

Route params: `{ team1Score, team2Score }`

**On Continue:** Clear board session, navigate to home.

---

## Data & Content System

### Static Content: `constants/categories.ts`

All questions are hard-coded in TypeScript:

```ts
export const CATEGORIES: Category[] = [
  {
    id: "anime",
    name: "Anime",
    culture: "universal",
    questions: [
      {
        id: "anime_001",
        tier: 200,
        prompt: "What is the name of the hero in Naruto?",
        answer: "Naruto Uzumaki",
        acceptableAnswers: ["Naruto", "Naruto Uzumaki", "Uzumaki"]
      },
      // ... more questions
    ]
  },
  // ... more categories
];
```

**Why static?**
- Simple (no network calls needed in dev)
- Works offline
- Fast queries
- Easy to version control

**Tier Philosophy:**
- **200** = Casual fan (famous scenes, broad exposure)
- **400** = Real fan (named mechanics, mid-story details)
- **600** = Passionate fan (lore, speedrunning, developer history)

### Draft Content: `content/*.draft.ts`

Separate packs (anime, movies, games) as drafts. Reviewed and merged into `constants/categories.ts` when ready.

---

## Design Decisions & Tradeoffs

| Decision | Choice | Why |
|----------|--------|-----|
| **State Management** | Context + module stores | Lightweight, no Redux boilerplate, sufficient for app scope |
| **Content Storage** | Static TypeScript arrays | Fast, offline, works without backend |
| **Persistence** | AsyncStorage + Supabase | Local instant access, remote backup, eventual consistency |
| **Backend** | Supabase (serverless) | Zero ops, built-in auth, no custom API to maintain |
| **UI Framework** | React Native + Expo | Cross-platform, hot reload, large ecosystem |
| **Routing** | expo-router | File-based routing, nested routes, cleaner than RN Navigation |

---

## Future Extensions

### Multiplayer (Real-time)
- Supabase realtime subscriptions on board state
- WebSocket sync between players
- Lock tiles to prevent race conditions

### Custom Questions
- User-generated content form
- Question approval workflow
- Cloud storage (Supabase `custom_questions` table)

### Leaderboard & Stats
- `games` table queries
- Aggregate stats (win rate, avg score, favorite categories)
- Seasonal rankings

### Mobile Optimizations
- Offline-first question caching
- Background sync (Supabase)
- Native notifications (Expo Notifications)

---

## Testing Strategy (Future)

- **Unit tests:** `store/*.ts` functions (Jest)
- **Integration tests:** Context + stores (React Testing Library)
- **E2E tests:** Full game flow (Detox or Playwright)
- **Content tests:** Question schema validation (Zod)

---

## Performance Notes

- **Bundle size:** Monitor with `expo-bundle-analyzer`
- **AsyncStorage:** Limit keys to ~1 MB per key (current design is well under)
- **Image caching:** Use Expo's image caching (automatic)
- **Re-renders:** Avoid large Context updates; split into smaller contexts if needed

---

## Common Patterns

### Reading Persisted State on App Start

```ts
// In app root or relevant screen
useEffect(() => {
  const load = async () => {
    const session = await loadBoardSession();
    if (session) {
      setGameState(session);
    }
  };
  load();
}, []);
```

### Syncing State to AsyncStorage After Update

```ts
const updateScore = (team: TeamKey, points: number) => {
  const newSession = { ...session, [team + "Score"]: points };
  saveBoardSession(newSession);  // Automatic AsyncStorage write
  setGameState(newSession);
};
```

### Navigating with Params

```ts
router.push({
  pathname: "question",
  params: { categoryId: "anime", tier: 400, slotIndex: 2, team: "team1" }
});
```

### Reading Route Params

```ts
const { categoryId, tier, slotIndex, team } = useLocalSearchParams<{
  categoryId: string;
  tier: string;
  slotIndex: string;
  team: TeamKey;
}>();
```

---

## Debugging Tips

- **AsyncStorage inspection:** Expo DevTools or print to console
- **State inspection:** React DevTools (if using compatible version)
- **Network inspection:** Supabase logs, Expo Network Inspector
- **Component re-renders:** Add `console.log` at top of component

---

## Questions or Clarifications?

See `CONTRIBUTING.md` for how to propose architectural changes.
