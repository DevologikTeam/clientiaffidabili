#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/sprints/M13-A_PRODUCTION_QA_BROWSER_E2E_LAUNCH_READINESS_ANALYSIS.md',
  'docs/launch-readiness/01_PRODUCTION_QA_PRODUCT_STRATEGY.md',
  'docs/launch-readiness/02_BUILD_TYPECHECK_LINT_GATE_ANALYSIS.md',
  'docs/launch-readiness/03_BROWSER_E2E_TEST_STRATEGY.md',
  'docs/launch-readiness/04_CRITICAL_USER_JOURNEYS_MATRIX.md',
  'docs/launch-readiness/05_COOLIFY_DEPLOY_SMOKE_TEST_ANALYSIS.md',
  'docs/launch-readiness/06_DATA_SEED_SANDBOX_PRODUCTION_POLICY.md',
  'docs/launch-readiness/07_PAYMENT_PROVIDER_E2E_READINESS_ANALYSIS.md',
  'docs/launch-readiness/08_PROVIDER_API_E2E_READINESS_ANALYSIS.md',
  'docs/launch-readiness/09_RELEASE_GOVERNANCE_ROLLBACK_ANALYSIS.md',
  'docs/launch-readiness/10_M13P_M13S_READINESS_CHECKLIST.md',
  'docs/research/M13A_PRODUCTION_QA_SOURCE_NOTES.md',
  'apps/api/src/modules/launch-readiness/production-qa.analysis.ts',
  'apps/web/lib/launch-readiness/production-qa-analysis.ts',
  'docs/qa/M13-A_QA_REPORT.md',
  'docs/releases/0.41.0.md',
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing M13-A file: ${file}`);
}
const sprint = fs.readFileSync('docs/sprints/M13-A_PRODUCTION_QA_BROWSER_E2E_LAUNCH_READINESS_ANALYSIS.md', 'utf8');
for (const token of ['Playwright', 'Coolify', 'go-live', 'provider', 'pagamento', 'report', 'rollback', 'backup']) {
  if (!sprint.toLowerCase().includes(token.toLowerCase())) throw new Error(`Sprint doc missing ${token}`);
}
const matrix = fs.readFileSync('docs/launch-readiness/04_CRITICAL_USER_JOURNEYS_MATRIX.md', 'utf8');
for (const token of ['P0', 'Cross-account', 'Rimborso', 'Provider', 'Coolify']) {
  if (!matrix.toLowerCase().includes(token.toLowerCase())) throw new Error(`Critical matrix missing ${token}`);
}
const e2e = fs.readFileSync('docs/launch-readiness/03_BROWSER_E2E_TEST_STRATEGY.md', 'utf8');
for (const token of ['tests/e2e/public-funnel.spec.ts', 'tests/e2e/security-cross-account.spec.ts', 'trace', 'data-testid']) {
  if (!e2e.includes(token)) throw new Error(`E2E strategy missing ${token}`);
}
const api = fs.readFileSync('apps/api/src/modules/launch-readiness/production-qa.analysis.ts', 'utf8');
for (const token of ['M13A_CRITICAL_JOURNEYS', 'goLiveBlocker', 'M13A_LAUNCH_BLOCKERS']) {
  if (!api.includes(token)) throw new Error(`API analysis missing ${token}`);
}
console.log('qa-production-qa-launch-readiness-analysis: passed');
