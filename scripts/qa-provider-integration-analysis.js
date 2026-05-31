const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'docs/sprints/M5-A_PROVIDER_INTEGRATION_ANALYSIS.md',
  'docs/provider/01_PROVIDER_INTEGRATION_STRATEGY.md',
  'docs/provider/02_OPENAPI_SERVICE_MAPPING_ANALYSIS.md',
  'docs/provider/03_PROVIDER_REQUEST_LIFECYCLE_ANALYSIS.md',
  'docs/provider/04_COST_TRACKING_AND_MARGIN_ANALYSIS.md',
  'docs/provider/05_ERROR_RETRY_FALLBACK_ANALYSIS.md',
  'docs/provider/06_NORMALIZATION_AND_EVIDENCE_ANALYSIS.md',
  'docs/provider/07_SECURITY_PRIVACY_COMPLIANCE_ANALYSIS.md',
  'docs/provider/08_PROVIDER_ADMIN_OPERATIONS_ANALYSIS.md',
  'docs/provider/09_M5P_M5S_READINESS_CHECKLIST.md',
  'docs/research/M5A_PROVIDER_SOURCE_NOTES.md',
  'docs/qa/M5-A_QA_REPORT.md',
  'docs/releases/0.14.0.md',
  'apps/api/src/modules/provider/provider-integration.analysis.ts',
  'apps/web/lib/provider/provider-integration-analysis.ts',
];

const requiredSnippets = [
  ['docs/sprints/M5-A_PROVIDER_INTEGRATION_ANALYSIS.md', 'contract-first'],
  ['docs/sprints/M5-A_PROVIDER_INTEGRATION_ANALYSIS.md', 'nessuna chiamata provider prima del pagamento'],
  ['docs/provider/02_OPENAPI_SERVICE_MAPPING_ANALYSIS.md', 'COMPANY_PRO'],
  ['docs/provider/03_PROVIDER_REQUEST_LIFECYCLE_ANALYSIS.md', 'idempotency key'],
  ['docs/provider/04_COST_TRACKING_AND_MARGIN_ANALYSIS.md', 'Provider cost snapshot'],
  ['docs/provider/05_ERROR_RETRY_FALLBACK_ANALYSIS.md', 'paid_provider_error'],
  ['docs/provider/06_NORMALIZATION_AND_EVIDENCE_ANALYSIS.md', 'Raw payload'],
  ['docs/provider/07_SECURITY_PRIVACY_COMPLIANCE_ANALYSIS.md', 'Nessuna variabile `NEXT_PUBLIC_*`'],
  ['docs/provider/08_PROVIDER_ADMIN_OPERATIONS_ANALYSIS.md', 'Service mapping registry'],
  ['docs/provider/09_M5P_M5S_READINESS_CHECKLIST.md', 'base URL sandbox'],
  ['apps/api/src/modules/provider/provider-integration.analysis.ts', 'MVP_PROVIDER_SERVICE_MAPPING_ANALYSIS'],
  ['apps/web/lib/provider/provider-integration-analysis.ts', 'blockedBehaviours'],
  ['packages/shared/src/index.ts', 'ProviderRequestAnalysisSnapshot'],
  ['package.json', 'qa:provider-integration-analysis'],
];

let failed = false;
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${file}`);
    failed = true;
  }
}
for (const [file, snippet] of requiredSnippets) {
  const full = path.join(root, file);
  const text = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
  if (!text.includes(snippet)) {
    console.error(`Missing snippet "${snippet}" in ${file}`);
    failed = true;
  }
}

const combined = requiredFiles
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();

for (const guard of [
  'server-side',
  'post-payment',
  'idempot',
  'cost snapshot',
  'raw payload',
  'retry',
  'manual review',
  'uso lecito',
  'minimizzazione',
  'fonte',
]) {
  if (!combined.includes(guard)) {
    console.error(`Missing provider guardrail term: ${guard}`);
    failed = true;
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!['0.14.0', '0.15.0', '0.16.0', '0.17.0', '0.18.0', '0.19.0', '0.20.0', '0.21.0', '0.22.0', '0.23.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.36.0', '0.41.0', '0.42.0', '0.47.0'].includes(pkg.version)) {
  console.error(`Root package version is ${pkg.version}, expected 0.14.0, 0.15.0, 0.16.0 0.17.0, 0.18.0 0.19.0 0.20.0 0.21.0 0.22.0 0.23.0 0.24.0 0.25.0 or 0.42.0 / 0.47.0`);
  failed = true;
}

if (!pkg.scripts['release:check'].includes('qa:provider-integration-analysis')) {
  console.error('release:check does not include qa:provider-integration-analysis');
  failed = true;
}

if (failed) process.exit(1);
console.log('qa-provider-integration-analysis: passed');

