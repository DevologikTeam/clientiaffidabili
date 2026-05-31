#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'playwright.config.ts',
  'tests/e2e/public-funnel.spec.ts',
  'tests/e2e/checkout-billing-report.spec.ts',
  'tests/e2e/customer-dashboard.spec.ts',
  'tests/e2e/admin-operations-security.spec.ts',
  'tests/e2e/partner-seo-cms.spec.ts',
  'scripts/launch-smoke-check.js',
  'docs/launch-readiness/26_PRODUCTION_QA_RUNTIME_IMPLEMENTATION_NOTES.md',
  'docs/launch-readiness/27_PLAYWRIGHT_E2E_RUNTIME_IMPLEMENTATION.md',
  'docs/launch-readiness/28_DOCKER_COOLIFY_SMOKE_RUNTIME.md',
  'docs/launch-readiness/30_RELEASE_ROLLBACK_RUNTIME_RUNBOOK.md',
];

const missing = requiredFiles.filter((rel) => !fs.existsSync(path.join(root, rel)));
if (missing.length) {
  console.error('Launch production gate failed. Missing files:');
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const compose = fs.readFileSync(path.join(root, 'docker-compose.yml'), 'utf8') + '\n' + fs.readFileSync(path.join(root, 'docker-compose.coolify.yml'), 'utf8');
for (const needle of ['healthcheck', 'http://localhost:3001/health', 'http://localhost:3000']) {
  if (!compose.includes(needle)) {
    console.error(`Launch production gate failed. Compose missing ${needle}`);
    process.exit(1);
  }
}

const config = fs.readFileSync(path.join(root, 'playwright.config.ts'), 'utf8');
for (const needle of ['workers: process.env.CI ? 1', 'trace:', 'screenshot:', 'projects:']) {
  if (!config.includes(needle)) {
    console.error(`Launch production gate failed. Playwright config missing ${needle}`);
    process.exit(1);
  }
}

console.log('launch-production-gate: passed');
