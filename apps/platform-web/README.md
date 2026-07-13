# Platform web

The public marketing and developer-documentation site, with Clerk-authenticated dashboard and admin areas. It documents and links to the Charity API at `https://api.charityquery.com`, while also directly managing application users, API keys, tiers, billing, and usage data through its local Prisma client.

Public areas include marketing, pricing, documentation, contact, privacy, sign-in, and sign-up routes. Authenticated areas include dashboard and admin screens. Clerk manages sessions; Stripe powers checkout and billing portal actions; Redis supports usage data; Resend sends contact-form mail.

## Environment

Copy `.env.example` to `.env` locally and supply the listed database, Redis, Clerk webhook, Stripe, Resend, app URL, and API-key-secret values. Do not commit credentials.

## Prisma ownership

This application retains its own historical Prisma schema at `prisma/schema.prisma` and generates its client under `generated/prisma`. The canonical database schema and migration history are `services/api/prisma`; do not reconcile or treat this app-local schema as authoritative during transport.

## Safe validation

```sh
DATABASE_URL='postgresql://placeholder:placeholder@localhost:5432/placeholder' pnpm --filter @charity-mono/platform-web run prisma:generate
pnpm app:platform-web:typecheck
pnpm app:platform-web:lint
```

`dev`, `start`, webhook routes, account/API-key actions, billing actions, contact mail, and deployment are operational: they may connect to external services or mutate data. `next build` was not included as a safe validation command because fully offline behavior has not been established.
