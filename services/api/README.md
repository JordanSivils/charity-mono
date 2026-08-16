# Charity API

The Charity API is an Express service for public charity lookups, nearby geospatial search, metadata, and OpenAPI documentation. It listens on port `3000` by default.

## Local requirements

Set `DATABASE_URL` for this service's PostgreSQL client, `REDIS_URL` for API-key rate-limit counters, and `API_KEY_PEPPER` for API-key verification. Optional `PORT` and `PINO_LOG_LEVEL` override the defaults. Copy `.env.example` to `.env` locally; do not commit secrets.

The shared `@charity-mono/database` package owns the Prisma schema, migration history, and generated client. This API creates its own client instance with its package-local `DATABASE_URL` and PrismaPg adapter. Its Fly release command is the sole production migration runner.

Protected charity and nearby routes validate API keys from PostgreSQL and enforce Redis-backed burst and daily limits. The service includes billing-related database models, but its current runtime dependencies do not invoke a billing provider.

## Safe validation

```sh
pnpm database:generate
pnpm service:api:typecheck
pnpm service:api:build
```

## Operational commands

`pnpm --filter @charity-mono/api run dev` and `start` launch the API and may connect to PostgreSQL and Redis. API-key operations and Fly deployment are operational actions. Only the shared database package may create or deploy migrations; the API Fly release command runs its production migration command.
