# Renegade — Architecture

## What It Is

Two-team trivia game for iOS/Android. Tagline: *"Two teams. Six categories. No mercy."*

Each session: 2 teams pick 3 categories each + 3 one-use aids. Teams alternate answering questions off a 6×3 board (200/400/600 points). Scores go negative. First team to clear their tiles (or whoever leads when all tiles are done) wins. Game results sync to Supabase.

---

## System Topology

```
┌──────────────────────────────────────┐
│           Expo React Native App       │
│         (artifacts/renegade/)         │
│                                       │
│  ┌─────────────┐  ┌───────────────┐  │
│  │  AsyncStorage│  │ Supabase SDK  │  │
│  │  (offline)  │  │  (remote)     │  │
│  └──────┬──────┘  └──────┬────────┘  │
└─────────┼────────────────┼───────────┘
          │                │
    local device     ┌─────▼──────────────┐
                     │   Supabase (cloud)  │
                     │  - Auth (anon JWT)  │
                     │  - games table      │
                     │  - seen_questions   │
                     └────────────────────┘

┌──────────────────────────────────────┐
│       Express API Server              │
│     (artifacts/api-server/)           │
│     STATUS: scaffolding only          │
│     Not connected to app yet          │
└──────────────────────────────────────┘
```

The app is **offline-first**. AsyncStorage is the source of truth for active game state. Supabase is append-only remote storage for completed games and dedup tracking.

---

## Monorepo Structure

```
Data-Model-Home/               ← pnpm workspace root
  artifacts/
    renegade/                  ← THE APP (work here 95% of the time)
    api-server/                ← Express backend (scaffolding, not live)
    mockup-sandbox/            ← UI sandbox, not production
  lib/
    api-client-react/          ← TanStack Query client (generated)
    api-spec/                  ← OpenAPI spec
    api-zod/                   ← Zod validators
    db/                        ← Drizzle ORM schema (empty, not used yet)
  supabase/
    migrations/                ← SQL migration files (apply via dashboard)
  docs/                        ← This folder
```

---

## App Internals (`artifacts/renegade/`)

### State layers

| Layer | Tool | What it holds |
|---|---|---|
| Session state | React Context (`RenegadeContext`) | Team names, selected categories, chosen aids — wiped on new game |
| Board state | AsyncStorage (`renegade:board_session`) | Tile statuses, scores, current turn, used aids — survives app restart |
| Settings | AsyncStorage (`renegade:timer_seconds`) | Timer duration (30/45/60s) |
| Game history | Supabase `games` table | Completed game records |
| Question dedup | Supabase `seen_questions` table | Question IDs seen this device session |

### Screen flow

```
Home (tabs/index)
  ├─ New Game
  │    → create-game/categories  (team 1 + team 2 pick categories)
  │    → create-game/teams       (name teams, pick 3 aids each)
  │    → board                   (6×3 tile grid)
  │    → question                (timer + answer reveal + aid usage)
  │    ↺ (back to board after each question)
  │    → results                 (winner screen, writes to Supabase)
  │
  └─ Continue Game               (resumes board if session exists)
```

### Content

All questions (~2,500+) live as static TypeScript in `constants/categories.ts`. There is no CMS. Adding a question = editing that file. See `content/content_quality_system.md` for tier rules.

### Authentication

Anonymous auth only. On first launch, `ensureAnonymousSession()` calls `supabase.auth.signInAnonymously()`. The user gets a persistent UUID tied to their device via `AsyncStorage`. All Supabase writes are scoped to this UUID via Row Level Security. No login screen, no accounts — intentional for a party game.

---

## Key Design Decisions

**Why offline-first?** Party games are played in living rooms, basements, with spotty Wi-Fi. The game must not break if Supabase is slow or down. Supabase writes are fire-and-forget; failures are logged but never shown to the user.

**Why anonymous auth instead of accounts?** Accounts add friction for a pickup game. The anonymous session persists across app restarts via AsyncStorage. Users who want persistence across devices can be offered sign-in later (not in v1).

**Why static questions in TypeScript instead of a database?** Simplicity for v1. No CMS needed, no fetch latency, works offline, type-safe. When the content library grows large enough to warrant dynamic loading or premium content packs, it moves to Supabase.

**Why score floor at 0?** Math.max(0, score - penalty) — prevents negative scores from punishing casual players too harshly. This is a party game, not a penaltycompetition.

**Why the API server isn't used yet?** Future home for: server-side game validation, async multiplayer, premium content delivery. For v1, the app talks directly to Supabase.
