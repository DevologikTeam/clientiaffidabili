#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const failures = [];
const warnings = [];

function read(file) {
  const abs = path.join(root, file);
  return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
}
function parseJson(file) {
  try { return JSON.parse(read(file) || '{}'); }
  catch (error) { failures.push(`Invalid JSON ${file}: ${error.message}`); return {}; }
}
function requireToken(file, source, token, message) {
  if (!source.includes(token)) failures.push(`${message || 'Missing required token'} in ${file}: ${token}`);
}

const apiDockerfilePath = 'apps/api/Dockerfile';
const webDockerfilePath = 'apps/web/Dockerfile';
const apiDockerfile = read(apiDockerfilePath);
const webDockerfile = read(webDockerfilePath);
const apiPackage = parseJson('apps/api/package.json');
const webPackage = parseJson('apps/web/package.json');
const sharedPackage = parseJson('packages/shared/package.json');

const dockerignore = read('.dockerignore');
if (!dockerignore) {
  failures.push('Missing .dockerignore. Docker build context must exclude host node_modules/.next/dist to prevent broken pnpm bin shims inside Linux builders.');
} else {
  for (const token of ['node_modules', '**/node_modules', '.next', '**/.next', 'dist', '**/dist', '*.tsbuildinfo']) {
    if (!dockerignore.includes(token)) failures.push(`.dockerignore must include ${token} to keep host artifacts out of Docker build context.`);
  }
}

if (!apiDockerfile) failures.push(`Missing ${apiDockerfilePath}`);
if (!webDockerfile) failures.push(`Missing ${webDockerfilePath}`);

// API runtime dependency guard: Nest main imports reflect-metadata at runtime, so runner must install/copy production deps safely.
const apiMain = read('apps/api/src/main.ts');
if (apiMain.includes("import 'reflect-metadata'")) {
  const deps = { ...(apiPackage.dependencies || {}) };
  if (!deps['reflect-metadata']) failures.push('apps/api/src/main.ts imports reflect-metadata but apps/api/package.json dependencies does not include it.');
  requireToken(apiDockerfilePath, apiDockerfile, 'FROM base AS prod-deps', 'API Dockerfile must have a dedicated production dependency stage');
  requireToken(apiDockerfilePath, apiDockerfile, 'pnpm install --prod --filter @clientiaffidabili/api...', 'API Dockerfile runner dependencies must be installed with --prod for runtime modules such as reflect-metadata');
  requireToken(apiDockerfilePath, apiDockerfile, 'COPY --from=prod-deps /app/node_modules /app/node_modules', 'API runner must copy root pnpm node_modules store from prod-deps');
  requireToken(apiDockerfilePath, apiDockerfile, 'COPY --from=prod-deps /app/apps/api/node_modules ./node_modules', 'API runner must copy app-level pnpm symlinks from prod-deps');
  if (/COPY --from=builder \/app\/apps\/api\/node_modules \.\/node_modules/.test(apiDockerfile)) {
    failures.push('API runner copies builder apps/api/node_modules directly into ./node_modules. This can ship broken pnpm symlinks and recreate MODULE_NOT_FOUND reflect-metadata. Use prod-deps instead.');
  }
}


// Source-only workspace packages may not have node_modules in prod-deps. COPY from a missing optional path fails Docker checksum before the image is built.
for (const [file, source] of [[apiDockerfilePath, apiDockerfile], [webDockerfilePath, webDockerfile]]) {
  if (source.includes('COPY --from=prod-deps /app/packages/shared/node_modules')) {
    failures.push(`${file} must not copy /app/packages/shared/node_modules from prod-deps because the shared package can be source-only and pnpm will not always create that path.`);
  }
  if (source.includes('COPY --from=deps /app/packages/shared/node_modules')) {
    failures.push(`${file} must not copy /app/packages/shared/node_modules from deps because the shared package can be source-only and Docker COPY fails when the path is absent.`);
  }
}


