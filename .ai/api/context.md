# API context

Express API at `services/api`; `src/server.ts` listens on port 3000. Verified: Prisma validate/generate, typecheck, and build. Startup can access PostgreSQL and Redis. It owns canonical Prisma schema/migrations, API-key verification, Redis rate limits, charity/nearby routes, and PostGIS queries.
