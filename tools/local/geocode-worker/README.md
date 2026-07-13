# Geocode worker

This is a locally operated batch geocoding worker. It selects eligible charity addresses from the database, writes a batch CSV, submits it to the external Census batch geocoding service, receives a CSV response, and submits that response through database processing.

## Environment

Set `DATABASE_URL` to the PostgreSQL connection string for the intended environment. Copy `.env.example` to `.env` locally; never commit credentials.

## Safe local commands

```sh
pnpm tool:geocode:typecheck
pnpm tool:geocode:build
```

The package also contains operational commands for exporting batches, submitting them for geocoding, processing results, seeding ZIP fallbacks, and running the full workflow. Do not run those commands casually: they may call an external service and update database records.
