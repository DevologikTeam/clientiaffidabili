#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const read = (file) => fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), 'utf8') : '';
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];

const requiredFiles = [
  'docs/sprints/M21-S_RC_HARDENING_DEVELOPMENT.md',
  'docs/rc-hardening/18_RC_HARDENING_RUNTIME_IMPLEMENTATION.md',
  'docs/rc-hardening/19_RC_GATE_RUNNER_AND_EVIDENCE_BUNDLE_RUNTIME.md',
  'docs/rc-hardening/20_BUILD_DEPENDENCY_ENV_GUARDS_RUNTIME.md',
  'docs/rc-hardening/21_DATABASE_PROVIDER_E2E_BLOCKERS_RUNTIME.md',
  'docs/rc-hardening/22_OBSERVABILITY_SUPPORT_RUNBOOK_RUNTIME.md',
  'docs/rc-hardening/23_M22A_PILOT_LAUNCH_HANDOFF.md',
  'apps/web/lib/rc-hardening/rc-hardening-runtime.ts',
  'apps/api/src/modules/launch-readiness/rc-hardening-runtime.types.ts',
  'apps/api/src/modules/launch-readiness/rc-hardening.service.ts',
  'apps/web/app/admin/launch-readiness/rc-hardening/page.tsx',
  'apps/web/components/rc-hardening/RcHardeningSummaryCards.tsx',
  'apps/web/components/rc-hardening/RcGateTable.tsx',
  'apps/web/components/rc-hardening/RcEvidenceBundlePanel.tsx',
  'apps/web/components/rc-hardening/RcSignoffPanel.tsx',
  'apps/web/components/rc-hardening/RcWaiverGuardPanel.tsx',
  'scripts/rc-hardening-gate-runner.js',
  'scripts/rc-hardening-production-env-guard.js',
  'artifacts/rc-hardening/m21s-rc-gate-run.json',
  'artifacts/rc-hardening/m21s-rc-evidence-bundle.json',
  'artifacts/rc-hardening/m21s-production-env-guard.sample.json',
  'artifacts/rc-hardening/build/README.md',
  'artifacts/rc-hardening/database/README.md',
  'artifacts/rc-hardening/providers/README.md',
  'artifacts/rc-hardening/e2e/README.md',
  'docs/releases/0.74.0.md',
  'docs/roadmap/NEXT_5_SPRINTS_AFTER_0_74_0.md',
  'docs/releases/0.74.1.md',
  'docs/qa/WEB_BUILD_STATIC_GUARDS.md',
  'scripts/qa-web-build-static-guards.js',
  'artifacts/qa/web-build-static-guards-latest.json',
];

for (const file of requiredFiles) {
  if (!exists(file)) failures.push(`Missing required file: ${file}`);
}

function parseJson(file) {
  try {
    return JSON.parse(read(file));
  } catch (error) {
    failures.push(`Invalid JSON in ${file}: ${error.message}`);
    return {};
  }
}

const packageJson = parseJson('package.json');
const currentVersion = packageJson.version || '';
if (!/^0\.(7[4-9]|[8-9]\d)\.\d+$/.test(currentVersion)) failures.push(`package.json version must remain compatible with post-M21 RC gates, found ${currentVersion}`);
for (const pkg of ['apps/web/package.json', 'apps/api/package.json', 'packages/shared/package.json']) {
  const data = parseJson(pkg);
  if (data.version !== currentVersion) failures.push(`${pkg} version must match package.json ${currentVersion}, found ${data.version}`);
}

for (const script of ['qa:web-build-static-guards', 'release:pre-zip-check', 'rc:hardening:env-guard', 'rc:hardening:gate-runner', 'qa:rc-hardening-development', 'release:rc-hardening-development-check']) {
  if (!packageJson.scripts || !packageJson.scripts[script]) failures.push(`Missing package script: ${script}`);
}

