const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'docs/sprints/M5-P_PROVIDER_INTEGRATION_DESIGN.md',
  'docs/provider/10_PROVIDER_ADAPTER_BLUEPRINT.md',
  'docs/provider/11_PROVIDER_DATA_MODEL_BLUEPRINT.md',
  'docs/provider/12_PROVIDER_SERVICE_MAPPING_REGISTRY.md',
  'docs/provider/13_PROVIDER_REQUEST_LIFECYCLE_BLUEPRINT.md',
  'docs/provider/14_PROVIDER_CALLBACK_POLLING_BLUEPRINT.md',
  'docs/provider/15_NORMALIZED_DTO_AND_EVIDENCE_BLUEPRINT.md',
  'docs/provider/16_PROVIDER_ADMIN_OPERATIONS_BLUEPRINT.md',
  'docs/provider/17_PROVIDER_SECURITY_AND_RAW_PAYLOAD_VAULT.md',
  'docs/provider/18_M5S_IMPLEMENTATION_HANDOFF.md',
  'docs/qa/M5-P_QA_REPORT.md',
  'docs/releases/0.15.0.md',
  'apps/api/src/modules/provider/provider.types.ts',
  'apps/api/src/modules/provider/provider-mapping.registry.ts',
  'apps/api/src/modules/provider/provider-normalization.contract.ts',
  'apps/api/src/modules/provider/provider-entities.blueprint.ts',
  'apps/web/lib/provider/provider-integration-design.ts',
];

const requiredSnippets = [
  ['docs/sprints/M5-P_PROVIDER_INTEGRATION_DESIGN.md', 'Openapi-first'],
  ['docs/provider/10_PROVIDER_ADAPTER_BLUEPRINT.md', 'ProviderAdapter'],
  ['docs/provider/10_PROVIDER_ADAPTER_BLUEPRINT.md', 'ENABLE_PROVIDER_CALLS'],
  ['docs/provider/11_PROVIDER_DATA_MODEL_BLUEPRINT.md', 'ProviderRequest'],
  ['docs/provider/11_PROVIDER_DATA_MODEL_BLUEPRINT.md', 'ProviderCostLedger'],
  ['docs/provider/12_PROVIDER_SERVICE_MAPPING_REGISTRY.md', 'COMPANY_PRO'],
  ['docs/provider/13_PROVIDER_REQUEST_LIFECYCLE_BLUEPRINT.md', 'post-payment'],
  ['docs/provider/13_PROVIDER_REQUEST_LIFECYCLE_BLUEPRINT.md', 'idempotency key'],
  ['docs/provider/14_PROVIDER_CALLBACK_POLLING_BLUEPRINT.md', 'callback'],
  ['docs/provider/14_PROVIDER_CALLBACK_POLLING_BLUEPRINT.md', 'polling'],
  ['docs/provider/15_NORMALIZED_DTO_AND_EVIDENCE_BLUEPRINT.md', 'raw JSON provider'],
  ['docs/provider/16_PROVIDER_ADMIN_OPERATIONS_BLUEPRINT.md', 'Retry'],
  ['docs/provider/17_PROVIDER_SECURITY_AND_RAW_PAYLOAD_VAULT.md', 'NEXT_PUBLIC_OPENAPI'],
  ['docs/provider/18_M5S_IMPLEMENTATION_HANDOFF.md', 'Definition of done M5-S'],
  ['apps/api/src/modules/provider/provider.types.ts', 'buildProviderIdempotencyKey'],
  ['apps/api/src/modules/provider/provider-mapping.registry.ts', 'PROVIDER_SERVICE_MAPPINGS'],
  ['apps/api/src/modules/provider/provider-normalization.contract.ts', 'CUSTOMER_VISIBLE_RESULT_RULES'],
  ['apps/web/lib/provider/provider-integration-design.ts', 'blockedBehaviours'],
  ['packages/shared/src/index.ts', 'ProviderServiceMappingDesign'],
  ['package.json', 'qa:provider-integration-design'],
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
  'callback',
  'polling',
  'manual review',
  'uso lecito',
  'retention',
]) {
  if (!combined.includes(guard)) {
    console.error(`Missing provider design guardrail term: ${guard}`);
    failed = true;
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!['0.15.0', '0.16.0', '0.17.0', '0.18.0', '0.19.0', '0.20.0', '0.21.0', '0.22.0', '0.23.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.36.0', '0.41.0', '0.42.0', '0.47.0'].includes(pkg.version)) {
  console.error(`Root package version is ${pkg.version}, expected 0.15.0, 0.16.0 0.17.0, 0.18.0 0.19.0 0.20.0 0.21.0 0.22.0 0.23.0 0.24.0 0.25.0 or 0.42.0 / 0.47.0`);
  failed = true;
}
if (!pkg.scripts['release:check'].includes('qa:provider-integration-design')) {
  console.error('release:check does not include qa:provider-integration-design');
  failed = true;
}

if (failed) process.exit(1);
console.log('qa-provider-integration-design: passed');
