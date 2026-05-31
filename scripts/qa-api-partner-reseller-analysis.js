#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/sprints/M12-A_API_PARTNER_RESELLER_PORTAL_ANALYSIS.md',
  'docs/api-partner/01_PARTNER_PORTAL_PRODUCT_STRATEGY.md',
  'docs/api-partner/02_PARTNER_SEGMENTS_AND_PACKAGING_ANALYSIS.md',
  'docs/api-partner/03_RESELLER_REVENUE_MARGIN_MODEL_ANALYSIS.md',
  'docs/api-partner/04_PARTNER_API_SECURITY_ANALYSIS.md',
  'docs/api-partner/05_API_KEY_SCOPES_RATE_LIMIT_ANALYSIS.md',
  'docs/api-partner/06_DEVELOPER_EXPERIENCE_DOCS_OPENAPI_ANALYSIS.md',
  'docs/api-partner/07_PARTNER_ONBOARDING_KYB_LEGAL_ANALYSIS.md',
  'docs/api-partner/08_USAGE_LEDGER_CREDITS_BILLING_ANALYSIS.md',
  'docs/api-partner/09_PARTNER_ADMIN_OPERATIONS_ANALYSIS.md',
  'docs/api-partner/10_M12P_M12S_READINESS_CHECKLIST.md',
  'docs/research/M12A_API_PARTNER_SOURCE_NOTES.md',
  'apps/api/src/modules/partner-portal/partner-portal.analysis.ts',
  'apps/web/lib/partner-portal/partner-portal-analysis.ts',
  'docs/qa/M12-A_QA_REPORT.md',
  'docs/releases/0.38.0.md',
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing M12-A file: ${file}`);
}
const sprint = fs.readFileSync('docs/sprints/M12-A_API_PARTNER_RESELLER_PORTAL_ANALYSIS.md', 'utf8');
for (const token of ['API key', 'sandbox', 'production', 'rate limit', 'idempotency', 'usage ledger', 'credit wallet', 'webhook', 'object-level authorization']) {
  if (!sprint.includes(token)) throw new Error(`M12-A sprint doc missing ${token}`);
}
const security = fs.readFileSync('docs/api-partner/04_PARTNER_API_SECURITY_ANALYSIS.md', 'utf8');
for (const token of ['Broken Object Level Authorization', 'Idempotency-Key', 'Webhooks', 'hash', 'Scope']) {
  if (!security.toLowerCase().includes(token.toLowerCase())) throw new Error(`M12-A security analysis missing ${token}`);
}
const api = fs.readFileSync('apps/api/src/modules/partner-portal/partner-portal.analysis.ts', 'utf8');
for (const token of ['PartnerAccount', 'PartnerApiKey', 'PartnerUsageLedgerEntry', 'requiresIdempotency', 'canAccessProduction']) {
  if (!api.includes(token)) throw new Error(`M12-A API analysis missing ${token}`);
}
console.log('qa-api-partner-reseller-analysis: passed');
