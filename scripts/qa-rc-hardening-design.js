#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M21-P_RC_HARDENING_DESIGN.md',
  'docs/rc-hardening/10_RC_GATE_ORCHESTRATION_BLUEPRINT.md',
  'docs/rc-hardening/11_BUILD_TYPECHECK_DOCKER_CI_FREEZE_BLUEPRINT.md',
  'docs/rc-hardening/12_ENV_SECRETS_FEATURE_FLAG_FREEZE_BLUEPRINT.md',
  'docs/rc-hardening/13_DATABASE_MIGRATION_BACKUP_RESTORE_BLUEPRINT.md',
  'docs/rc-hardening/14_PROVIDER_SANDBOX_LIVE_CUTOVER_BLUEPRINT.md',
  'docs/rc-hardening/15_OBSERVABILITY_ERROR_LEDGER_SUPPORT_BLUEPRINT.md',
  'docs/rc-hardening/16_RC_EVIDENCE_BUNDLE_AND_SIGNOFF_BLUEPRINT.md',
  'docs/rc-hardening/17_M21S_IMPLEMENTATION_HANDOFF.md',
  'apps/web/lib/rc-hardening/rc-hardening-design.ts',
  'apps/api/src/modules/launch-readiness/rc-hardening-design.types.ts',
  'artifacts/rc-hardening/m21p-rc-hardening-design-blueprint.json',
  'docs/releases/0.73.0.md',
  'docs/roadmap/NEXT_5_SPRINTS_AFTER_0_73_0.md',
];

const requiredContent = [
  ['package.json', 'qa:rc-hardening-design'],
  ['package.json', 'release:rc-hardening-design-check'],
  ['CHANGELOG.md', '0.73.0 - M21-P RC Hardening Design'],
  ['docs/CHANGELOG.md', '0.73.0 - M21-P RC Hardening Design'],
  ['docs/sprints/M21-P_RC_HARDENING_DESIGN.md', 'RC-P0-001'],
  ['docs/sprints/M21-P_RC_HARDENING_DESIGN.md', 'waived_with_feature_off'],
  ['docs/sprints/M21-P_RC_HARDENING_DESIGN.md', 'ENABLE_DEMO_DATA'],
  ['docs/rc-hardening/10_RC_GATE_ORCHESTRATION_BLUEPRINT.md', 'rc-build-typecheck-docker'],
  ['docs/rc-hardening/11_BUILD_TYPECHECK_DOCKER_CI_FREEZE_BLUEPRINT.md', 'docker compose build --no-cache api web'],
  ['docs/rc-hardening/12_ENV_SECRETS_FEATURE_FLAG_FREEZE_BLUEPRINT.md', 'ENABLE_DEMO_DATA=false'],
  ['docs/rc-hardening/13_DATABASE_MIGRATION_BACKUP_RESTORE_BLUEPRINT.md', 'synchronize: true'],
  ['docs/rc-hardening/14_PROVIDER_SANDBOX_LIVE_CUTOVER_BLUEPRINT.md', 'Stripe'],
  ['docs/rc-hardening/14_PROVIDER_SANDBOX_LIVE_CUTOVER_BLUEPRINT.md', 'Openapi'],
  ['docs/rc-hardening/15_OBSERVABILITY_ERROR_LEDGER_SUPPORT_BLUEPRINT.md', 'OperationalErrorEvent'],
  ['docs/rc-hardening/16_RC_EVIDENCE_BUNDLE_AND_SIGNOFF_BLUEPRINT.md', 'ready_for_rc'],
  ['docs/rc-hardening/17_M21S_IMPLEMENTATION_HANDOFF.md', 'Task P0'],
  ['apps/web/lib/rc-hardening/rc-hardening-design.ts', 'm21pRcHardeningGates'],
  ['apps/web/lib/rc-hardening/rc-hardening-design.ts', 'rc-provider-sandbox-certification'],
  ['apps/web/lib/rc-hardening/rc-hardening-design.ts', 'waiver-feature-off-only'],
  ['apps/api/src/modules/launch-readiness/rc-hardening-design.types.ts', 'rcHardeningDesignGateContracts'],
  ['apps/api/src/modules/launch-readiness/rc-hardening-design.types.ts', 'rcEvidenceBundleDesignContract'],
  ['artifacts/rc-hardening/m21p-rc-hardening-design-blueprint.json', 'M21-P RC Hardening Design'],
];

