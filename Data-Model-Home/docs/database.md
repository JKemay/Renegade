# Renegade — Database

## Overview

Supabase (hosted Postgres). The app uses two tables. All access is via the Supabase JS SDK using the anon key + anonymous auth JWTs.

---

## Tables

### `games`

Stores completed game records. Written once at the results screen, never updated.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Auto-generated primary key |
| `created_at` | `timestamptz` | Auto-set by Supabase |
| `user_id` | `uuid` | FK → `auth.users.id`. Auto-filled via `DEFAULT auth.uid()` |
| `team1_name` | `text` | Team 1 display name |
| `team2_name` | `text` | Team 2 display name |
| `team1_score` | `int4` | Final score (min 0) |
| `team2_score` | `int4` | Final score (min 0) |
| `winner` | `text` | `'team1'`, `'team2'`, or `'tie'` |
| `categories` | `text[]` | Category IDs used in this game |

**Access pattern:** Insert on game end. Select to show "games played / wins" stats on home screen.

---

### `seen_questions`

Tracks which question IDs a user has already seen, to prevent repeats across sessions.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Auto-generated primary key |
| `user_id` | `uuid` | FK → `auth.users.id`. Auto-filled via `DEFAULT auth.uid()` |
| `question_id` | `text` | The question's ID string from `constants/categories.ts` |
| `played_at` | `timestamptz` | When the question was shown |

**Constraints:** `(user_id, question_id)` should be unique — the app handles `23505` unique violation silently.

**Access pattern:** Insert after each question. Select on board load to filter out seen questions. Delete all when user resets history in Settings.

---

## Authentication

Anonymous auth (`supabase.auth.signInAnonymously()`). Every device gets a UUID in `auth.users` on first launch, persisted to `AsyncStorage`. This UUID is what `auth.uid()` returns in all RLS policies.

No email, no password, no OAuth for v1. The anonymous session survives app restarts via `persistSession: true` + `AsyncStorage` storage adapter.

---

## Row Level Security

RLS is enabled on both tables. All policies use `auth.uid()` to scope data to the current user.

The `user_id` column has `DEFAULT auth.uid()` — the app never sends `user_id` in inserts. Postgres fills it in automatically from the JWT.

### `games` policies

| Policy | Operation | Rule |
|---|---|---|
| Users can insert their own games | INSERT | `user_id = auth.uid()` |
| Users can read their own games | SELECT | `user_id = auth.uid()` |

### `seen_questions` policies

| Policy | Operation | Rule |
|---|---|---|
| Users can insert their own seen questions | INSERT | `user_id = auth.uid()` |
| Users can read their own seen questions | SELECT | `user_id = auth.uid()` |
| Users can delete their own seen questions | DELETE | `user_id = auth.uid()` |

The DELETE policy is required for the "Reset Question History" button in Settings.

---

## Migrations

Migration files live in `supabase/migrations/`. Apply them manually via Supabase Dashboard → SQL Editor → New Query.

| File | What it does |
|---|---|
| `20260521_rls_and_user_id.sql` | Adds `user_id` column to both tables, enables RLS, creates all policies |

Files are idempotent (`IF NOT EXISTS` / `DROP POLICY IF EXISTS` guards) — safe to re-run.

---

## What the service_role key is and why it stays off this project

The `service_role` key bypasses all RLS policies entirely. It's intended for server-side admin operations (e.g., backfills, migrations run from a trusted server). It must never appear in:
- Any client-side code
- Any `.env` file tracked by git
- The app bundle

It lives only in: Supabase Dashboard → Project → Settings → API (server-side use only).

---

## Future schema considerations

- **`user_id NOT NULL` constraint:** Currently nullable to handle existing rows. After a clean migration on a fresh project, this should be `NOT NULL`.
- **Content in database:** For v2, question content moves from `constants/categories.ts` to a `questions` table, enabling dynamic updates and premium packs without an app release.
- **Drizzle ORM:** `lib/db/` has Drizzle configured but the schema is empty. When the API server needs to write to Supabase, define tables there and generate migrations with `drizzle-kit`.
