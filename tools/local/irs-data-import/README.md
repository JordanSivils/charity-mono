# IRS data import

This is the local testing and troubleshooting runner for the IRS charity data-import workflow. It streams configured IRS CSV sources, normalizes records, loads `CharityStaging` with PostgreSQL `COPY`, calls the database merge function, and clears staging. It also retains local CSV-based Census geocoding helpers for troubleshooting.

## Inputs and database responsibilities

The primary importer reads the state URLs in `src/json/states.json`. The optional local geocoding flow uses CSV files under `src/from-stream/`; those generated batch and result files are intentionally not committed. The package preserves its own Prisma schema and migration history in `prisma/`, plus the database-function reference in `sql.txt`. Do not apply or reconcile those migrations during routine use.

## Environment

Set `DATABASE_URL` to the PostgreSQL connection string for the intended environment. Copy `.env.example` to `.env` locally and do not commit credentials.

## Safe validation

```sh
pnpm tool:irs-import:typecheck
pnpm tool:irs-import:build
```

## Operational commands

The package's `start`, `from-stream`, `geocode`, and `geo-to-pg` scripts are operational. They may download IRS data, call the Census service, use `COPY`, invoke database functions, truncate staging data, or otherwise mutate database records. Do not run them casually.

## Relationship to the deployed upload service

`services/irs-data-upload` is the deployed counterpart of this importer. Both implementations are intentionally being transported without consolidation or refactoring in this phase.
