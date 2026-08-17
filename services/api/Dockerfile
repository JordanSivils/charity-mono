FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY shared/database/package.json shared/database/package.json
COPY services/api/package.json services/api/package.json

RUN pnpm install --frozen-lockfile --filter @charity-mono/api...

COPY shared/database shared/database
COPY services/api services/api

ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

RUN pnpm database:generate
RUN pnpm --filter @charity-mono/api run build

EXPOSE 3000

WORKDIR /app/services/api

CMD ["pnpm", "start"]
