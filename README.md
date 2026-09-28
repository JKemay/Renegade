# Renegade

**Two teams. Six categories. No mercy.**

Renegade is a competitive, real-time trivia game for groups. Two teams pick categories and face off across a 6×3 Jeopardy-style board, using one-time power-ups (Aids) to gain advantages. Correct answers earn points; wrong answers deduct them. The winner is recorded to Supabase for leaderboard tracking.

---

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (install via `npm i -g pnpm`)
- Expo Go app on your phone (or Android/iOS simulator)

### Install & Run

The pnpm workspace root is `Data-Model-Home/`, not this directory — every
command below runs from there.

```bash
cd Data-Model-Home

# Install dependencies (monorepo)
pnpm install

# Start the Expo dev server. There is no `dev` script at the workspace root;
# it lives in the renegade package, so target it explicitly.
pnpm --filter @workspace/renegade dev

# In Expo Go app or simulator, scan the QR code
```

The app will hot-reload as you save changes.

> **Note:** `pnpm-workspace.yaml` overrides away every non-linux-x64 native
> binary (esbuild, rollup, lightningcss, tailwind oxide), because the project
> targets Replit. Installing on macOS or Windows will omit binaries the build
> needs. Drop those overrides if you want to build locally.

---

## Project Structure

```
Data-Model-Home/                          ← monorepo root (pnpm workspaces)
├── artifacts/
│   ├── renegade/                         ← MAIN APP (95% of work here)
│   │   ├── app/                          ← expo-router screens
│   │   │   ├── (tabs)/index.tsx          ← Home screen
│   │   │   ├── create-game/              ← New game flow
│   │   │   ├── board.tsx                 ← Main game board
│   │   │   ├── question.tsx              ← Single question + timer + aids
│   │   │   └── results.tsx               ← Winner screen
│   │   ├── components/                   ← Reusable UI components
│   │   ├── context/                      ← React Context (GameConfig state)
│   │   ├── store/                        ← Persistent stores (AsyncStorage, Supabase)
│   │   ├── hooks/                        ← Custom hooks
│   │   ├── lib/                          ← Utilities (Supabase client, etc.)
│   │   ├── types/                        ← TypeScript type definitions
│   │   ├── constants/                    ← Questions, colors, aids, etc.
│   │   └── content/                      ← Question packs (anime, movies, games)
│   ├── api-server/                       ← Express backend (scaffolding)
│   └── mockup-sandbox/                   ← UI prototyping (not production)
├── lib/
│   ├── api-client-react/                 ← Generated TanStack Query client
│   ├── api-spec/                         ← OpenAPI spec
│   ├── api-zod/                          ← Zod validators
│   └── db/                               ← Drizzle DB schema
└── pnpm-workspace.yaml                   ← Workspace config
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **App Framework** | Expo SDK ~54, expo-router ~6 |
| **UI** | React Native 0.81.5, Inter font, custom color tokens |
| **State Management** | React Context + module-level stores (no Redux/Zustand) |
| **Data Persistence** | AsyncStorage (local), Supabase (remote) |
| **Package Manager** | pnpm workspaces |
| **Language** | TypeScript (strict mode) |

---

## Game Rules (For Context)

1. **Setup Phase:** Each team picks 3 category topics for itself, alternating turns (`app/create-game/categories.tsx`). Then both teams pick 3 Aids (one-use power-ups).

2. **Board Phase:** Each team's 3 categories × 3 tiers (200/400/600 points) × 2 questions per tier = 18 tiles per team (36 tiles total across both teams' columns). Teams alternate picking tiles to reveal questions.

3. **Question Phase:** 
   - A countdown timer runs (default 30 seconds, configurable).
   - Active team answers.
   - If correct: +points. If wrong: –points.
   - Team may use an Aid before revealing the answer, or after.

4. **Aids (Power-ups):**
   - **Skip** – Pass on the question (no points loss).
   - **Split** – Displays an in-game reminder banner ("announce two options: A correct, B your choice"). Does not change scoring or question flow — see "Planned / Not Yet Implemented" below.
   - **Steal** – Opponent attempts the question; if right, they score; if wrong, active team scores.
   - **Phone** – +30 seconds added to the question timer.
   - **Double** – 2× points if correct.
   - **Veto** – Opponent's team skips their entire next tile-pick turn.
   - **Insider** – Reveal the category's theme hint.

5. **End Game:** All tiles revealed → Results screen shows winner → game recorded to Supabase.

### Planned / Not Yet Implemented

These mechanics are described in earlier design notes / product intent but are **not** what the code currently does. Documented here so the intent isn't lost, not as a description of current behavior:

- **Dual category draft** – Originally: each team also picks the *opponent's* 3 categories (for strategic denial), yielding a 6-category board. **Actual:** a simple alternating self-draft — each team picks 3 categories for itself only (`app/create-game/categories.tsx`, `team1Picks.length < 3` / `team2Picks.length < 3`). The board still ends up with 6 categories total (3 per team), so the category *count* matches, but the *drafting mechanic* does not.
- **Phone-a-friend (answer reveal)** – Originally: reveals one of the question's acceptable answers. **Actual:** adds +30 seconds to the timer (`app/question.tsx` `handlePhone`). In-app copy (Aid picker and question screen) already reflects the +30s behavior.
- **Veto (block opponent's Aid)** – Originally: blocks the opponent's next Aid use specifically. **Actual:** the opponent's entire next tile-pick turn is skipped (`app/question.tsx` `handleVeto`/`submitResult`, `app/board.tsx` `nextTurnAfter`, `app/create-game/teams.tsx` Aid description). In-app copy already reflects the turn-skip behavior.
- **Split (co-op scoring)** – Originally (per this README, previously): both teams attempt the question and both score if correct. A different variant is described in the Aid picker's own copy ("host narrows it to two options, pick one"). **Actual:** neither is implemented — using Split only sets a `splitActive` flag that renders a reminder banner during the question (`app/question.tsx` line ~145, ~377). It is never read by `handleActiveCorrect`, `handleNobodyGotIt`, or `submitResult`, so there is no code path that awards points to the non-active team. **If you use Split, any points for the second team/option must be tracked manually, outside the app** — the app only scores the active team's normal answer.

---

## Key Concepts

### GameConfig (Setup State)
Persisted to AsyncStorage under `renegade:current_game`. Contains:
- Team names
- Chosen categories (for both teams)
- Chosen Aids (for both teams)

Managed via `RenegadeContext` (use the `useRenegade()` hook to access/update).

### BoardSession (Game State)
Persisted under `renegade:board_session`. Contains:
- Tile statuses (open, answered, locked)
- Current scores
- Current turn (which team's turn)
- Used Aids
- Pending question result (before returning to board)

Managed via `store/gameSession.ts` (functions: `loadBoardSession`, `saveBoardSession`, `clearBoardSession`, etc.).

### Questions & Content
All questions live in Supabase's `categories`/`questions` tables, fetched via `hooks/useCategories.ts`. Draft content packs (anime, movies, video games) are in `content/*.draft.ts` pending migration into Supabase.

**Tier philosophy:**
- **200** = casual fan (famous scenes, broad cultural exposure)
- **400** = real fan (named mechanics, mid-story details, character arcs)
- **600** = passionate fan (lore, speedrunning records, developer history)

### Culture Tags
Categories are tagged: `circassian | jordanian | arabic | american | islamic | universal`. Used for category selection diversity.

---

## Common Tasks

### Add a Question
1. Find the target category's `id` in the Supabase `categories` table
2. Insert a row into the `questions` table:
   ```sql
   insert into questions (id, category_id, tier, prompt, answer, acceptable_answers)
   values ('unique-id', 'category-id', 400, 'What is the name of...?', 'Correct Answer',
           array['Correct Answer', 'alt spelling', 'common abbreviation']);
   ```
3. Follow tier guidelines in `content/content_quality_system.md`

### Add a New Category
1. Insert a row into the Supabase `categories` table, setting `culture` appropriately
2. Add its questions following tier rules

### Add an Aid Type
1. Add to `AidId` union in `types/game.ts`
2. Handle in `question.tsx` Aid logic
3. Add label in `constants/aids.ts` (or similar)
4. Commit: `feat(aids): add [AidName] aid type`

### Change Timer Default
1. Edit `store/settings.ts` initial value
2. Commit: `config(settings): change default timer to [N] seconds`

### Fix a Bug
1. Create branch: `git checkout -b fix/[bug-name]`
2. Write a test or minimal reproduction
3. Fix the bug
4. Commit: `fix([scope]): [description]` with "Fixes #[issue-number]"
5. Push and open a PR

### Add a Feature
1. Create branch: `git checkout -b feature/[feature-name]`
2. Implement
3. Test on device
4. Commit: `feat([scope]): [description]`
5. Push and open a PR

---

## Development Workflow

See `CONTRIBUTING.md` for detailed branch strategy, commit message format, and PR process.

**TL;DR:**
- Work on `feature/*` or `fix/*` branches (never `main` or `develop`)
- One logical change per commit
- Clear commit messages (format: `type(scope): description`)
- Open a PR before merging to `develop`
- `main` is always stable

---

## Architecture

See `ARCHITECTURE.md` for:
- Data flow diagrams
- Component hierarchy
- State management patterns
- Database schema overview
- Supabase integration details

---

## Troubleshooting

### App won't start
```bash
cd Data-Model-Home
rm -rf node_modules .expo
pnpm install
pnpm --filter @workspace/renegade dev
```

### AsyncStorage errors
- Clear Expo cache: `pnpm --filter @workspace/renegade dev --clear`
- Delete saved game state in Expo app Settings

### Supabase connection issues
- Check `.env` file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Verify network access to Supabase (not behind corporate firewall)

### Hot reload not working
- Save the file again (sometimes takes 2 saves)
- Restart Expo dev server: `Ctrl+C` then `pnpm --filter @workspace/renegade dev`

---

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [expo-router Guide](https://docs.expo.dev/routing/introduction/)
- [React Native Docs](https://reactnative.dev)
- [Supabase Docs](https://supabase.com/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)

---

## License

[Your License Here]

---

## Questions?

See `CONTRIBUTING.md` for how to ask questions, report bugs, or propose features.
