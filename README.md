
# JobGenius AI — Lite Prototype (v2)

Includes:
- AIDES Command Palette (Ctrl/⌘+K)
- `/status` → Seed demo rows button
- Netlify CI via GitHub Actions

## Quickstart
```bash
npm i
cp .env.example .env.local
# fill envs
npm run dev
```

## Deploy (Netlify)
- Import repo → Build: `npm run build` → Publish: `dist`
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_PAYHIP_URL`
- SPA redirect handled by `netlify.toml`

## CI (Codex)
- Add GitHub repo secrets:
  - `NETLIFY_AUTH_TOKEN`
  - `NETLIFY_SITE_ID`
- Workflow: `.github/workflows/deploy-netlify.yml`

## AIDES
- Ctrl/⌘+K to open Palette.
- `/status` → click **Seed demo rows** for instant test data.
