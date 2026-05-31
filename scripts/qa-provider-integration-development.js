const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'apps/api/src/modules/provider/entities/provider-request.entity.ts',
  'apps/api/src/modules/provider/entities/provider-request-event.entity.ts',
  'apps/api/src/modules/provider/entities/provider-cost-ledger-entry.entity.ts',
  'apps/api/src/modules/provider/entities/provider-raw-payload-vault.entity.ts',
  'apps/api/src/modules/provider/provider-runtime.service.ts',
  'apps/api/src/modules/provider/provider-admin.controller.ts',
  'apps/api/src/modules/provider/openapi-adapter.service.ts',
  'apps/web/app/admin/provider/page.tsx',
  'apps/web/lib/provider/provider-runtime.ts',
  'docs/sprints/M5-S_PROVIDER_INTEGRATION_DEVELOPMENT.md',
  'docs/provider/19_PROVIDER_RUNTIME_IMPLEMENTATION_NOTES.md',
  'docs/provider/20_PROVIDER_DATA_ENTITIES_IMPLEMENTATION.md',
  'docs/provider/21_OPENAPI_ADAPTER_IMPLEMENTATION.md',
  'docs/provider/22_PROVIDER_ADMIN_QUEUE_IMPLEMENTATION.md',
  'docs/provider/23_PROVIDER_CALLBACK_AND_VAULT_IMPLEMENTATION.md',
  'docs/qa/M5-S_QA_REPORT.md',
  'docs/releases/0.16.0.md',
];

const requiredSnippets = [
  ['apps/api/src/modules/provider/provider-runtime.service.ts', 'dispatchAfterPayment'],
  ['apps/api/src/modules/provider/provider-runtime.service.ts', 'paymentConfirmedAt'],
  ['apps/api/src/modules/provider/provider-runtime.service.ts', 'providerCostSnapshotCents'],
  ['apps/api/src/modules/provider/provider-runtime.service.ts', 'rawPayloadVaultId'],
  ['apps/api/src/modules/provider/openapi-adapter.service.ts', 'ENABLE_PROVIDER_CALLS'],
  ['apps/api/src/modules/checks/checks.service.ts', 'La verifica puo partire solo dopo pagamento confermato'],
  ['.env.example', 'OPENAPI_CALLBACK_SECRET'],
  ['packages/shared/src/index.ts', 'ProviderAdminQueueItem'],
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
const badSnippets = requiredSnippets.filter(([file, snippet]) => {
  const full = path.join(root, file);
  return !fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(snippet);
});

if (missing.length || badSnippets.length) {
  console.error('M5-S QA failed');
  if (missing.length) console.error('Missing files:', missing);
  if (badSnippets.length) console.error('Missing snippets:', badSnippets);
  process.exit(1);
}

console.log('M5-S provider integration development QA passed');
