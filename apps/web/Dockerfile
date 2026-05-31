FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS prod-deps
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --prod --filter @clientiaffidabili/web... --frozen-lockfile=false

FROM base AS builder
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --filter @clientiaffidabili/web... --frozen-lockfile=false
COPY . .
# .dockerignore excludes host node_modules/.next so pnpm bin shims and Next trace output are produced inside Linux.
RUN test -f /app/apps/web/node_modules/next/dist/bin/next && pnpm --filter @clientiaffidabili/web build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_PATH=/app/node_modules:/app/apps/web/node_modules
COPY --from=builder /app/apps/web/.next/standalone ./
# Runtime fallback for monorepo standalone output that still resolves next from /app/server.js.
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/apps/web/node_modules ./apps/web/node_modules
# Shared workspace package has no required runtime node_modules; copying that optional path breaks Docker when pnpm does not create it.
RUN set -eux;   mkdir -p /app/node_modules;   for pkg in next react react-dom styled-jsx; do     target="/app/node_modules/$pkg";     source="/app/apps/web/node_modules/$pkg";     if [ -L "$target" ] && [ ! -e "$target" ]; then       rm -f "$target";     fi;     if [ ! -e "$target" ] && [ -e "$source" ]; then       ln -s "$source" "$target";     fi;   done;   node -e "console.log(require.resolve('next'))"
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/public ./public
EXPOSE 3000
CMD ["sh", "-c", "echo NODE_PATH=$NODE_PATH; node -e \"console.log('next resolved:', require.resolve('next'))\"; if [ -f apps/web/server.js ]; then node apps/web/server.js; elif [ -f server.js ]; then node server.js; else echo 'Next standalone server.js not found. Available server.js files:'; find /app -maxdepth 5 -name server.js -print; exit 1; fi"]
