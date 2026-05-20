# Renegade Codex Handoff

Written by Codex after taking over from the paused Claude agent.

## Current Direction

Janti chose to stabilize the current prototype instead of rolling all the way back to Step 1.

Agent coordination rule:
- Claude should be the implementation agent if resumed.
- Codex should review diffs, catch scope drift, and write precise follow-up prompts.
- Do not let multiple agents edit the same files at the same time without explicit file ownership.

## What Codex Changed

- Restored shipping category data in `artifacts/renegade/constants/categories.ts` to 11 categories with `questions: []`.
- Quarantined the generated question set in `artifacts/renegade/constants/generatedQuestions.draft.ts`.
  - Do not import this draft file into app code.
  - Cultural/Islamic content still requires human sourcing and verification.
- Added `artifacts/renegade/content/content_quality_system.md`.
  - Defines 200/400/600 tier rules, banned lazy question types, examples, and review checklist.
- Added `artifacts/renegade/content/video_games.questions.draft.ts`.
  - Contains 30 draft Video Games questions: 10 each for 200, 400, and 600.
  - Draft-only; do not import into shipping categories until reviewed and playtested.
- Added `artifacts/renegade/content/video_game_topic_packs.draft.ts`.
  - First wave of internal game-specific packs: Call of Duty, VALORANT, Minecraft, Fortnite, League of Legends, and Pokemon.
  - Each pack has 6 draft questions: 2 each for 200, 400, and 600.
  - These are internal topic packs under the public `video_games` category, not App Store-facing category names.
- Added `artifacts/renegade/content/anime_topic_packs.draft.ts`.
  - First wave: Naruto, Attack on Titan, and Death Note.
  - Each pack has 6 draft questions across 200/400/600.
- Added `artifacts/renegade/content/movies_tv_topic_packs.draft.ts`.
  - First wave: Game of Thrones, The Lord of the Rings, Harry Potter, and Star Wars.
  - These currently live under the public `movies` category until/unless a separate TV category exists.
- Added `artifacts/renegade/content/topic_pack_coverage.md`.
  - Tracks what packs exist and what topic packs should come next across all categories.
- Updated `content_quality_system.md` with a Topic Packs vs App Categories rule.
  - Keep top-level category tiles generic for v1.
  - Specific games can organize internal draft content.
- Added `ios.bundleIdentifier: "com.janti.renegade"` in `artifacts/renegade/app.json`.
- Added persistent board-session state in `artifacts/renegade/store/gameSession.ts`.
  - Persists scores, current turn, tile statuses, and used aids under `renegade:board_session`.
- Reworked the board to use 36 tiles:
  - 6 selected categories
  - 3 tiers
  - 2 slots per tier
  - Tile keys use `categoryId:tier:slotIndex`.
- Updated question result handoff to include `slotIndex`.
- Fixed Back on the question screen so it returns without marking the tile played.
- Added host-assisted Veto behavior:
  - Active team can use Veto.
  - The next opposing pick is skipped by keeping turn with the active team after the result.
- Patched New Game, Continue Game, Play Again, and category/team setup to intentionally clear or resume board session state.
- Fixed context update methods to use latest state instead of stale captured state.

## Verification

Passed:

```powershell
node .\node_modules\typescript\bin\tsc -p .\artifacts\renegade\tsconfig.json --noEmit
```

Notes:
- `pnpm` was not available on this sandbox PATH.
- `corepack pnpm` tried to reach npm registry and failed due sandboxed network access.
- Direct TypeScript check is the verification source for this pass.

## Remaining Risks / Next Tasks

- Run the Expo app manually and test the full loop on device or web:
  - New Game -> category picker -> team setup -> board -> question -> result -> persisted Continue Game.
  - Confirm 36 visible board tiles and no layout crowding on iPhone.
  - Confirm Veto keeps the turn with the team that used it.
  - Confirm used aids stay disabled after navigating between questions and after app restart.
- Generated draft questions are still AI-generated and unverified.
  - Keep them quarantined until Janti explicitly reviews and sources them.
  - Islamic must stay empty unless human-sourced and verified.
- Video Games draft questions should be checked for difficulty feel with real players.
  - The 600s intentionally target deep-fan/community knowledge.
  - Revise any question that feels obscure-but-not-fun.
- Continue adding game topic packs in draft form only.
  - Good next targets: Grand Theft Auto, Counter-Strike, Halo, Zelda, Elden Ring/Dark Souls, Roblox, Minecraft advanced, Fortnite advanced, Super Smash Bros., and NBA 2K.
  - Do not turn these into public category tiles without revisiting App Store/IP strategy.
- Continue adding non-game topic packs using `topic_pack_coverage.md`.
  - Priority: Sports, Music Artists, Food, American Culture, Arabic Heritage.
  - Do not generate Islamic content with AI.
  - Circassian/Jordanian drafts need Janti/family/community verification before shipping.
- Existing backend/API/template workspace files were not removed.
  - They may be Replit scaffold noise; do not wire them into Renegade v1.
- `artifacts/mockup-sandbox/src/hooks/use-toast.ts` had pre-existing unrelated modifications before Codex touched the app.
  - Codex did not review or change that file.
- Several UI strings inherited from Claude may contain mojibake/non-ASCII artifacts.
  - Clean visible text before a serious playtest.

## Strong Instruction For Claude

Do not regenerate shipping trivia content. The current app should remain text-only, local-only, and scope-limited. The next useful work is manual UX verification and tightening the board/question loop, not adding more categories, backend, analytics, images, or content.
