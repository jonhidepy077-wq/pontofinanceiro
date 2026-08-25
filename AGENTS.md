# AGENTS.md

## What this is

A Brazilian personal-finance education portal ("Ponto Financeiro") with a public blog and a full CMS admin panel. Originally an AI Studio export (React + Express + Firebase); adapted to run natively on Netlify.

## Architecture

- **Front end**: Vite + React 19 SPA, no server-side rendering. `netlify.toml` redirects all paths to `index.html` so client-side routing works.
- **API**: Netlify Functions in `netlify/functions/`, one file per concern:
  - `cms.mts` — generic CRUD over `/api/cms/:resource[/:id]` for articles, categories, authors, pages, subscribers, contact-messages, media, plus `/api/cms/all` (bulk read, used on app load) and `/api/cms/settings` (singleton row).
  - `auth-login.mts` — validates admin credentials against `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars; never ships credentials to the client.
  - `ai-assistant.mts` — editorial AI assistant used in the admin panel, calls Gemini through Netlify AI Gateway (zero-config, no API key needed in the client or server code).
  - `sitemap.mts`, `robots.mts` — replace the Express routes of the same name from the original export.
- **Data**: Netlify Database (Postgres) via Drizzle ORM. Schema in `db/schema.ts`, client in `db/index.ts`, migrations in `netlify/database/migrations/` (generated with `drizzle-kit generate`, applied automatically by Netlify on deploy — never run `drizzle-kit migrate/push` locally).

## Non-obvious decisions

- **Firebase was removed.** The original export initialized `firebase/app`, `firestore`, and `auth`, but nothing in the app actually read or wrote through them — all CMS state lived in `localStorage`. Firebase was dead weight and was deleted rather than wired up.
- **`localStorage` was replaced with a real database.** The CMS manages persistent content (articles, categories, authors, pages, settings, subscribers, messages, media) that must survive across browsers and sessions, so it was moved to Netlify Database instead of staying client-only.
- **`DataContext.tsx` keeps its original synchronous method signatures** (`addArticle` still returns the created `Article` immediately, etc.) so none of the ~20 admin components that consume it needed to change. Mutations update React state synchronously and fire the matching persistence call to `netlify/functions/cms.mts` in the background (optimistic UI, not awaited). If a persistence call fails it's only logged — a full offline queue/retry system was judged out of scope for a single-editor CMS.
- **Admin auth is a single hardcoded-by-env credential pair**, not a full auth system (no multi-user roles, no Netlify Identity) — this reflects the original app's single-admin design; it was moved server-side (from a hardcoded/permissive check in client code to `auth-login.mts` reading env vars) so credentials aren't shipped in the JS bundle.
- **The AI assistant model is `gemini-3-flash-preview`** via AI Gateway (see `netlify-ai-gateway` skill for the supported model list) instead of a directly-configured `GEMINI_API_KEY`; it falls back to static heuristic text (ported from the original Express route) if the AI call fails.

## Conventions

- Netlify Functions use the modern `.mts` default-export + `config` object style (not `exports.handler`).
- jsonb columns (`tags`, `sources`, `socials`, `adsConfig`, etc.) store nested/opaque structures the UI edits as whole objects — they aren't normalized into separate tables.
- Env vars in functions are read with `Netlify.env.get(...)`, not `process.env`.
