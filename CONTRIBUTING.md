# Contributing to Renegade

This guide explains how we work on the Renegade codebase. It's based on industry-standard software engineering practices. Following it ensures clean history, clear intent, and easy collaboration.

---

## Branch Strategy

We use **GitHub Flow** (simplified): `main` (stable) + `develop` (active) + feature branches.

```
main (stable, tested)
  ↑
  └─ develop (integration branch)
      ↑
      ├─ feature/add-timer
      ├─ feature/new-category
      └─ fix/scoring-bug
```

### Rules

1. **Never push directly to `main` or `develop`.**
2. Create a **feature branch** for every piece of work:
   - `feature/[description]` for new features
   - `fix/[description]` for bugs
   - `docs/[description]` for documentation
   - `chore/[description]` for refactors or tooling
3. Branch off `develop` (not `main`).
4. Open a **Pull Request** (PR) before merging.
5. After review + tests pass, merge to `develop`.
6. When `develop` is stable, merge to `main` (release).

### Example

```bash
# Get latest code
git checkout develop
git pull origin develop

# Create a feature branch
git checkout -b feature/add-timer-pause

# ... make changes ...

# Push and open PR
git push origin feature/add-timer-pause
# → Open PR on GitHub (develop ← feature/add-timer-pause)
```

---

## Commit Messages

A good commit message explains **what changed** and **why**—not just the code changes.

### Format

```
type(scope): subject line (50 characters max)

body explaining WHY (wrap at 72 characters)
- What problem did this solve?
- Why this approach?
- Any tradeoffs?

Fixes #123
```

### Types

- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation
- `style` — formatting (no logic change)
- `refactor` — rewrite without changing behavior
- `perf` — performance improvement
- `test` — add/update tests
- `chore` — tooling, dependencies, config

### Scope

The affected area:
- `scoring` — score calculation
- `timer` — countdown logic
- `aids` — aid mechanics
- `content` — questions/categories
- `context` — RenegadeContext
- `store` — stores (gameSession, etc.)
- `ui` — components/styling
- `db` — Supabase schema

### Examples

**Good commit:**
```
feat(aids): implement steal aid mechanics

When a team uses the Steal aid, the opposing team gets
an attempt at the question. If they answer correctly,
they score points. If wrong, the original team scores.

This creates a risk/reward dynamic and keeps both teams engaged.

Fixes #42
```

**Good commit:**
```
fix(scoring): prevent negative scores below zero

Users could reach scores like -200 by answering wrong
multiple times. Added a Math.max(0, newScore) check
to prevent this. Scores now floor at 0.

Fixes #18
```

**Good commit:**
```
docs(readme): add quick start section

Added prerequisites, install steps, and how to run the dev server.
Helps new contributors get started in 2 minutes.
```

**Good commit:**
```
refactor(store): simplify gameSession state updates

Extracted repeated score update logic into updateTeamScore() helper.
No behavior change; cleaner code.
```

---

## Pull Request Process

### Before Opening a PR

1. **Test locally:**
   ```bash
   pnpm dev
   # Test feature on device/simulator
   ```

2. **Verify no breaking changes:**
   - Does the app still start?
   - Can you complete a full game?
   - Do old saved games still load?

3. **Check code quality:**
   - No `console.log` left behind (except debug comments)
   - TypeScript errors? Fix them.
   - Dead code removed?

### Opening a PR

1. Push your branch:
   ```bash
   git push origin feature/your-feature
   ```

2. Go to GitHub, open a Pull Request:
   - **Base:** `develop`
   - **Compare:** your `feature/` branch

3. **PR title:** Same format as commit messages:
   ```
   feat(aids): implement steal aid mechanics
   ```

4. **PR description:** Explain what & why:
   ```markdown
   ## What
   Implemented the Steal aid. When used, the opposing team
   attempts the question. Correct = they score, wrong = we score.
   
   ## Why
   Steal was missing from the aid list. Creates risk/reward
   and keeps both teams engaged throughout.
   
   ## Testing
   - Tested all 3 aid outcomes (correct/wrong/skip)
   - Verified scores update correctly
   - Confirmed aid button disables after use
   
   Fixes #42
   ```

### Review & Merge

1. **I (Claude)** review:
   - Does it match the issue intent?
   - Is code readable?
   - Are there edge cases?
   - Does it introduce bugs?

2. **Discussion:**
   - I'll comment on specific lines if something needs changing
   - You reply (ask for clarification or make changes)

3. **Approval & Merge:**
   - Once approved, click **Merge Pull Request**
   - Delete the branch after merge (GitHub prompts for this)

---

## Code Standards

### TypeScript

- Use **strict mode** (already enabled)
- Avoid `any`; use specific types
- Export types from `types/game.ts` and re-use

**Bad:**
```ts
const handleAnswer = (ans: any) => {
  // ...
};
```

**Good:**
```ts
const handleAnswer = (ans: string) => {
  // ...
};
```

### React / React Native

- Use **hooks** (no class components)
- Keep components focused (single responsibility)
- Extract reusable logic into custom hooks

**Bad:**
```tsx
export default function Question() {
  // 300 lines of timer logic + answer logic + aid logic + styling
}
```

**Good:**
```tsx
function useQuestionTimer(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  // ... timer logic
  return { remaining, pause, resume };
}

export default function Question() {
  const { remaining, pause, resume } = useQuestionTimer(30);
  // ... component logic (clean, focused)
}
```

