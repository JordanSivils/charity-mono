# CharityQuery monorepo

CharityQuery was a fully functioning production charity data platform with a public API that was available for around a year. This repository is preserved as a portfolio and reference project. The hosted application and its supporting services have been shut down; the example URLs and integrations in the source describe the former deployment.

## Getting started

Use Node.js 24 (see `.nvmrc`) and pnpm 10.26.2. From the repository root:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm typecheck
```

The code can be installed and typechecked without production credentials. Running the full application requires configuring replacement services, including Clerk, PostgreSQL and Redis. Billing, contact email and the data import workflows require additional integrations. See the package READMEs and `.env.example` files for details; never commit credentials or run operational data workflows against a database you do not intend to modify.

- `apps/platform-web`: web application and API documentation.
- `services/api`: charity search API.
- `services/irs-data-upload`: IRS data import for AWS Lambda.
- `services/geocode-worker`: Census geocoding worker.
- `shared/database`: canonical database schema, migrations and Prisma client.
- `tools/local`: local import and geocoding tools.

CI validates affected packages; it does not deploy the project.
