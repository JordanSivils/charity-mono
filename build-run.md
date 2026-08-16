# Local operational runbook

This file is the restart point for the local data workflows. The two commands below rebuild their package before executing its primary workflow, so they are safe to use after source changes or a fresh checkout.

## Before any operational run

- Run from the repository root with dependencies installed: `pnpm install --frozen-lockfile`.
- Confirm the package-local `.env` contains the intended, non-production `DATABASE_URL`:
  - `tools/local/irs-data-import/.env`
  - `tools/local/geocode-worker/.env`
- Confirm the target database has the canonical API schema and migrations from `services/api/prisma`. Never apply the historical migrations under `tools/local/irs-data-import/prisma` to prepare a database.
- Do not run the importer and geocode worker at the same time. Run an import to completion first, then geocode the records it produced.
- These are live operational workflows, not dry runs. They can download data, call the Census service, use PostgreSQL `COPY`, merge records, and clear staging tables. Check the terminal output to completion before leaving the run unattended.

## IRS data import

```sh
pnpm tool:irs-import:run
```

This runs the importer's main function: it iterates over `tools/local/irs-data-import/src/json/states.json`, loads each configured IRS source into `CharityStaging`, calls `public.insert_charity_to_final()`, and clears staging after each source.

Rules specific to this workflow:

- The source list in `states.json` is the run scope; review it before starting.
- The current stream parser limits each source to 400 rows (`maxRows: 400`). This makes it suitable for local testing, not a complete IRS import.
- Do not use the package's retained Prisma schema, migration history, or `sql.txt` as the database authority.

## Census geocode worker

```sh
pnpm tool:geocode:run
```

This runs the worker's main function. It repeatedly selects up to 5,999 charities with `geocode_status = 11`, submits each batch to the Census batch geocoder, applies results through `public.apply_census_geocodes()`, and stops only when no eligible charities remain.

Rules specific to this workflow:

- Expect an external Census request for every batch and a two-second pause between batches.
- It processes only normal-address records at status `11`; PO-box records at status `21` require the separate fallback-geocode workflow and are not handled by this command.
- Ensure the canonical database migrations defining `GeocodeStaging`, `FallbackGeocodes`, and `public.apply_census_geocodes()` have been applied before running it.
- The worker writes transient CSVs under its `src/` tree. They are regenerated per batch and should not be committed.

## Non-operational checks

```sh
pnpm tool:irs-import:typecheck
pnpm tool:geocode:typecheck
```

These checks compile types only and do not connect to the database, download data, or call Census.
