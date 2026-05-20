# Renegade Content Quality System

Renegade questions should feel like table moments, not school quizzes. The goal is to reward people who love a topic deeply enough to grin when the question proves the game understands them.

## Tier Rules

### 200 points: casual fan reward

Use 200s for questions a casual player can get from broad exposure, memes, famous scenes, cover art, trailers, or basic cultural knowledge.

Rules:
- The clue should be clear and fair.
- Avoid pure dictionary definitions.
- A non-fan should sometimes be able to guess, but a casual fan should feel confident.
- The answer should usually be a title, character, studio, mechanic, object, or famous phrase.

Good 200 pattern:
- "In [well-known game], what [iconic object/character/goal]...?"
- "Which series features [widely recognized premise]?"

### 400 points: real fan filter

Use 400s for players who actually played, watched, listened, followed, or discussed the topic beyond surface-level recognition.

Rules:
- Ask about named mechanics, mid-story details, developers, maps, factions, famous production facts, or community-known terms.
- The clue should still contain enough context to be fair.
- Avoid obscure trivia that does not change how a fan understands the work.
- This tier should make a fan say, "Okay, this category is legit."

Good 400 pattern:
- "What is the named system/mechanic used to...?"
- "Which developer/studio/person created...?"
- "What location/faction/item is tied to this memorable section?"

### 600 points: passionate niche fan payoff

Use 600s for deep but meaningful details. These should excite players who are truly into the topic.

Rules:
- The answer should be obscure enough that casual fans miss it, but not arbitrary.
- Prefer details tied to beloved lore, speedrunning, competitive play, development history, cut content, version history, or famous challenge runs.
- The clue must include enough anchor points that a deep fan can reason it out.
- The question should make the answerer feel seen, not tricked.

Good 600 pattern:
- "In [specific mission/route/patch/community challenge], what...?"
- "What internal/community term is used for...?"
- "Which hidden/development/detail connects [two recognizable anchors]?"

## Banned Lazy Question Types

- "What year did X release?" unless the year itself is culturally important.
- "Who made X?" for every other question.
- "What is the main character's name?" above 200 points.
- Questions whose clue is just a dictionary definition.
- Questions that rely on temporary records, charts, rankings, or current player counts.
- Questions requiring exact spelling of obscure words without accepting common variants.
- Questions with multiple equally correct answers but only one accepted answer.
- Questions where the prompt gives away the answer by over-describing it.
- Questions that are only hard because they are badly worded.
- Questions that are "gotchas" about translation, localization, or canon unless the fan community genuinely cares about that detail.

## Topic Packs vs App Categories

Keep public App Store-facing category tiles generic for v1. For example, use "Video Games" as the app category, not "Call of Duty" or "VALORANT."

Inside draft content, specific games can and should become topic packs:
- `video_games` is the parent category.
- `call_of_duty`, `valorant`, `minecraft`, and similar packs can organize question writing.
- A future content picker can use topic packs internally without exposing IP-heavy category names as top-level app categories.

Topic pack questions should still use the normal 200/400/600 ladder:
- 200: a casual player of that game knows it.
- 400: someone who actually played several hours or followed the community knows it.
- 600: a passionate fan, ranked player, speedrunner, lore nerd, or long-time player gets rewarded.

## Good vs Bad Examples

Bad 200:
> What is Minecraft?

Good 200:
> In Minecraft, what green enemy silently walks toward players and explodes?

Bad 400:
> What company made Halo?

Good 400:
> In Halo, what is the name of Master Chief's AI companion introduced in Combat Evolved?

Bad 600:
> What year did Ocarina of Time release?

Good 600:
> In Ocarina of Time speedrunning, what glitch lets Link store and reuse an action later, enabling major sequence breaks?

Bad 600:
> What is the hardest boss in Dark Souls?

Good 600:
> In Dark Souls, which hidden boss is found behind an illusory wall in Darkroot Garden after using the Crest of Artorias route?

## Review Checklist

Before a question can ship:
- It has exactly one canonical answer, or acceptable alternatives are listed.
- The tier matches the expected player feeling: casual confidence, real-fan reward, or deep-fan payoff.
- The prompt is answerable without images.
- The answer is not based on unstable current data.
- Cultural and Islamic questions have human verification and source notes.
- Universal questions have a reasonable verification trail, especially for 600s.
- At least one playtester in the target audience says, "That was a good question."
