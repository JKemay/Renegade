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

```bash
# Install dependencies (monorepo)
pnpm install

# Start the Expo dev server (from repo root)
pnpm dev

# In Expo Go app or simulator, scan the QR code
```

The app will hot-reload as you save changes.

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

1. **Setup Phase:** Each team picks 3 category topics. Each team *also* picks the opponent's 3 categories (adds strategy). Then both teams pick 3 Aids (one-use power-ups).

2. **Board Phase:** 6 categories × 3 tiers (200/400/600 points) = 18 tiles per team. Teams alternate picking tiles to reveal questions.

3. **Question Phase:** 
   - A countdown timer runs (default 30 seconds, configurable).
   - Active team answers.
   - If correct: +points. If wrong: –points.
   - Team may use an Aid before revealing the answer, or after.

4. **Aids (Power-ups):**
   - **Skip** – Pass on the question (no points loss).
   - **Split** – Both teams attempt; both score if correct.
   - **Steal** – Opponent attempts the question; if right, they score; if wrong, active team scores.
   - **Phone** – Reveal one of the acceptable answers.
   - **Double** – 2× points if correct.
   - **Veto** – Block opponent's Aid next turn.
   - **Insider** – Reveal the category's theme hint.

5. **End Game:** All tiles revealed → Results screen shows winner → game recorded to Supabase.

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
All questions live in `constants/categories.ts` as static TypeScript arrays. Draft content packs (anime, movies, video games) are in `content/*.draft.ts`.

**Tier philosophy:**
- **200** = casual fan (famous scenes, broad cultural exposure)
- **400** = real fan (named mechanics, mid-story details, character arcs)
- **600** = passionate fan (lore, speedrunning records, developer history)

### Culture Tags
Categories are tagged: `circassian | jordanian | arabic | american | islamic | universal`. Used for category selection diversity.

---

## Common Tasks

### Add a Question
1. Open `constants/categories.ts`
2. Find the category you want to add to
3. Append a question object:
   ```ts
   {
     id: "unique-id",
     tier: 400,
     prompt: "What is the name of...?",
     answer: "Correct Answer",
     acceptableAnswers: ["Correct Answer", "alt spelling", "common abbreviation"]
   }
   ```
4. Follow tier guidelines in `content/content_quality_system.md`
5. Commit: `feat(content): add question to [category] category`

### Add a New Category
1. Create a new `Category` object in `constants/categories.ts`
2. Set `culture` tag appropriately
3. Add questions following tier rules
4. Commit: `feat(content): add [category] category with [N] questions`

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
pnpm install
rm -rf node_modules .expo
pnpm install
pnpm dev
```

### AsyncStorage errors
- Clear Expo cache: `pnpm dev --clear`
- Delete saved game state in Expo app Settings

### Supabase connection issues
- Check `.env` file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Verify network access to Supabase (not behind corporate firewall)

### Hot reload not working
- Save the file again (sometimes takes 2 saves)
- Restart Expo dev server: `Ctrl+C` then `pnpm dev`

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
