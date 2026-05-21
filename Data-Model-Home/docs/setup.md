# Renegade — Local Development Setup

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 18+ | Required by Expo SDK 54 |
| pnpm | 11+ | Do not use npm or yarn |
| Expo Go app | latest | For on-device testing (iOS/Android) |
| EAS CLI | latest | `npm install -g eas-cli` — for builds |

---

## 1. Clone and install

```bash
git clone <repo-url>
cd Data-Model-Home
pnpm install
```

All workspace packages install in one step. pnpm will reject if you try npm/yarn (preinstall hook).

---

## 2. Environment variables

Create `artifacts/renegade/.env` (copy from `.env.example`):

```bash
cp artifacts/renegade/.env.example artifacts/renegade/.env
```

Then fill in the values:

```env
EXPO_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

**Where to find these:** Supabase Dashboard → Project → Settings → API

**These are NOT secrets.** They use the `EXPO_PUBLIC_` prefix because Expo intentionally bundles them into the app binary. The anon key is a publishable key. Your security comes from Row Level Security policies, not keeping this key hidden.

**What IS secret (never put in .env or any tracked file):**
- Supabase `service_role` key — bypasses all RLS, server-side only
- Apple Developer credentials
- EAS tokens

---

## 3. Run the app

```bash
# Start Expo dev server
cd artifacts/renegade
pnpm start

# Or from monorepo root:
pnpm --filter @workspace/renegade start
```

Then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan QR with Expo Go for physical device
- Press `w` for web (limited — some native APIs unavailable)

---

## 4. Run the API server (optional, scaffolding only)

```bash
cd artifacts/api-server
pnpm dev
```

Server starts at `http://localhost:3000`. Only endpoint: `GET /api/healthz`.

---

## 5. Supabase local setup

The app talks directly to the hosted Supabase project. There is no local Supabase instance configured.

To apply schema migrations, go to:
**Supabase Dashboard → SQL Editor → New Query**

Run the files in `supabase/migrations/` in filename order:
```
20260521_rls_and_user_id.sql
```

---

## Project commands

| Command | What it does |
|---|---|
| `pnpm install` | Install all workspace deps |
| `pnpm --filter @workspace/renegade start` | Start Expo dev server |
| `pnpm --filter @workspace/renegade typecheck` | TypeScript check (no build) |
| `pnpm --filter @workspace/api-server dev` | Start Express server (dev) |
| `pnpm --filter @workspace/api-server build` | Build API server to `dist/` |

---

## Branching rules

- Never commit directly to `main` or `develop`
- Branch from `develop`: `git checkout -b feature/your-thing`
- PR into `develop`, merge `develop` → `main` for releases
- Commit format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `refactor`, `chore`, `content`, `security`
  - Scopes: `scoring`, `timer`, `aids`, `content`, `context`, `store`, `ui`, `db`

---

## Common gotchas

**`pnpm install` fails:** Make sure you're using pnpm. The preinstall hook blocks npm/yarn.

**Expo can't find `.env`:** The `.env` file must be in `artifacts/renegade/`, not the monorepo root.

**TypeScript errors on `@/` imports:** The `@/` alias maps to `artifacts/renegade/`. Only works inside that package.

**Supabase calls returning empty arrays after RLS migration:** Expected. RLS requires an authenticated session. Ensure `ensureAnonymousSession()` runs before any Supabase query. It's called in `app/_layout.tsx` on mount.
