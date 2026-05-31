const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'docs/sprints/M13-S_PRODUCTION_QA_BROWSER_E2E_LAUNCH_READINESS_DEVELOPMENT.md',
  'docs/launch-readiness/20_PRODUCTION_QA_RUNTIME_IMPLEMENTATION_NOTES.md',
  'docs/launch-readiness/21_PLAYWRIGHT_E2E_RUNTIME_IMPLEMENTATION.md',
  'docs/launch-readiness/22_CI_PIPELINE_ARTIFACTS_IMPLEMENTATION.md',
  'docs/launch-readiness/23_DOCKER_COOLIFY_SMOKE_RUNTIME.md',
  'docs/launch-readiness/24_TEST_DATA_FIXTURES_RUNTIME.md',
  'docs/launch-readiness/25_PAYMENT_PROVIDER_REPORT_E2E_RUNTIME.md',
  'docs/launch-readiness/26_RELEASE_ROLLBACK_RUNTIME_RUNBOOK.md',
  'docs/qa/M13-S_QA_REPORT.md',
  'playwright.config.ts',
  'tests/e2e/public-funnel.spec.ts',
  'tests/e2e/checkout-billing-report.spec.ts',
  'tests/e2e/customer-dashboard.spec.ts',
  'tests/e2e/admin-operations-security.spec.ts',
  'tests/e2e/partner-seo-cms.spec.ts',
  'tests/e2e/fixtures/test-data.ts',
  'tests/e2e/helpers/navigation.ts',
  'scripts/launch-production-gate.js',
  'scripts/launch-smoke-check.js',
  'apps/api/src/modules/launch-readiness/launch-readiness.module.ts',
  'apps/api/src/modules/launch-readiness/launch-readiness.service.ts',
  'apps/api/src/modules/launch-readiness/launch-readiness.controller.ts',
  'apps/web/app/admin/launch-readiness/page.tsx',
  'apps/web/lib/launch-readiness/production-qa-runtime.ts',
  'docs/releases/0.44.0.md',
];
const missing = required.filter((rel) => !fs.existsSync(path.join(root, rel)));
if (missing.length) {
  console.error('M13-S QA failed. Missing files:');
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
for (const scriptName of ['e2e', 'e2e:ci', 'qa:launch:gate', 'qa:launch:smoke', 'qa:production-qa-launch-readiness-development']) {
  if (!pkg.scripts || !pkg.scripts[scriptName]) {
    console.error(`M13-S QA failed. Missing package script ${scriptName}`);
    process.exit(1);
  }
}
if (!pkg.devDependencies || !pkg.devDependencies['@playwright/test']) {
  console.error('M13-S QA failed. Missing @playwright/test devDependency');
  process.exit(1);
}

const specs = ['public-funnel', 'checkout-billing-report', 'customer-dashboard', 'admin-operations-security', 'partner-seo-cms']
  .map((name) => fs.readFileSync(path.join(root, `tests/e2e/${name}.spec.ts`), 'utf8')).join('\n');
for (const needle of ['checkout', 'dashboard', 'admin', 'partner', 'SEO', 'rawPayload']) {
  if (!specs.includes(needle)) {
    console.error(`M13-S QA failed. E2E specs missing ${needle}`);
    process.exit(1);
  }
}

const appModule = fs.readFileSync(path.join(root, 'apps/api/src/app.module.ts'), 'utf8');
if (!appModule.includes('LaunchReadinessModule')) {
  console.error('M13-S QA failed. AppModule missing LaunchReadinessModule');
  process.exit(1);
}

console.log('M13-S Production QA Launch Readiness Development QA passed');
