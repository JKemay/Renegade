# Renegade — Agent Orientation

**Renegade** is a two-team trivia game built as an Expo React Native app (expo-router). Tagline: *"Two teams. Six categories. No mercy."*

---

## Repo layout

```
Data-Model-Home/                  ← monorepo root (pnpm workspaces)
  artifacts/
    renegade/                     ← MAIN APP (work here 95% of the time)
    api-server/                   ← Express backend (mostly scaffolding)
    mockup-sandbox/               ← UI sandbox, not production
  lib/
    api-client-react/             ← Generated TanStack Query client
    api-spec/                     ← OpenAPI spec
    api-zod/                      ← Zod validators
    db/                           ← Drizzle DB schema
```

---

## Tech stack

| Layer | Tool |
|---|---|
| App framework | Expo SDK ~54, expo-router ~6 |
| UI | React Native 0.81.5, Inter font, custom color tokens |
| State | React Context + module-level stores (no Redux/Zustand) |
| Persistence | AsyncStorage (local game state), Supabase (game history, seen questions) |
| Package manager | pnpm workspaces |
| Language | TypeScript throughout |

---

## Game rules (important for understanding state)

1. **Setup:** Each team picks 3 topic categories. Critically, you also pick *the opponent's* 3 categories. Then each team picks 3 Aids (one-use power-ups).
2. **Board:** 6 categories × 3 tiers (200/400/600) × 2 questions per tier = 36 tiles total. Teams alternate turns picking tiles.
3. **Question:** A countdown timer runs (default 30 s, configurable). The active team can use an Aid before or after the answer is revealed.
4. **Scoring:** Correct = +tier points. Wrong = –tier points. Steal Aid lets the opponent attempt the question.
5. **End:** All tiles cleared → Results screen → winner recorded to Supabase.

---

## Core types — `artifacts/renegade/types/game.ts`

```ts
Question      // id, categoryId, tier (200|400|600), prompt, answer, acceptableAnswers[]
Category      // id, name, culture, questions[]
AidId         // "skip" | "split" | "steal" | "phone" | "double" | "veto" | "insider"
GameConfig    // team1Name, team2Name, team1Categories[], team2Categories[], team1Aids[], team2Aids[]
```

---

## Key files

| File | Purpose |
|---|---|
| `types/game.ts` | All core TypeScript types |
| `context/RenegadeContext.tsx` | `GameConfig` state — team names, categories, aids. Persisted to AsyncStorage under `renegade:current_game`. Use `useRenegade()` hook. |
| `store/gameSession.ts` | Board session — tile statuses, scores, current turn, used aids. Persisted under `renegade:board_session`. Functions: `loadBoardSession`, `saveBoardSession`, `clearBoardSession`, `setPendingResult`, `consumePendingResult`. |
| `store/games.ts` | `recordGame()` — inserts final result to Supabase `games` table. |
| `store/seenQuestions.ts` | Tracks which question IDs have been shown (prevents repeats across sessions via Supabase). |
| `store/settings.ts` | Timer seconds (default 30). Loaded once at startup. |
| `constants/categories.ts` | All question content as a static `CATEGORIES` array. |
| `constants/colors.ts` | Color token definitions. |
| `lib/supabase.ts` | Supabase client initialization. |

---

## Screen flow

```
Home (tabs/index)
  ├─ New Game → create-game/categories  (pick categories)
  │                    ↓
  │             create-game/teams       (name teams, pick aids)
  │                    ↓
  │             board                   (main game grid)
  │                    ↓
  │             question                (single question with timer + aids)
  │                    ↓ (back to board after each question)
  │             results                 (winner screen → records to Supabase)
  │
  └─ Continue Game → resumes at correct step based on GameConfig state
```

**Route params for `question.tsx`:** `categoryId`, `tier`, `slotIndex`, `team` (TeamKey)

**Route params for `results.tsx`:** `team1Score`, `team2Score`

---

## Content system

Questions live in `constants/categories.ts` as static TypeScript arrays — no remote fetch needed in dev. Draft content packs (anime, movies/TV, video games) are in `content/*.draft.ts`.

**Tier philosophy** (`content/content_quality_system.md`):
- 200 = casual fan (famous scenes, broad exposure)
- 400 = real fan (named mechanics, mid-story details)
- 600 = passionate fan (lore, speedrunning, dev history)

**Culture tags on categories:** `circassian | jordanian | arabic | american | islamic | universal`

---

## State persistence mental model

```
AsyncStorage
  renegade:current_game     → GameConfig (team names, categories, aids chosen)
  renegade:board_session    → BoardSession (tile statuses, scores, turn, used aids)
  renegade:timer_seconds    → number (settings)
  renegade:intro_seen       → "1" (first-launch modal flag)

Supabase (remote)
  games table               → completed game records (team names, scores, winner, categories)
  seen_questions table      → question IDs seen by this player (dedup across sessions)
```

---

## Common tasks

- **Add a question:** Append to the correct `Category.questions[]` in `constants/categories.ts`. Follow the tier rules in `content/content_quality_system.md`.
- **Add an Aid:** Add to `AidId` union in `types/game.ts`, handle in `question.tsx` Aid logic, update labels in `AID_LABEL`.
- **Change timer default:** Edit `store/settings.ts` initial value.
- **Add a category:** Add a `Category` object to `constants/categories.ts` with the correct `culture` tag.
