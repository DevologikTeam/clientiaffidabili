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
function requireFile(file) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing ${file}`);
}
function requireToken(file, token, message) {
  const src = read(file);
  if (!src.includes(token)) failures.push(`${message || 'Missing required token'} in ${file}: ${token}`);
}
function parseJson(file) {
  try { return JSON.parse(read(file) || '{}'); }
  catch (error) { failures.push(`Invalid JSON ${file}: ${error.message}`); return {}; }
}

const sh = 'scripts/coolify-preflight.sh';
const ps1 = 'scripts/coolify-preflight.ps1';
const docs = 'docs/deployment/COOLIFY_PREFLIGHT.md';
requireFile(sh);
requireFile(ps1);
requireFile(docs);

for (const file of [sh, ps1]) {
  requireToken(file, 'pnpm --filter @clientiaffidabili/api build', 'Preflight must build API before Docker');
  requireToken(file, 'pnpm --filter @clientiaffidabili/web build', 'Preflight must build web before Docker');
  requireToken(file, 'NEXT_DISABLE_STANDALONE=1', 'Preflight local web build must disable Next standalone to avoid Windows symlink EPERM; Docker build still validates standalone in Linux');
  requireToken(file, 'docker compose', 'Preflight must use Docker Compose');
  requireToken(file, 'build --no-cache api web', 'Preflight must force a no-cache build for api and web');
  requireToken(file, 'up -d', 'Preflight must start services after building');
  requireToken(file, 'logs --tail=200 api web', 'Preflight must collect api/web logs for debugging');
  requireToken(file, 'artifacts/qa/coolify-preflight-latest', 'Preflight must write QA artifacts');
  requireToken(file, 'pnpm install --frozen-lockfile=false', 'Preflight must install workspace dependencies before build when node_modules is missing');
  requireToken(file, 'DATABASE_SYNCHRONIZE', 'Preflight must enable DATABASE_SYNCHRONIZE for ephemeral local Postgres schema creation');
  requireToken(file, 'HEALTH_CHECK_MODE', 'Preflight must support host/container/both health modes');
  requireToken(file, 'exec -T', 'Preflight must be able to check health from inside api/web containers');
  requireToken(file, 'PREFLIGHT_TARGET', 'Preflight must support local and strict/Coolify-like targets');
}

for (const file of [sh, ps1]) {
  const src = read(file);
  const installIndex = src.indexOf('pnpm install --frozen-lockfile=false');
  const apiBuildIndex = src.indexOf('pnpm --filter @clientiaffidabili/api build');
  const webBuildIndex = src.indexOf('pnpm --filter @clientiaffidabili/web build');
  if (installIndex === -1 || apiBuildIndex === -1 || installIndex > apiBuildIndex) failures.push(`${file} must install dependencies before the API build step.`);
  if (installIndex === -1 || webBuildIndex === -1 || installIndex > webBuildIndex) failures.push(`${file} must install dependencies before the web build step.`);
  if (!src.includes('SKIP_INSTALL')) failures.push(`${file} must support SKIP_INSTALL=1 for CI environments that install dependencies separately.`);
  if (!src.includes('DATABASE_SYNCHRONIZE') || !src.includes('true')) failures.push(`${file} must enable DATABASE_SYNCHRONIZE=true for local preflight so empty Postgres volumes create TypeORM tables before runtime seeders.`);
  if (!src.includes('HEALTH_CHECK_MODE') || !src.includes('both')) failures.push(`${file} must support both host and container health checks so local preflight verifies browser reachability and container readiness.`);
  if (!src.includes('docker-compose.yml')) failures.push(`${file} must default local/browser preflight to docker-compose.yml so ports 3000/3001 are reachable from the host.`);
  if (!src.includes('docker-compose.coolify.yml')) failures.push(`${file} must keep a strict Coolify-like mode using docker-compose.coolify.yml.`);
}
requireToken(sh, 'docker-compose.yml', 'Bash preflight must default to the local compose file for browser reachability');
requireToken(ps1, 'docker-compose.yml', 'PowerShell preflight must default to the local compose file for browser reachability');
requireToken(sh, 'docker-compose.coolify.yml', 'Bash preflight must retain strict Coolify-like compose support');
requireToken(ps1, 'docker-compose.coolify.yml', 'PowerShell preflight must retain strict Coolify-like compose support');
requireToken(docs, 'pnpm qa:coolify-preflight', 'Docs must expose the one-command preflight');
requireToken(docs, 'docker compose -f docker-compose.yml build --no-cache api web', 'Docs must document the local no-cache Docker build');
requireToken(docs, 'qa:coolify-preflight:strict', 'Docs must document strict Coolify-like preflight mode');
requireToken(docs, 'DATABASE_SYNCHRONIZE=true', 'Docs must explain local preflight schema synchronization for empty Postgres volumes');
requireToken(docs, 'HEALTH_CHECK_MODE=both', 'Docs must document host+container health mode for local preflight');
requireToken(docs, 'http://localhost:3000', 'Docs must explain that the default preflight leaves the web app reachable from the host browser');
requireToken(docs, 'relation "platform_settings" does not exist', 'Docs must mention the runtime DB schema failure this preflight setting prevents');

for (const file of [sh, ps1]) {
  const src = read(file);
  if (!src.includes('http://127.0.0.1:3000/healthz')) failures.push(`${file} must check the dedicated web health route /healthz from inside the web container.`);
  if (!src.includes('fetch(process.argv[1])')) failures.push(`${file} must use Node fetch for container health checks instead of relying on wget being available in runtime images.`);
}
requireFile('apps/web/app/healthz/route.ts');
requireToken('apps/web/app/healthz/route.ts', 'clientiaffidabili-web', 'Web health route must return service identity.');

const dockerignore = read('.dockerignore');
if (!dockerignore.includes('**/node_modules')) failures.push('Coolify preflight requires .dockerignore to exclude **/node_modules before Docker build.');
if (!dockerignore.includes('**/.next')) failures.push('Coolify preflight requires .dockerignore to exclude **/.next before Docker build.');

const packageJson = parseJson('package.json');
const scripts = packageJson.scripts || {};
if (scripts['qa:coolify-preflight:static-guards'] !== 'node scripts/qa-coolify-preflight-static-guards.js') failures.push('package.json must expose qa:coolify-preflight:static-guards.');
if (!scripts['qa:coolify-preflight'] || !scripts['qa:coolify-preflight'].includes('scripts/coolify-preflight.sh')) failures.push('package.json must expose qa:coolify-preflight bash command.');
if (!scripts['qa:coolify-preflight:local'] || !scripts['qa:coolify-preflight:local'].includes('scripts/coolify-preflight.sh')) failures.push('package.json must expose qa:coolify-preflight:local command.');
if (!scripts['qa:coolify-preflight:strict'] || !scripts['qa:coolify-preflight:strict'].includes('COOLIFY_PREFLIGHT_TARGET=strict')) failures.push('package.json must expose qa:coolify-preflight:strict command.');
if (!scripts['qa:coolify-preflight:ps1'] || !scripts['qa:coolify-preflight:ps1'].includes('scripts/coolify-preflight.ps1')) failures.push('package.json must expose qa:coolify-preflight:ps1 command.');
if (!scripts['release:pre-zip-check'] || !scripts['release:pre-zip-check'].includes('qa-coolify-preflight-static-guards.js')) failures.push('release:pre-zip-check must include the Coolify preflight static guard.');

const workflow = read('.github/workflows/production-qa.yml');
if (workflow) {
  if (!workflow.includes('qa-coolify-preflight-static-guards.js')) warnings.push('production-qa workflow should include qa-coolify-preflight-static-guards.js.');
}

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  guardedPreflight: [
    'pnpm install when node_modules is missing',
    'pnpm API build before Docker',
    'pnpm web build before Docker',
    'local web build disables Next standalone to avoid Windows symlink EPERM',
    'Coolify compose no-cache api/web build',
    'Docker build context excludes host node_modules and .next artifacts',
    'Docker Compose up and ps inspection',
    'Local preflight publishes host ports and verifies browser reachability',
    'Strict preflight keeps Coolify-like compose without host port assumptions',
    'API and web health checks from inside containers',
    'Web health checks target dedicated /healthz route using Node fetch instead of wget/root page',
    'DATABASE_SYNCHRONIZE=true for empty local preflight database schema creation',
    'HEALTH_CHECK_MODE=both validates both container and host endpoints in local mode',
    'api/web logs captured for debugging',
  ],
  warnings,
  failures,
};
fs.mkdirSync(path.join(root, 'artifacts/qa'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/qa/coolify-preflight-static-guards-latest.json'), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error('Coolify preflight static guards QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Coolify preflight static guards QA passed.');
for (const warning of warnings) console.warn(`Warning: ${warning}`);
