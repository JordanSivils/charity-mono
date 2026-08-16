# Database contract

This package is the single owner of the charity platform Prisma schema, migration history, generated client, and manual database operations. Applications import its generated client through `@charity-mono/database/client` while retaining their own connection strings and Prisma adapters.

Copy `.env.example` to `.env` when running local database commands, or provide `DATABASE_URL` explicitly. Do not use `db push` or create migrations from historical schemas elsewhere in the monorepo. Only the API release workflow runs `prisma:migrate:deploy` against production.
