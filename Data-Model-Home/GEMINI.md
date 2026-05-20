# Renegade — Gemini Guide

## For Gemini
- Read this file first on every session
- Check git status before making any changes
- Always confirm the current branch before editing files
- Never edit more than what was asked

---

## Project Summary

**Renegade** is a two-team trivia game built with Expo React Native and TypeScript.
Tagline: *"Two teams. Six categories. No mercy."*

Each team picks 3 categories and 3 one-use Aids. Teams alternate picking tiles off a 6×3 board, answering questions under a timer. Most points wins.

---

## Repo Structure

```
Data-Model-Home/                  ← monorepo root (pnpm workspaces)
  artifacts/
    renegade/                     ← MAIN APP — work here 95% of the time
    api-server/                   ← Express backend (scaffolding only)
    mockup-sandbox/               ← UI sandbox, not production
  lib/
    api-client-react/             ← Generated TanStack Query client
    api-spec/                     ← OpenAPI spec
    api-zod/                      ← Zod validators
    db/                           ← Drizzle DB schema
```

All app work happens inside `artifacts/renegade/`.

---

## Key Files

| File (relative to `artifacts/renegade/`) | Purpose |
|---|---|
| `types/game.ts` | All core TypeScript types: `Question`, `Category`, `AidId`, `GameConfig` |
| `context/RenegadeContext.tsx` | `GameConfig` state (team names, categories, aids). Use `useRenegade()` hook. Persisted to `renegade:current_game`. |
| `store/gameSession.ts` | Board session: tile statuses, scores, current turn, used aids. Functions: `loadBoardSession`, `saveBoardSession`, `clearBoardSession`, `setPendingResult`, `consumePendingResult`. |
| `store/games.ts` | `recordGame()` — inserts completed game to Supabase `games` table |
| `store/seenQuestions.ts` | Tracks shown question IDs to prevent repeats across sessions |
| `store/settings.ts` | Timer seconds (default 30). Loaded once at app start. |
| `constants/categories.ts` | All question content as a static `CATEGORIES` array |
| `constants/colors.ts` | Color token definitions |
| `lib/supabase.ts` | Supabase client initialization |

---

## Game Rules

1. **Setup:** Each team picks 3 topic categories — and also picks the *opponent's* 3 categories.
2. **Aids:** Each team picks 3 Aids (one-use power-ups) from 7 options: `skip`, `split`, `steal`, `phone`, `double`, `veto`, `insider`.
3. **Board:** 6 categories × 3 tiers (200/400/600) × 2 questions per tier = 36 tiles. Teams alternate turns.
4. **Question:** 30-second countdown (configurable). Active team can use an Aid before or after answer reveal.
5. **Scoring:** Correct = +tier points. Wrong = −tier points. Steal lets the opponent attempt the question.
6. **End:** All tiles cleared → Results screen → winner recorded to Supabase.

---

## Screen Flow

```
Home (tabs/index)
  ├─ New Game → create-game/categories   (each team picks 3 categories)
  │                    ↓
  │             create-game/teams        (name teams, pick 3 aids each)
  │                    ↓
  │             board                    (6×3 tile grid, teams alternate)
  │                    ↓
  │             question                 (timer + answer reveal + aids)
  │                    ↓ (back to board after each question)
  │             results                  (winner screen, records to Supabase)
  │
  └─ Continue Game → resumes at correct step based on GameConfig state
```

Route params for `question.tsx`: `categoryId`, `tier`, `slotIndex`, `team` (TeamKey)
Route params for `results.tsx`: `team1Score`, `team2Score`

---

## State Persistence

```
AsyncStorage (local, instant, offline)
  renegade:current_game     → GameConfig (team names, categories, aids chosen)
  renegade:board_session    → BoardSession (tile statuses, scores, turn, used aids)
  renegade:timer_seconds    → number
  renegade:intro_seen       → "1" (first-launch modal flag)

Supabase (remote, eventual consistency)
  games                     → completed game records (team names, scores, winner, categories)
  seen_questions            → question IDs seen by this player (dedup across sessions)
```

---

## Coding Rules

**Branch discipline:**
- NEVER commit directly to `main` or `develop`
- Always create a feature branch first: `git checkout -b feature/name`
- Branch off `develop`, not `main`
- Open a PR before merging

**Commit format:** `type(scope): description`

Types: `feat`, `fix`, `docs`, `refactor`, `chore`

Scopes: `scoring`, `timer`, `aids`, `content`, `context`, `store`, `ui`, `db`

One logical change per commit.

---

## Common Tasks

- **Add a question:** Append to the correct `Category.questions[]` in `constants/categories.ts`. Follow tier rules in `content/content_quality_system.md`.
- **Add a category:** Add a `Category` object to `constants/categories.ts` with the correct `culture` tag (`circassian | jordanian | arabic | american | islamic | universal`).
- **Add an Aid:** Add to `AidId` union in `types/game.ts`, handle in `question.tsx` Aid logic, update `AID_LABEL` map.
- **Change timer default:** Edit `store/settings.ts` initial value.

---

## Tech Stack

| Layer | Tool |
|---|---|
| App framework | Expo SDK ~54, expo-router ~6 |
| Runtime | React Native 0.81.5 |
| Language | TypeScript (strict mode throughout) |
| State | React Context + module-level stores (no Redux/Zustand) |
| Data fetching | TanStack Query |
| Remote backend | Supabase (auth, game history, seen questions) |
| Local persistence | AsyncStorage |
| Package manager | pnpm workspaces (monorepo) |
| UI | Inter font, custom color tokens in `constants/colors.ts` |
