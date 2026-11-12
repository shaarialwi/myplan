# Myplan

Installable planner for meetings, travel, tasks and personal budgets, with receipt and payment-confirmation image scanning.

## Migration status

This repository contains the source of the current ChatGPT-hosted app. Source transfer is not a standalone deployment. The app currently requires the Sites authentication gateway and Cloudflare D1 backend; it cannot run on GitHub Pages as-is.

Before hosting independently, replace `app/chatgpt-auth.ts` with verified server-side authentication, provision the database and apply the SQL migrations, and adapt the build/deployment configuration. Never trust incoming `oai-authenticated-*` headers on an independently exposed server. No production user records or credentials are included.

Google Workspace and Microsoft 365 calendar connections remain unimplemented. Receipt scanning suggests spending details for review; it does not make payments.

## Source and checks

- `app/page.tsx`: planner
- `app/Budget.tsx`: spending, monthly budgets and receipt scanning
- `app/api/`: authenticated record APIs
- `drizzle/`: database migrations
- `public/`: installable-app manifest and icons
- `tests/budget.test.mjs`: money and receipt parser checks (`node --test tests/budget.test.mjs`)

The original starter instructions are preserved in `docs/SITES-STARTER.md`. Keep the existing hosted app in service until independent hosting and authentication are configured and tested.