const failures = [];
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
function versionParts(version) { return String(version || '0.0.0').split('.').map((part) => Number.parseInt(part, 10) || 0); }
function isAtLeast(version, minimum) {
  const current = versionParts(version);
  const min = versionParts(minimum);
  for (let index = 0; index < Math.max(current.length, min.length); index += 1) {
    const left = current[index] || 0;
    const right = min[index] || 0;
    if (left > right) return true;
    if (left < right) return false;
  }
  return true;
}
if (!isAtLeast(packageJson.version, '0.73.0')) failures.push(`package.json version must be >= 0.73.0, found ${packageJson.version}`);
for (const pkg of ['apps/web/package.json', 'apps/api/package.json', 'packages/shared/package.json']) {
  const data = JSON.parse(fs.readFileSync(path.join(root, pkg), 'utf8'));
  if (!isAtLeast(data.version, '0.73.0')) failures.push(`${pkg} version must be >= 0.73.0, found ${data.version}`);
}
const manifestVersion = fs.readFileSync(path.join(root, 'PROJECT_MANIFEST.md'), 'utf8').match(/Versione corrente: ([0-9.]+)/)?.[1];
if (!isAtLeast(manifestVersion, '0.73.0')) failures.push(`PROJECT_MANIFEST current version must be >= 0.73.0, found ${manifestVersion || 'missing'}`);

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`);
}
for (const [file, needle] of requiredContent) {
  const full = path.join(root, file);
  if (!fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(needle)) failures.push(`Missing content '${needle}' in ${file}`);
}

const registryPath = path.join(root, 'apps/web/lib/rc-hardening/rc-hardening-design.ts');
const registry = fs.existsSync(registryPath) ? fs.readFileSync(registryPath, 'utf8') : '';
const gateIds = Array.from(registry.matchAll(/id: "(rc-[^"]+)"/g)).map((match) => match[1]);
const uniqueGateIds = [...new Set(gateIds)];
const requiredGateIds = [
  'rc-build-typecheck-docker',
  'rc-dependency-freeze',
  'rc-env-secrets-feature-flags',
  'rc-database-migration-restore',
  'rc-provider-sandbox-certification',
  'rc-browser-e2e-real',
  'rc-security-privacy-freeze',
  'rc-evidence-bundle-signoff',
];
for (const id of requiredGateIds) {
  if (!uniqueGateIds.includes(id)) failures.push(`Missing M21-P RC gate: ${id}`);
}
if ((registry.match(/blocksReleaseCandidate: true/g) || []).length < 8) failures.push('Expected at least 8 blocking RC gates.');
for (const area of ['build_ci', 'dependency_freeze', 'env_secrets', 'database_restore', 'provider_cutover', 'browser_e2e', 'security_privacy', 'observability_support', 'evidence_signoff']) {
  if (!registry.includes(area)) failures.push(`Missing RC design area: ${area}`);
}
for (const provider of ['stripe', 'paypal', 'openapi', 'openai', 'email_pdf']) {
  if (!registry.includes(`provider: "${provider}"`)) failures.push(`Missing provider cutover design for ${provider}`);
}

const artifactPath = path.join(root, 'artifacts/rc-hardening/m21p-rc-hardening-design-blueprint.json');
if (fs.existsSync(artifactPath)) {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  if (artifact.release !== '0.73.0') failures.push('M21-P artifact release must be 0.73.0.');
  if (artifact.sprint !== 'M21-P RC Hardening Design') failures.push('M21-P artifact sprint mismatch.');
  if (!Array.isArray(artifact.gates) || artifact.gates.length < 8) failures.push('M21-P artifact must contain at least 8 gates.');
  if (artifact.blockingGateCount < 8) failures.push('M21-P artifact must declare at least 8 blocking gates.');
  if (!artifact.waiverPolicy || artifact.waiverPolicy.allowedStatus !== 'waived_with_feature_off') failures.push('M21-P artifact waiver policy missing feature-off rule.');
}

const combinedDocs = requiredFiles
  .filter((file) => file.endsWith('.md') && fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();
const requiredTerms = [
  'build', 'typecheck', 'docker', 'coolify', 'ci', 'lockfile', 'pnpm-lock.yaml', 'enable_demo_data',
  'feature flag', 'waiver', 'waived_with_feature_off', 'migration', 'migrazioni', 'backup', 'restore',
  'rollback', 'stripe', 'paypal', 'openapi', 'openai', 'email', 'pdf', 'playwright', 'evidence bundle',
  'sign-off', 'secret', 'privacy', 'noindex', 'error ledger'
];
for (const term of requiredTerms) {
  if (!combinedDocs.includes(term)) failures.push(`M21-P docs missing required term: ${term}`);
}
const forbiddenClaims = ['rischio zero', 'pagamento garantito', 'solvibilità garantita', 'solvibilita garantita', 'sicuro al 100%', 'infallibile'];
for (const claim of forbiddenClaims) {
  if (combinedDocs.includes(claim)) failures.push(`Forbidden absolute claim found in M21-P docs: ${claim}`);
}

if (failures.length) {
  console.error('M21-P RC hardening design QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`M21-P RC hardening design QA passed (${uniqueGateIds.length} gate ids).`);
