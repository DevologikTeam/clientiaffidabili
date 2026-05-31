#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M21-A_RC_HARDENING_ANALYSIS.md',
  'docs/rc-hardening/01_RELEASE_CANDIDATE_SCOPE_AND_EXIT_CRITERIA.md',
  'docs/rc-hardening/02_BUILD_TYPECHECK_DOCKER_AND_CI_ANALYSIS.md',
  'docs/rc-hardening/03_RUNTIME_CONFIG_ENV_AND_SECRETS_AUDIT.md',
  'docs/rc-hardening/04_DATABASE_MIGRATION_BACKUP_RESTORE_AUDIT.md',
  'docs/rc-hardening/05_SECURITY_PRIVACY_AND_COMPLIANCE_FREEZE_AUDIT.md',
  'docs/rc-hardening/06_PROVIDER_SANDBOX_TO_LIVE_READINESS_AUDIT.md',
  'docs/rc-hardening/07_OBSERVABILITY_ERROR_LEDGER_AND_SUPPORT_AUDIT.md',
  'docs/rc-hardening/08_RC_RISK_REGISTER_AND_RELEASE_BLOCKERS.md',
  'docs/rc-hardening/09_M21P_RC_HARDENING_DESIGN_HANDOFF.md',
  'apps/web/lib/rc-hardening/rc-hardening-analysis.ts',
  'apps/api/src/modules/launch-readiness/rc-hardening-analysis.types.ts',
  'artifacts/rc-hardening/m21a-rc-hardening-baseline.json',
  'docs/releases/0.72.0.md',
  'docs/roadmap/NEXT_5_SPRINTS_AFTER_0_72_0.md',
];

const requiredContent = [
  ['package.json', 'qa:rc-hardening-analysis'],
  ['package.json', 'release:rc-hardening-analysis-check'],
  ['docs/ROADMAP_STATUS.md', 'M21-P RC Hardening Design'],
  ['docs/sprints/M21-A_RC_HARDENING_ANALYSIS.md', 'Build riproducibile'],
  ['docs/sprints/M21-A_RC_HARDENING_ANALYSIS.md', 'Blocchi P0'],
  ['docs/sprints/M21-A_RC_HARDENING_ANALYSIS.md', 'lockfile'],
  ['docs/sprints/M21-A_RC_HARDENING_ANALYSIS.md', 'migrazioni'],
  ['docs/sprints/M21-A_RC_HARDENING_ANALYSIS.md', 'Sandbox certification'],
  ['docs/rc-hardening/02_BUILD_TYPECHECK_DOCKER_AND_CI_ANALYSIS.md', 'docker compose build --no-cache api web'],
  ['docs/rc-hardening/03_RUNTIME_CONFIG_ENV_AND_SECRETS_AUDIT.md', 'ENABLE_DEMO_DATA=false'],
  ['docs/rc-hardening/04_DATABASE_MIGRATION_BACKUP_RESTORE_AUDIT.md', '74 entity TypeORM'],
  ['docs/rc-hardening/08_RC_RISK_REGISTER_AND_RELEASE_BLOCKERS.md', 'RC-P0-001'],
  ['docs/rc-hardening/09_M21P_RC_HARDENING_DESIGN_HANDOFF.md', 'waived_with_feature_off'],
  ['apps/web/lib/rc-hardening/rc-hardening-analysis.ts', 'm21aRcHardeningFindings'],
  ['apps/web/lib/rc-hardening/rc-hardening-analysis.ts', 'rc-p0-lockfile-freeze'],
  ['apps/api/src/modules/launch-readiness/rc-hardening-analysis.types.ts', 'rcHardeningAnalysisGateContracts'],
];

