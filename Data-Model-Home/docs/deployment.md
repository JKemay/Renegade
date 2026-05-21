# Renegade — Deployment

## Build system

Expo Application Services (EAS). Builds run on Expo's cloud infrastructure — you do not need Xcode or Android Studio locally to produce store-ready binaries.

Config: `artifacts/renegade/eas.json`

---

## EAS environment variables

The app needs `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` available at build time. These are set in the EAS dashboard (not committed to git).

To set or update them:
```bash
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://..."
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "sb_publishable_..."
```

Or via EAS Dashboard → Project → Secrets.

---

## Build commands

```bash
cd artifacts/renegade

# iOS development build (install on device via TestFlight or direct)
eas build --platform ios --profile development

# iOS production build (for App Store submission)
eas build --platform ios --profile production

# Android production build (for Play Store)
eas build --platform android --profile production

# Both platforms at once
eas build --platform all --profile production
```

---

## App Store submission checklist

### Before submitting

- [ ] Run `eas build --platform ios --profile production` and confirm build succeeds
- [ ] Replace `jantiyamek@gmail.com` in privacy policy with a dedicated support email
- [ ] Review privacy policy at `https://jkemay.github.io/Renegade/privacy-policy.html` for any personal details
- [ ] Prepare App Store screenshots (required sizes: 6.7", 6.1", 12.9" iPad)
- [ ] Write App Store listing copy (name, subtitle, description, keywords)
- [ ] Confirm Apple Developer Account is active ($99/year)
- [ ] `app.json` bundle ID: `com.janti.renegade`

### Submitting

```bash
# After build completes, submit directly from EAS
eas submit --platform ios --latest
```

Or manually upload the `.ipa` via Transporter app.

---

## Play Store submission checklist

- [ ] Confirm Google Play Developer Account ($25 one-time)
- [ ] Run `eas build --platform android --profile production`
- [ ] Prepare Play Store screenshots + feature graphic (1024×500)
- [ ] `app.json` Android package: `com.janti.renegade`, versionCode increments per release

```bash
eas submit --platform android --latest
```

---

## Version management

`app.json`:
- `version`: user-facing (e.g., `"1.0.0"`)
- `ios.buildNumber`: must increment on every TestFlight/App Store upload (e.g., `"1"`, `"2"`, ...)
- `android.versionCode`: must increment on every Play Store upload (integer)

EAS can auto-increment these:
```bash
eas build --platform ios --profile production --auto-submit
```

---

## Supabase (no deployment needed)

Supabase is a hosted service. The only "deployment" is applying SQL migrations:

1. Go to Supabase Dashboard → SQL Editor
2. Run each file in `supabase/migrations/` in filename order

There is no Supabase CLI setup in this project currently.

---

## API server (not deployed yet)

`artifacts/api-server/` is Express scaffolding. It has no live deployment. When ready:

1. Build: `pnpm --filter @workspace/api-server build` → outputs to `dist/`
2. Deploy to Railway, Render, Fly.io, or any Node.js host
3. Set env vars: `NODE_ENV=production`, `PORT`, `DATABASE_URL`
4. Update the app to call your API endpoint instead of Supabase directly (for operations that need server trust)
