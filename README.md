# Myplan

Personal planner for meetings, travel, tasks and budgets. Installable on Android and iPhone, with dark colours and bright accent cards. Receipt and payment-confirmation image scanning suggests spending details for review; it does not make payments.

## Independent hosting

The active entry point is now `main.tsx` (React/Vite). Cloudflare Workers serves the website and `/api/` routes. Supabase Auth handles accounts; Cloudflare D1 stores records. The older Next/Sites starter files are retained for reference but are not used by the standalone build.

The Supabase project URL and **publishable** key in `lib/auth-config.ts` are public configuration. No service-role key or database password is needed in the app. Every record API verifies the bearer token with the configured Supabase Auth server and scopes data to the returned user ID. Incoming ChatGPT identity headers are ignored.

## Set up Cloudflare

1. In your Cloudflare account, create a D1 database named `myplan-db`. Copy its database ID.
2. Edit `wrangler.jsonc` in this repository: replace only the placeholder `database_id` with your D1 database ID. Keep the binding name `DB`.
3. In Workers & Pages, create/import a Worker from GitHub and select `shaarialwi/myplan`, branch `main`. Name the Worker `myplan`.
4. Set build command: `npm run build`. Set deploy command: `npx wrangler d1 migrations apply DB --remote && npx wrangler deploy`. Use the repository root. The build environment needs Node 22.13 or newer and permission to manage this D1 database and Worker.
5. Deploy and copy the resulting HTTPS `workers.dev` URL. This is the app URL, not the Supabase project URL. GitHub Pages is not used.

The deployment command creates the plans, expenses and budgets tables using the tracked `drizzle/` SQL migrations. D1 tracks applied migrations. Keep the database ID stable on subsequent deployments.

## Finish Supabase configuration

1. In Authentication settings, enable email/password login and keep email confirmation enabled.
2. In URL Configuration, set Site URL to the exact Cloudflare app origin. Add that same origin as an allowed redirect URL for confirmation and password-reset emails. For local testing, add `http://localhost:8787` separately.
3. Configure a production email provider (SMTP) before inviting general users. Supabase's default email service has delivery and rate restrictions.
4. Open the deployed app, create your account, confirm the email and sign in. Test password reset, saving a plan, adding spending, setting a monthly budget and signing out. Sign in on a second device to check cloud persistence.
5. Create a second test account to verify that it cannot see the first account's records.

No existing production records have been migrated from the ChatGPT-hosted app. New Supabase accounts use different owner IDs. Keep the original app available until data migration and the new deployment have been verified.

## Local development

```sh
npm ci
npm test
npm run typecheck
npm run build
npx wrangler d1 migrations apply DB --local
npm start
```

`npm start` serves the built app and local D1 through Wrangler at port 8787. For UI hot reload, also run `npm run dev`; Vite proxies API requests to port 8787. Add the local Vite origin to Supabase redirect URLs when testing email confirmation there.

## Status

Implemented: email registration/login/logout/password reset; verified server-side identity; per-user plans, expenses and monthly budgets; receipt OCR with manual review; calendar export; home-screen installation.

Still requires account setup and live verification: Cloudflare deployment, D1 binding, Supabase redirect/email settings. Google Workspace and Microsoft 365 calendar synchronisation remain pending. There are no background notifications or native phone share-target imports.

Tests cover receipt parsing/money validation and authentication rejection/verification. They do not replace live two-account and mobile-device testing.
