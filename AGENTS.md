# Repository guidelines

1. Folder and package names use kebab-case.
2. Name projects for business responsibility, not framework or deployment mechanism.
3. Do not combine Prisma schemas, generated clients, or migration histories without an explicit migration plan.
4. Do not execute migrations, ETL jobs, geocoding jobs, seeds, or destructive database commands against production during repository setup.
5. When a data field changes, inspect source ingestion, staging, canonical database models, database functions, API serialization, documentation, consuming applications, tests, and fixtures.
6. Preserve package-local environment behavior until a deliberate environment strategy is documented.
7. Keep transport changes separate from refactors.
8. Extract shared packages only after working duplication and ownership boundaries are understood.
9. `services/irs-data-upload` is currently expected to use AWS SAM and Lambda, but is named for its responsibility rather than its hosting technology.
10. `tools/local/geocode-worker` is a locally run batch worker that reads database records, sends addresses to the external batch geocoding service, receives a CSV result, and submits that result through database processing.
11. `tools/local/irs-data-import` is the local testing and troubleshooting counterpart to the deployed IRS data-upload/import behavior.
