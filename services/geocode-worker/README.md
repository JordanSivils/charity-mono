# Geocode worker service

This is the production-support Census batch geocoding worker. It is operated from this machine, selects eligible charity addresses from the configured database, writes a batch CSV, submits it to the external Census batch geocoding service, receives a CSV response, and submits that response through database processing.

## Environment

Set `DATABASE_URL` to the PostgreSQL connection string for the intended environment. Copy `.env.example` to `.env` in this service directory; never commit credentials. This service's `.env` may point at production independently from the local API and troubleshooting-worker `.env` files.

## Safe local commands

```sh
pnpm service:geocode:typecheck
pnpm service:geocode:build
```

The package also contains operational commands for exporting batches, submitting them for geocoding, processing results, seeding ZIP fallbacks, and running the full workflow. Do not run those commands casually: they may call an external service and update database records.