### File Organization

- **Components:** One per file, named after the component
- **Hooks:** `hooks/useQuestionTimer.ts`, `hooks/useRenegade.ts`
- **Stores:** `store/gameSession.ts`, `store/games.ts`
- **Types:** All in `types/game.ts` (central, discoverable)

### Comments

- Explain **why**, not **what**
- Code should be self-documenting; comments fill in the gaps

**Bad:**
```ts
// Loop through questions
for (let i = 0; i < questions.length; i++) {
  // ...
}
```

**Good:**
```ts
// Shuffle questions to randomize order (prevents pattern recognition)
const shuffled = questions.sort(() => Math.random() - 0.5);
```

### Naming

- **Variables:** camelCase, descriptive
- **Constants:** UPPER_SNAKE_CASE
- **Types/Interfaces:** PascalCase

```ts
const teamOneScore = 100;  // ✓
const t1 = 100;            // ✗

const DEFAULT_TIMER_SECONDS = 30;  // ✓
const timer = 30;                   // ✗

interface GameConfig { }   // ✓
interface gameConfig { }   // ✗
```

---

## Testing (Future)

When we add tests:

- **Unit tests:** `store/gameSession.test.ts` (test store functions)
- **Integration tests:** Test Context + components
- **E2E tests:** Full game flow

Run tests:
```bash
pnpm test
```

Commit tests with feature:
```
feat(scoring): add multiplier for quick answers

+ unit test for multiplier calculation
+ e2e test: complete game with multiplier
```

---

## Common Workflows

### Add a Question

1. Create branch:
   ```bash
   git checkout -b feature/add-naruto-questions
   ```

2. Edit `constants/categories.ts`:
   ```ts
   {
     id: "anime_naruto_001",
     tier: 200,
     prompt: "What is Naruto's signature technique?",
     answer: "Shadow Clone Jutsu",
     acceptableAnswers: ["Shadow Clone", "Shadow Clones", "Kage Bunshin"]
   }
   ```

3. Test on device to ensure category loads

4. Commit:
   ```bash
   git add .
   git commit -m "feat(content): add naruto questions to anime category

   Added 3 questions across tiers (200/400/600) about Naruto mechanics,
   characters, and lore. Questions follow tier guidelines in content_quality_system.md"
   ```

5. Push and open PR:
   ```bash
   git push origin feature/add-naruto-questions
   ```

### Fix a Bug

1. **Create an issue** (if one doesn't exist) describing the bug
2. Create branch:
   ```bash
   git checkout -b fix/scoring-below-zero
   ```

3. Write a test or minimal reproduction of the bug

4. Fix the bug

5. Verify the fix

6. Commit:
   ```bash
   git commit -m "fix(scoring): prevent negative scores

   Scores could go below 0 by answering wrong multiple times.
   Added Math.max(0, newScore) to floor at 0.

   Fixes #18"
   ```

7. Push and open PR

### Update Documentation

1. Create branch:
   ```bash
   git checkout -b docs/add-architecture-guide
   ```

2. Edit `README.md`, `ARCHITECTURE.md`, etc.

3. Commit:
   ```bash
   git commit -m "docs(architecture): add data flow diagrams

   Clarified how AsyncStorage, Context, and Supabase interact.
   Added visual diagrams and code examples."
   ```

4. Push and open PR

---

## Collaboration Guidelines

### Asking Questions
- **In issues:** "How should we handle X?"
- **In PRs:** "Why did you choose Y instead of Z?"
- Be respectful, assume good intent

### Proposing Changes
- **If small:** Just do it (branch + PR)
- **If large:** Open an issue first, discuss approach

### Code Review
- Be kind; reviews are about the code, not the person
- Explain *why* feedback matters (don't just say "no")
- Author's job to address feedback; my job to verify

---

## Release Process

When `develop` is stable and we want to release:

1. Verify all tests pass
2. Update `CHANGELOG.md` (if you have one)
3. Merge `develop` → `main`:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```
4. Tag the release:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
5. Deploy (if applicable)

---

## Troubleshooting

### I messed up a commit message

```bash
# If not yet pushed:
git commit --amend -m "correct message"

# If already pushed:
git push --force-with-lease origin your-branch
```

### I committed to the wrong branch

```bash
# Move unpushed commits to a new branch
git branch new-branch
git reset --hard origin/main
git checkout new-branch
```

### I want to see what changed

```bash
git diff develop..feature/your-feature
# or on GitHub: open the PR, tab "Files changed"
```

### Merge conflicts

```bash
# Pull latest develop
git checkout develop
git pull origin develop

# Rebase your branch on top
git checkout feature/your-feature
git rebase develop

# Resolve conflicts in editor, then:
git add .
git rebase --continue
git push --force-with-lease origin feature/your-feature
```

---

## Questions?

- Ask in a GitHub issue
- Or in a PR comment
- Or reply in our chat

We're all learning here. No question is dumb.

---

## Summary

**The essence:**
1. Create a branch for every piece of work
2. Write clear commit messages (what + why)
3. Open a PR, get review
4. Merge to `develop` when approved
5. Merge `develop` → `main` for releases

This ensures clean history, clear intent, and the ability to understand why every change was made—six months from now.