// Docker builder dependency guard: copying pnpm node_modules from another stage can leave package bin shims
// pointing at missing files inside /app/apps/*/node_modules. Install dependencies in the builder stage
// before COPY . . so `nest build` and `next build` resolve their CLI binaries inside the same filesystem.
for (const [file, source, appName, filter] of [
  [apiDockerfilePath, apiDockerfile, 'apps/api', '@clientiaffidabili/api...'],
  [webDockerfilePath, webDockerfile, 'apps/web', '@clientiaffidabili/web...'],
]) {
  const builderMatch = source.match(/FROM base AS builder([\s\S]*?)(?:\nFROM |$)/);
  const builder = builderMatch ? builderMatch[1] : '';
  if (!builder.includes(`RUN pnpm install --filter ${filter} --frozen-lockfile=false`)) {
    failures.push(`${file} builder must run pnpm install --filter ${filter} inside the builder stage before building, instead of relying on copied pnpm node_modules symlinks.`);
  }
  if (!builder.includes(`COPY ${appName}/package.json ${appName}/package.json`)) {
    failures.push(`${file} builder must copy ${appName}/package.json before pnpm install for Docker layer caching and stable CLI binary resolution.`);
  }
  if (!builder.includes('COPY packages/shared/package.json packages/shared/package.json')) {
    failures.push(`${file} builder must copy packages/shared/package.json before pnpm install so workspace dependency resolution is stable.`);
  }
  if (/COPY --from=deps \/app\/node_modules \.\/node_modules/.test(builder) || /COPY --from=deps \/app\/apps\/(api|web)\/node_modules/.test(builder)) {
    failures.push(`${file} builder must not copy pnpm node_modules from a deps stage. Docker COPY can preserve app-level bin shims that point at missing package files and cause MODULE_NOT_FOUND for nest/next during build.`);
  }
  if (appName === 'apps/api' && !builder.includes('test -f /app/apps/api/node_modules/@nestjs/cli/bin/nest.js')) {
    failures.push(`${file} builder must verify the Nest CLI target exists after install and before build. This catches host node_modules overwrite or broken pnpm shims before running nest build.`);
  }
  if (appName === 'apps/web' && !builder.includes('test -f /app/apps/web/node_modules/next/dist/bin/next')) {
    failures.push(`${file} builder must verify the Next CLI target exists after install and before build. This catches host node_modules overwrite or broken pnpm shims before running next build.`);
  }
}

// Shared workspace package guard used by prod deps.
if (apiDockerfile.includes('@clientiaffidabili/api...') || webDockerfile.includes('@clientiaffidabili/web...')) {
  if (sharedPackage.name !== '@clientiaffidabili/shared') failures.push('packages/shared/package.json must keep name @clientiaffidabili/shared.');
  requireToken(apiDockerfilePath, apiDockerfile, 'COPY packages/shared/package.json packages/shared/package.json', 'API Dockerfile must include shared package manifest before workspace install');
  requireToken(webDockerfilePath, webDockerfile, 'COPY packages/shared/package.json packages/shared/package.json', 'Web Dockerfile must include shared package manifest before workspace install');
}

