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

## Database ownership

- `services/api/prisma/schema.prisma` is the canonical source of truth for the PostgreSQL database model.
- `services/api/prisma/migrations` is the canonical migration history.
- Database artifacts found in other workspaces are temporary historical copies or operational references unless explicitly documented otherwise.
- Do not treat the Prisma schema or migrations under `tools/local/irs-data-import` as authoritative.
- Do not independently update duplicate Prisma schemas outside `services/api`.
- When database structure changes, begin with the canonical API Prisma schema and migration history, then inspect and update all dependent SQL, ingestion mappings, geocoding workflows, API serialization, documentation, tests, and consuming applications.
- `services/irs-data-upload`, `tools/local/irs-data-import`, and `tools/local/geocode-worker` are consumers of the canonical database contract.
- Direct-SQL consumers must be checked for COPY column order, staging-table assumptions, database-function signatures, nullability, enums, and field names whenever the canonical schema changes.

## Known temporary database artifacts

- `tools/local/irs-data-import/prisma` is an older historical schema and migration chain.
- `tools/local/irs-data-import/sql.txt` may be an older reference version of the database merge function.
- Preserve these during the initial transport phase for comparison, but do not use them to determine current database behavior.
