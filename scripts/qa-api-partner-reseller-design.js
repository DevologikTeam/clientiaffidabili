#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/sprints/M12-P_API_PARTNER_RESELLER_PORTAL_DESIGN.md',
  'docs/api-partner/11_PARTNER_PORTAL_EXPERIENCE_BLUEPRINT.md',
  'docs/api-partner/12_API_KEY_SANDBOX_LIVE_BLUEPRINT.md',
  'docs/api-partner/13_PARTNER_API_CONTRACTS_BLUEPRINT.md',
  'docs/api-partner/14_USAGE_LEDGER_CREDIT_BILLING_BLUEPRINT.md',
  'docs/api-partner/15_RATE_LIMIT_IDEMPOTENCY_WEBHOOK_BLUEPRINT.md',
  'docs/api-partner/16_RESELLER_PRICING_REVENUE_SHARE_BLUEPRINT.md',
  'docs/api-partner/17_DEVELOPER_DOCS_OPENAPI_BLUEPRINT.md',
  'docs/api-partner/18_PARTNER_ADMIN_OPERATIONS_BLUEPRINT.md',
  'docs/api-partner/19_M12S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/partner-portal/partner-portal.types.ts',
  'apps/api/src/modules/partner-portal/partner-api-contracts.ts',
  'apps/api/src/modules/partner-portal/partner-permissions.registry.ts',
  'apps/api/src/modules/partner-portal/partner-openapi-blueprint.ts',
  'apps/web/lib/partner-portal/partner-portal-design.ts',
  'docs/qa/M12-P_QA_REPORT.md',
  'docs/releases/0.39.0.md',
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing M12-P file: ${file}`);
}
const sprint = fs.readFileSync('docs/sprints/M12-P_API_PARTNER_RESELLER_PORTAL_DESIGN.md', 'utf8');
for (const token of ['sandbox-first', 'API key', 'rate limit', 'Idempotency-Key', 'usage ledger', 'credit wallet', 'webhook', 'raw payload', 'Reseller']) {
  if (!sprint.toLowerCase().includes(token.toLowerCase())) throw new Error(`M12-P sprint doc missing ${token}`);
}
const contracts = fs.readFileSync('apps/api/src/modules/partner-portal/partner-api-contracts.ts', 'utf8');
for (const token of ['PARTNER_API_BASE_PATH', 'requiresIdempotencyKey', 'requiresCreditReservation', 'insufficient_credits', 'live_not_approved']) {
  if (!contracts.includes(token)) throw new Error(`M12-P API contracts missing ${token}`);
}
const handoff = fs.readFileSync('docs/api-partner/19_M12S_IMPLEMENTATION_HANDOFF.md', 'utf8');
for (const token of ['PartnerPortalModule', 'PartnerApiKeyEntity', 'Usage ledger', 'Live disabilitato', 'hash']) {
  if (!handoff.toLowerCase().includes(token.toLowerCase())) throw new Error(`M12-P handoff missing ${token}`);
}
console.log('qa-api-partner-reseller-design: passed');
