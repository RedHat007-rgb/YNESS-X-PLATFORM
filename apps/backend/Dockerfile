# Base
FROM node:18-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

#Builder

FROM base AS builder
WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN mkdir -p /app/out
RUN pnpm turbo prune --docker --scope=api --out-dir=/app/out

#Installer

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ ./
RUN pnpm install --frozen-lockfile --prod=false
COPY --from=builder /app/out/full/ ./
RUN pnpm --filter backend run build


#Runtime
FROM node:20-slim AS runtime
WORKDIR /app
RUN npm install -g pnpm
COPY --from=installer /app/apps/backend/dist  ./dist
COPY --from=installer /app/apps/backend/package.json ./package.json
COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --prod
CMD ["node","dist/main.js"]