const failures = [];
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const currentVersion = packageJson.version || '';
if (!/^0\.(7[2-9]|[8-9][0-9])\.\d+$/.test(currentVersion)) {
  failures.push(`Package version must be 0.72.0 or newer for M21-A regression QA, found ${currentVersion}.`);
}
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`);
}
for (const [file, needle] of requiredContent) {
  const full = path.join(root, file);
  if (!fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(needle)) failures.push(`Missing content '${needle}' in ${file}`);
}

function walk(dir, predicate, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, files);
    else if (predicate(full, entry.name)) files.push(full);
  }
  return files;
}

const appPageRoutes = walk(path.join(root, 'apps/web/app'), (_, name) => name === 'page.tsx');
if (appPageRoutes.length < 72) failures.push(`Expected at least 72 app page routes, found ${appPageRoutes.length}.`);

const apiEntities = walk(path.join(root, 'apps/api/src/modules'), (_, name) => name.endsWith('.entity.ts'));
if (apiEntities.length < 70) failures.push(`Expected at least 70 API entities, found ${apiEntities.length}.`);

const e2eSpecs = walk(path.join(root, 'tests/e2e'), (_, name) => name.endsWith('.spec.ts'));
if (e2eSpecs.length < 5) failures.push(`Expected at least 5 Playwright specs, found ${e2eSpecs.length}.`);

const workflow = fs.existsSync(path.join(root, '.github/workflows/production-qa.yml'))
  ? fs.readFileSync(path.join(root, '.github/workflows/production-qa.yml'), 'utf8')
  : '';
for (const needle of ['pnpm lint', 'pnpm typecheck', 'pnpm build', 'pnpm e2e:ci']) {
  if (!workflow.includes(needle)) failures.push(`Production QA workflow missing ${needle}`);
}

const compose = ['docker-compose.yml', 'docker-compose.coolify.yml']
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
for (const needle of ['healthcheck', 'http://localhost:3001/health', 'http://localhost:3000']) {
  if (!compose.includes(needle)) failures.push(`Docker compose healthcheck missing ${needle}`);
}

const baselinePath = path.join(root, 'artifacts/rc-hardening/m21a-rc-hardening-baseline.json');
if (fs.existsSync(baselinePath)) {
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  if (baseline.release !== '0.72.0') failures.push('Baseline release must be 0.72.0.');
  if (baseline.metrics.webPageRoutes < 72) failures.push('Baseline must record at least 72 web page routes.');
  if (baseline.metrics.apiEntities < 70) failures.push('Baseline must record at least 70 API entities.');
  if (baseline.metrics.hasPnpmLock !== false) failures.push('M21-A baseline should explicitly record missing pnpm lockfile.');
  if (baseline.metrics.hasApiMigrations !== false) failures.push('M21-A baseline should explicitly record missing API migrations.');
}

const newDocs = requiredFiles
  .filter((file) => file.endsWith('.md') && fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();

const requiredWords = ['build', 'docker', 'coolify', 'playwright', 'migrazioni', 'backup', 'restore', 'sandbox', 'waiver', 'rollback', 'secret', 'security', 'privacy', 'feature flag', 'demo data'];
for (const word of requiredWords) {
  if (!newDocs.includes(word)) failures.push(`M21-A docs missing keyword: ${word}`);
}

const forbiddenClaims = ['rischio zero', 'solvibilita garantita', 'solvibilità garantita', 'pagamento garantito', 'sicuro al 100%', 'infallibile'];
for (const claim of forbiddenClaims) {
  if (newDocs.includes(claim)) failures.push(`Forbidden absolute claim found in M21-A deliverables: ${claim}`);
}

const registry = fs.existsSync(path.join(root, 'apps/web/lib/rc-hardening/rc-hardening-analysis.ts'))
  ? fs.readFileSync(path.join(root, 'apps/web/lib/rc-hardening/rc-hardening-analysis.ts'), 'utf8')
  : '';
const findingIds = Array.from(registry.matchAll(/id: "([^"]+)"/g)).map((match) => match[1]);
for (const requiredId of ['rc-p0-build-real-target', 'rc-p0-lockfile-freeze', 'rc-p0-database-migrations', 'rc-p0-provider-sandbox-real', 'rc-p0-browser-e2e-real', 'rc-p0-demo-data-production-guard']) {
  if (!findingIds.includes(requiredId)) failures.push(`Missing RC hardening finding: ${requiredId}`);
}
if ((registry.match(/blocksRc: true/g) || []).length < 6) failures.push('Expected at least 6 blocking P0 findings in registry.');

if (failures.length) {
  console.error('M21-A RC hardening analysis QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`M21-A RC hardening analysis QA passed (${appPageRoutes.length} routes, ${apiEntities.length} entities, ${e2eSpecs.length} e2e specs).`);
