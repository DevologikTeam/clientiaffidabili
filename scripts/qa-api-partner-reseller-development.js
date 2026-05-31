#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/sprints/M12-S_API_PARTNER_RESELLER_PORTAL_DEVELOPMENT.md',
  'docs/api-partner/20_PARTNER_PORTAL_RUNTIME_IMPLEMENTATION_NOTES.md',
  'docs/api-partner/21_PARTNER_ENTITIES_IMPLEMENTATION.md',
  'docs/api-partner/22_PARTNER_API_KEY_RUNTIME_IMPLEMENTATION.md',
  'docs/api-partner/23_PARTNER_PUBLIC_API_IMPLEMENTATION.md',
  'docs/api-partner/24_PARTNER_USAGE_LEDGER_CREDIT_RUNTIME.md',
  'docs/api-partner/25_PARTNER_WEBHOOK_RUNTIME_IMPLEMENTATION.md',
  'docs/api-partner/26_PARTNER_ADMIN_PORTAL_IMPLEMENTATION.md',
  'docs/api-partner/27_PARTNER_DEVELOPER_DOCS_IMPLEMENTATION.md',
  'apps/api/src/modules/partner-portal/partner-portal.module.ts',
  'apps/api/src/modules/partner-portal/partner-portal.service.ts',
  'apps/api/src/modules/partner-portal/partner-api.controller.ts',
  'apps/api/src/modules/partner-portal/partner-admin.controller.ts',
  'apps/api/src/modules/partner-portal/partner-api-key.service.ts',
  'apps/api/src/modules/partner-portal/partner-usage-ledger.service.ts',
  'apps/api/src/modules/partner-portal/partner-rate-limit.service.ts',
  'apps/api/src/modules/partner-portal/partner-webhook.service.ts',
  'apps/api/src/modules/partner-portal/partner-sandbox.service.ts',
  'apps/api/src/modules/partner-portal/entities/partner-account.entity.ts',
  'apps/api/src/modules/partner-portal/entities/partner-api-key.entity.ts',
  'apps/api/src/modules/partner-portal/entities/partner-webhook-endpoint.entity.ts',
  'apps/api/src/modules/partner-portal/entities/partner-usage-ledger-entry.entity.ts',
  'apps/api/src/modules/partner-portal/entities/partner-rate-limit-profile.entity.ts',
  'apps/api/src/modules/partner-portal/entities/partner-live-access-request.entity.ts',
  'apps/api/src/modules/partner-portal/entities/partner-idempotency-record.entity.ts',
  'apps/api/openapi/partner.v1.yaml',
  'apps/web/lib/partner-portal/partner-portal-runtime.ts',
  'apps/web/components/partner-portal/PartnerShell.tsx',
  'apps/web/components/partner-portal/PartnerStatusHero.tsx',
  'apps/web/components/partner-portal/PartnerApiKeyTable.tsx',
  'apps/web/components/partner-portal/PartnerUsageLedger.tsx',
  'apps/web/components/partner-portal/PartnerWebhookPanel.tsx',
  'apps/web/components/partner-portal/PartnerGoLiveChecklist.tsx',
  'apps/web/components/partner-portal/DeveloperQuickstart.tsx',
  'apps/web/app/dashboard/partner/page.tsx',
  'apps/web/app/dashboard/partner/api-keys/page.tsx',
  'apps/web/app/dashboard/partner/docs/page.tsx',
  'apps/web/app/dashboard/partner/usage/page.tsx',
  'apps/web/app/dashboard/partner/webhooks/page.tsx',
  'apps/web/app/dashboard/partner/go-live/page.tsx',
  'apps/web/app/admin/partners/page.tsx',
  'apps/web/app/admin/partners/[id]/page.tsx',
  'docs/qa/M12-S_QA_REPORT.md',
  'docs/releases/0.40.0.md',
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing M12-S file: ${file}`);
}
const apiKeyService = fs.readFileSync('apps/api/src/modules/partner-portal/partner-api-key.service.ts', 'utf8');
for (const token of ['secretHash', 'hashSecret', 'timingSafeEqual', 'ca_sbox_', 'ca_live_', 'Mostra questa chiave una sola volta']) {
  if (!apiKeyService.includes(token)) throw new Error(`API key runtime missing ${token}`);
}
const partnerApi = fs.readFileSync('apps/api/src/modules/partner-portal/partner-api.controller.ts', 'utf8');
for (const token of ['api/partner/v1', 'idempotency-key', 'company-checks', 'webhooks/test']) {
  if (!partnerApi.includes(token)) throw new Error(`Partner API missing ${token}`);
}
const portalService = fs.readFileSync('apps/api/src/modules/partner-portal/partner-portal.service.ts', 'utf8');
for (const token of ['Live API non attiva', 'Idempotency-Key obbligatorio', 'ledger.reserve', 'sandbox.createCompanyCheck']) {
  if (!portalService.includes(token)) throw new Error(`Partner portal service missing ${token}`);
}
const app = fs.readFileSync('apps/api/src/app.module.ts', 'utf8');
for (const token of ['PartnerPortalModule', 'PartnerAccount', 'PartnerApiKey', 'PartnerUsageLedgerEntry']) {
  if (!app.includes(token)) throw new Error(`AppModule missing ${token}`);
}
const sprint = fs.readFileSync('docs/sprints/M12-S_API_PARTNER_RESELLER_PORTAL_DEVELOPMENT.md', 'utf8');
for (const token of ['sandbox-first', 'API key', 'usage ledger', 'webhook', 'Idempotency-Key', 'raw payload']) {
  if (!sprint.toLowerCase().includes(token.toLowerCase())) throw new Error(`Sprint doc missing ${token}`);
}
console.log('qa-api-partner-reseller-development: passed');
