FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS builder
COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --filter @clientiaffidabili/api... --frozen-lockfile=false
COPY . .
# .dockerignore excludes host node_modules so pnpm bin shims created in this Linux stage stay valid.
RUN test -f /app/apps/api/node_modules/@nestjs/cli/bin/nest.js && pnpm --filter @clientiaffidabili/api build

FROM base AS prod-deps
COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/shared/src packages/shared/src
RUN pnpm install --prod --filter @clientiaffidabili/api... --frozen-lockfile=false

FROM node:20-alpine AS runner
WORKDIR /app/apps/api
ENV NODE_ENV=production
ENV PORT=3001
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/apps/api/node_modules ./node_modules
COPY --from=prod-deps /app/packages/shared /app/packages/shared
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
EXPOSE 3001
CMD ["node", "dist/main.js"]
