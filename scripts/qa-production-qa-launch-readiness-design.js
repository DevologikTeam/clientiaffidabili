const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M13-P_PRODUCTION_QA_BROWSER_E2E_LAUNCH_READINESS_DESIGN.md',
  'docs/launch-readiness/11_PRODUCTION_QA_GATE_BLUEPRINT.md',
  'docs/launch-readiness/12_PLAYWRIGHT_E2E_ARCHITECTURE_BLUEPRINT.md',
  'docs/launch-readiness/13_E2E_TEST_MATRIX_BLUEPRINT.md',
  'docs/launch-readiness/14_CI_WORKFLOW_AND_ARTIFACTS_BLUEPRINT.md',
  'docs/launch-readiness/15_DOCKER_COOLIFY_SMOKE_TEST_BLUEPRINT.md',
  'docs/launch-readiness/16_TEST_DATA_SEED_FIXTURE_BLUEPRINT.md',
  'docs/launch-readiness/17_PAYMENT_PROVIDER_REPORT_E2E_BLUEPRINT.md',
  'docs/launch-readiness/18_RELEASE_ROLLBACK_SIGNOFF_BLUEPRINT.md',
  'docs/launch-readiness/19_M13S_IMPLEMENTATION_HANDOFF.md',
  'apps/web/lib/launch-readiness/production-qa-design.ts',
  'apps/api/src/modules/launch-readiness/production-qa-design.types.ts',
  'playwright.config.blueprint.ts',
  'tests/e2e/README.md',
  'docs/qa/M13-P_QA_REPORT.md',
  'docs/releases/0.42.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('M13-P QA failed. Missing files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const sprint = fs.readFileSync(path.join(root, required[0]), 'utf8');
const requiredTerms = ['Playwright', 'Docker', 'Coolify', 'rollback', 'go-live', 'provider', 'payment'];
const absent = requiredTerms.filter((term) => !sprint.includes(term));
if (absent.length) {
  console.error('M13-P QA failed. Sprint doc missing terms:', absent.join(', '));
  process.exit(1);
}

const matrix = fs.readFileSync(path.join(root, 'docs/launch-readiness/13_E2E_TEST_MATRIX_BLUEPRINT.md'), 'utf8');
for (const term of ['cross-account', 'Idempotency-Key', 'refund', 'partner']) {
  if (!matrix.toLowerCase().includes(term.toLowerCase())) {
    console.error(`M13-P QA failed. E2E matrix missing ${term}`);
    process.exit(1);
  }
}

console.log('M13-P Production QA Launch Readiness Design QA passed');