// Next standalone guard: Next may emit server.js either at standalone root or apps/web/server.js depending on output tracing root.
const nextConfig = read('apps/web/next.config.mjs');
if (nextConfig.includes("output: 'standalone'") || nextConfig.includes('output: "standalone"')) {
  requireToken(webDockerfilePath, webDockerfile, 'COPY --from=builder /app/apps/web/.next/standalone ./', 'Web runner must copy Next standalone output');
  requireToken(webDockerfilePath, webDockerfile, 'FROM base AS prod-deps', 'Web Dockerfile must have a dedicated production dependency stage');
  requireToken(webDockerfilePath, webDockerfile, 'pnpm install --prod --filter @clientiaffidabili/web...', 'Web Dockerfile runner dependencies must be installed with --prod for runtime modules such as next');
  requireToken(webDockerfilePath, webDockerfile, 'COPY --from=prod-deps /app/node_modules ./node_modules', 'Web runner must copy root pnpm node_modules from prod-deps so root standalone server.js can require next');
  requireToken(webDockerfilePath, webDockerfile, 'COPY --from=prod-deps /app/apps/web/node_modules ./apps/web/node_modules', 'Web runner must copy app-level pnpm node_modules symlinks from prod-deps for monorepo standalone runtime');
  requireToken('apps/web/next.config.mjs', nextConfig, 'NEXT_DISABLE_STANDALONE', 'Web Next config must support disabling standalone for local Windows preflight builds');
  requireToken('apps/web/next.config.mjs', nextConfig, 'experimental:', 'Web Next config must place outputFileTracingRoot under experimental for Next 14');
  requireToken('apps/web/next.config.mjs', nextConfig, 'outputFileTracingRoot', 'Web Next config must set outputFileTracingRoot for monorepo standalone tracing');
  if (/const\s+nextConfig\s*=\s*\{[\s\S]*?\n\s{2}outputFileTracingRoot\s*:/m.test(nextConfig)) {
    failures.push('apps/web/next.config.mjs must not define outputFileTracingRoot as a top-level config key; Next 14 rejects it. Put it under experimental.outputFileTracingRoot.');
  }
  requireToken(webDockerfilePath, webDockerfile, 'ENV NODE_PATH=/app/node_modules:/app/apps/web/node_modules', 'Web runner must set NODE_PATH so /app/server.js can resolve next from both root and app node_modules');
  requireToken(webDockerfilePath, webDockerfile, 'if [ -L "$target" ] && [ ! -e "$target" ]; then', 'Web runner must remove broken root package symlinks before linking app-level next/react packages');
  requireToken(webDockerfilePath, webDockerfile, 'ln -s "$source" "$target"', 'Web runner must link app-level next/react packages into root node_modules for root standalone server.js');
  if (webDockerfile.includes('ln -s "../apps/web/node_modules/$pkg" "/app/node_modules/$pkg"')) {
    failures.push('Web Dockerfile uses a non-idempotent ln -s command that can fail with ln: File exists when the target is a broken symlink. Use target/source variables and remove broken symlinks first.');
  }
  requireToken(webDockerfilePath, webDockerfile, "require.resolve(\'next\')", 'Web runner must verify at build/start time that next can be resolved before starting server.js');
  requireToken(webDockerfilePath, webDockerfile, 'if [ -f apps/web/server.js ]; then node apps/web/server.js; elif [ -f server.js ]; then node server.js;', 'Web runner must support both monorepo and root standalone server.js paths');
  requireToken(webDockerfilePath, webDockerfile, 'find /app -maxdepth 5 -name server.js -print', 'Web runner must print diagnostic server.js paths before exiting');
  requireToken(webDockerfilePath, webDockerfile, 'ENV PORT=3000', 'Web runner must set PORT=3000 for Next standalone');
  requireToken(webDockerfilePath, webDockerfile, 'ENV HOSTNAME=0.0.0.0', 'Web runner must bind Next standalone on all interfaces');
  requireToken(webDockerfilePath, webDockerfile, 'COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static', 'Web runner must copy static assets for monorepo standalone path');
  requireToken(webDockerfilePath, webDockerfile, 'COPY --from=builder /app/apps/web/.next/static ./.next/static', 'Web runner must copy static assets for root standalone path');
  requireToken(webDockerfilePath, webDockerfile, 'COPY --from=builder /app/apps/web/public ./apps/web/public', 'Web runner must copy public assets for monorepo standalone path');
  requireToken(webDockerfilePath, webDockerfile, 'COPY --from=builder /app/apps/web/public ./public', 'Web runner must copy public assets for root standalone path');
  if (webDockerfile.includes('CMD ["node", "apps/web/server.js"]')) {
    failures.push('Web Dockerfile hardcodes apps/web/server.js. This recreates runtime MODULE_NOT_FOUND when Next emits standalone/server.js at root.');
  }
}

const composeFiles = ['docker-compose.yml', 'docker-compose.coolify.yml'];
for (const file of composeFiles) {
  const compose = read(file);
  if (!compose) continue;
  if (compose.includes('dockerfile: apps/web/Dockerfile') && !webDockerfile.includes('if [ -f apps/web/server.js ]')) {
    failures.push(`${file} builds apps/web/Dockerfile, but that Dockerfile lacks the robust Next standalone start command.`);
  }
  if (compose.includes('dockerfile: apps/api/Dockerfile') && !apiDockerfile.includes('FROM base AS prod-deps')) {
    failures.push(`${file} builds apps/api/Dockerfile, but that Dockerfile lacks the prod-deps runtime dependency stage.`);
  }
  if (file === 'docker-compose.coolify.yml' && compose.includes('DATABASE_URL') && !compose.includes('DATABASE_SYNCHRONIZE')) {
    failures.push(`${file} must expose DATABASE_SYNCHRONIZE so local Coolify preflight can create schema on an empty Postgres volume while production can keep it false.`);
  }
  if (compose.includes('dockerfile: apps/web/Dockerfile') && !compose.includes('http://127.0.0.1:3000/healthz')) {
    failures.push(`${file} web healthcheck must target the dedicated Next health route http://127.0.0.1:3000/healthz instead of the public home page.`);
  }
  if (compose.includes('dockerfile: apps/web/Dockerfile') && compose.includes('wget -qO- http://localhost:3000')) {
    failures.push(`${file} web healthcheck must not rely on wget against the homepage; use node fetch against /healthz.`);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  guardedRuntimeErrors: [
    'API container must not restart with MODULE_NOT_FOUND reflect-metadata',
    'API runner must install/copy production pnpm dependencies instead of relying on builder node_modules symlinks',
    'Web container must not restart with MODULE_NOT_FOUND /app/apps/web/server.js',
    'Web container must not restart with MODULE_NOT_FOUND next from /app/server.js',
    'Web root standalone server.js must have next resolvable at /app/node_modules or through NODE_PATH',
    'Web runner must support both root and monorepo Next standalone server.js locations',
    'Next standalone static/public assets must be copied for both possible runtime layouts',
    'Web runner symlink fix must be idempotent and must not fail with ln: File exists',
    'Local Windows preflight must not run standalone build that fails with EPERM symlink',
    'Docker builder must not copy pnpm node_modules from another stage and then fail with MODULE_NOT_FOUND for nest/next CLI binaries',
    'Docker build context must exclude host node_modules/.next/dist so COPY . . cannot overwrite Linux pnpm shims with Windows artifacts',
    'Coolify preflight must not crash API on missing platform_settings table in an empty local Postgres volume',
    'Web container healthcheck must target /healthz with Node fetch and not the public homepage via wget'
  ],
  scanned: {
    apiDockerfileBytes: apiDockerfile.length,
    webDockerfileBytes: webDockerfile.length,
    apiHasReflectMetadataDependency: Boolean((apiPackage.dependencies || {})['reflect-metadata']),
    webUsesStandalone: nextConfig.includes('standalone'),
  },
  warnings,
  failures,
};
fs.mkdirSync(path.join(root, 'artifacts/qa'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/qa/docker-runtime-static-guards-latest.json'), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error('Docker runtime static guards QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Docker runtime static guards QA passed.');
if (warnings.length) for (const warning of warnings) console.warn(`Warning: ${warning}`);
