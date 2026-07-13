# Charity API

The Charity API is an Express service for public charity lookups, nearby geospatial search, metadata, and OpenAPI documentation. It listens on port `3000` by default.

## Local requirements

Set `DATABASE_URL` for the service-owned PostgreSQL/Prisma client, `REDIS_URL` for API-key rate-limit counters, and `API_KEY_PEPPER` for API-key verification. Optional `PORT` and `PINO_LOG_LEVEL` override the defaults. Copy `.env.example` to `.env` locally; do not commit secrets.

This service owns the Prisma schema, migrations, and generated client configuration under `prisma/`. They are intentionally not shared with other workspaces.

Protected charity and nearby routes validate API keys from PostgreSQL and enforce Redis-backed burst and daily limits. The service includes billing-related database models, but its current runtime dependencies do not invoke a billing provider.

## Safe validation

```sh
pnpm --filter @charity-mono/api run prisma:generate
pnpm service:api:typecheck
pnpm service:api:build
```

## Operational commands

`pnpm --filter @charity-mono/api run dev` and `start` launch the API and may connect to PostgreSQL and Redis. Prisma migrations, API-key operations, and Fly deployment are operational actions. The Dockerfile builds the service with Node 22 and its Fly configuration runs `prisma migrate deploy` as the release command; neither was run during transport.