const requiredContent = [
  ['PROJECT_MANIFEST.md', `Versione corrente: ${currentVersion}`],
  ['PROJECT_MANIFEST.md', 'M21-S RC Hardening Development'],
  ['docs/PROJECT_MANIFEST.md', `Versione corrente: ${currentVersion}`],
  ['docs/ROADMAP_STATUS.md', `Stato aggiornato v${currentVersion}`],
  ['CHANGELOG.md', '0.74.0 - M21-S RC Hardening Development'],
  ['docs/CHANGELOG.md', '0.74.0 - M21-S RC Hardening Development'],
  ['.env.example', 'RC_HARDENING_ENABLED=true'],
  ['.env.example', 'RC_STRICT_PRODUCTION_GUARD=true'],
  ['.github/workflows/production-qa.yml', 'node scripts/qa-web-build-static-guards.js'],
  ['.github/workflows/production-qa.yml', 'node scripts/rc-hardening-production-env-guard.js'],
  ['.github/workflows/production-qa.yml', 'node scripts/rc-hardening-gate-runner.js'],
  ['apps/api/src/modules/launch-readiness/launch-readiness.controller.ts', "@Get('rc-hardening/summary')"],
  ['apps/api/src/modules/launch-readiness/launch-readiness.controller.ts', "@Get('rc-hardening/evidence-bundle')"],
  ['apps/api/src/modules/launch-readiness/launch-readiness.module.ts', 'RcHardeningService'],
  ['apps/api/src/modules/launch-readiness/launch-readiness.service.ts', 'RC hardening evidence bundle'],
  ['apps/web/app/admin/launch-readiness/page.tsx', '/admin/launch-readiness/rc-hardening'],
  ['apps/web/app/admin/launch-readiness/rc-hardening/page.tsx', 'RC hardening command center'],
  ['apps/web/lib/rc-hardening/rc-hardening-runtime.ts', 'm21sRcRuntimeGates'],
  ['apps/web/lib/rc-hardening/rc-hardening-runtime.ts', 'openBlockingGateCount'],
  ['apps/web/lib/rc-hardening/rc-hardening-runtime.ts', 'waived_with_feature_off'],
  ['apps/api/src/modules/launch-readiness/rc-hardening-runtime.types.ts', 'rcHardeningRuntimeGateContracts'],
  ['apps/api/src/modules/launch-readiness/rc-hardening-runtime.types.ts', 'buildRcHardeningRuntimeSummary'],
  ['scripts/rc-hardening-production-env-guard.js', 'ENABLE_DEMO_DATA'],
  ['scripts/rc-hardening-production-env-guard.js', 'Values are never written'],
  ['scripts/rc-hardening-gate-runner.js', '--fail-on-blocked'],
  ['docs/sprints/M21-S_RC_HARDENING_DEVELOPMENT.md', 'RC-P0-001'],
  ['docs/sprints/M21-S_RC_HARDENING_DEVELOPMENT.md', 'waived_with_feature_off'],
  ['docs/sprints/M21-S_RC_HARDENING_DEVELOPMENT.md', 'RC non pronta'],
  ['docs/rc-hardening/23_M22A_PILOT_LAUNCH_HANDOFF.md', 'M22-A'],
  ['docs/qa/WEB_BUILD_STATIC_GUARDS.md', 'StatCard'],
  ['docs/qa/WEB_BUILD_STATIC_GUARDS.md', 'DataTable'],
  ['scripts/qa-web-build-static-guards.js', 'value: ReactNode'],
];
for (const [file, needle] of requiredContent) {
  if (!read(file).includes(needle)) failures.push(`Missing content '${needle}' in ${file}`);
}

const webRuntime = read('apps/web/lib/rc-hardening/rc-hardening-runtime.ts');
const apiRuntime = read('apps/api/src/modules/launch-readiness/rc-hardening-runtime.types.ts');
const allRuntime = `${webRuntime}\n${apiRuntime}`;
for (const id of [
  'rc-build-typecheck-docker',
  'rc-dependency-freeze',
  'rc-env-secrets-feature-flags',
  'rc-database-migration-restore',
  'rc-provider-sandbox-certification',
  'rc-browser-e2e-real',
  'rc-security-privacy-freeze',
  'rc-evidence-bundle-signoff',
  'rc-observability-support-runbook',
]) {
  if (!allRuntime.includes(id)) failures.push(`Missing RC runtime gate id: ${id}`);
}
for (const token of ['build_ci', 'dependency_freeze', 'env_secrets', 'database_restore', 'provider_cutover', 'browser_e2e', 'security_privacy', 'observability_support', 'evidence_signoff']) {
  if (!allRuntime.includes(token)) failures.push(`Missing RC runtime area: ${token}`);
}
if ((webRuntime.match(/blocksReleaseCandidate: true/g) || []).length < 8) failures.push('Web runtime must keep at least 8 P0 blocking gates.');
if ((apiRuntime.match(/blocksReleaseCandidate: true/g) || []).length < 8) failures.push('API runtime must keep at least 8 P0 blocking gates.');

const gateRun = parseJson('artifacts/rc-hardening/m21s-rc-gate-run.json');
const evidenceBundle = parseJson('artifacts/rc-hardening/m21s-rc-evidence-bundle.json');
for (const artifact of [gateRun, evidenceBundle]) {
  if (artifact.release !== currentVersion) failures.push(`M21-S RC artifact release must be ${currentVersion}.`);
  if (artifact.sprint !== 'M21-S RC Hardening Development') failures.push('M21-S RC artifact sprint mismatch.');
  if (artifact.overallStatus !== 'blocked') failures.push('M21-S RC artifact must remain blocked without real evidence.');
  if (artifact.blockingGateCount < 8) failures.push('M21-S RC artifact must declare at least 8 blocking gates.');
  if (artifact.openBlockingGateCount < 6) failures.push('M21-S RC artifact should report open blocking gates until real evidence is attached.');
  if (!Array.isArray(artifact.gates) || artifact.gates.length < 9) failures.push('M21-S RC artifact must contain P0 and P1 gates.');
}

const envGuard = parseJson('artifacts/rc-hardening/m21s-production-env-guard.sample.json');
if (envGuard.release !== currentVersion) failures.push('Env guard sample release mismatch.');
if (!Array.isArray(envGuard.checks) || !envGuard.checks.some((check) => check.key === 'ENABLE_DEMO_DATA')) failures.push('Env guard sample must include ENABLE_DEMO_DATA check.');
if (JSON.stringify(envGuard).includes('change_me_with_strong_secret')) failures.push('Env guard sample leaked a secret-like value.');

const docs = [
  'docs/sprints/M21-S_RC_HARDENING_DEVELOPMENT.md',
  'docs/rc-hardening/18_RC_HARDENING_RUNTIME_IMPLEMENTATION.md',
  'docs/rc-hardening/19_RC_GATE_RUNNER_AND_EVIDENCE_BUNDLE_RUNTIME.md',
  'docs/rc-hardening/20_BUILD_DEPENDENCY_ENV_GUARDS_RUNTIME.md',
  'docs/rc-hardening/21_DATABASE_PROVIDER_E2E_BLOCKERS_RUNTIME.md',
  'docs/rc-hardening/22_OBSERVABILITY_SUPPORT_RUNBOOK_RUNTIME.md',
  'docs/rc-hardening/23_M22A_PILOT_LAUNCH_HANDOFF.md',
].map(read).join('\n').toLowerCase();
for (const term of ['build', 'typecheck', 'docker', 'coolify', 'pnpm-lock.yaml', 'enable_demo_data', 'migration', 'migrazioni', 'backup', 'restore', 'rollback', 'stripe', 'paypal', 'openapi', 'openai', 'email', 'pdf', 'playwright', 'evidence bundle', 'sign-off', 'waived_with_feature_off', 'feature flag']) {
  if (!docs.includes(term)) failures.push(`M21-S docs missing required term: ${term}`);
}
for (const forbidden of ['rischio zero', 'pagamento garantito', 'solvibilità garantita', 'solvibilita garantita', 'sicuro al 100%', 'infallibile']) {
  if (docs.includes(forbidden)) failures.push(`Forbidden absolute claim in M21-S docs: ${forbidden}`);
}

const page = read('apps/web/app/admin/launch-readiness/rc-hardening/page.tsx');
for (const token of ['PageHero', 'RcHardeningSummaryCards', 'RcGateTable', 'RcEvidenceBundlePanel', 'RcSignoffPanel', 'RcWaiverGuardPanel']) {
  if (!page.includes(token)) failures.push(`RC hardening page missing ${token}.`);
}

if (failures.length) {
  console.error('M21-S RC hardening development QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('M21-S RC hardening development QA passed.');
