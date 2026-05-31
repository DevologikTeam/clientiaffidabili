#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const required = [
  'docs/sprints/M18-A_EMAIL_CUSTOMER_NOTIFICATIONS_ANALYSIS.md',
  'docs/email-notifications/08_EMAIL_PRODUCT_STRATEGY_ANALYSIS.md',
  'docs/email-notifications/09_EMAIL_EVENT_INVENTORY_ANALYSIS.md',
  'docs/email-notifications/10_EMAIL_DELIVERABILITY_AND_PROVIDER_ANALYSIS.md',
  'docs/email-notifications/11_EMAIL_SECURITY_PRIVACY_ANALYSIS.md',
  'docs/email-notifications/12_EMAIL_DATA_MODEL_ANALYSIS.md',
  'docs/email-notifications/13_EMAIL_ADMIN_OPERATIONS_ANALYSIS.md',
  'docs/email-notifications/14_M18P_M18S_READINESS_CHECKLIST.md',
  'docs/research/M18A_EMAIL_NOTIFICATION_SOURCE_NOTES.md',
  'apps/api/src/modules/email-notifications/email-notifications.analysis.ts',
  'apps/web/lib/email-notifications/email-notifications-analysis.ts',
  'docs/releases/0.63.0.md'
];
const fail = (msg) => { console.error(`[qa-email-notifications-analysis] ${msg}`); process.exit(1); };
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing file: ${file}`);
}
const sprint = read('docs/sprints/M18-A_EMAIL_CUSTOMER_NOTIFICATIONS_ANALYSIS.md');
for (const needle of ['Recupero password', 'Funzione ricordami', 'Documento pronto', 'PDF', 'Email event', 'Provider', 'Ledger']) {
  if (!sprint.includes(needle)) fail(`Sprint missing required concept: ${needle}`);
}
const events = read('docs/email-notifications/09_EMAIL_EVENT_INVENTORY_ANALYSIS.md');
for (const event of ['auth.password_reset_requested', 'payment.succeeded', 'report.ready', 'pdf.ready', 'invoice.available', 'support.ticket_updated']) {
  if (!events.includes(event)) fail(`Event inventory missing: ${event}`);
}
const security = read('docs/email-notifications/11_EMAIL_SECURITY_PRIVACY_ANALYSIS.md');
for (const term of ['Token salvati solo come hash', 'Link sicuro', 'Remember me', 'IBAN completo']) {
  if (!security.includes(term)) fail(`Security analysis missing: ${term}`);
}
const api = read('apps/api/src/modules/email-notifications/email-notifications.analysis.ts');
for (const key of ['eventLedgerRequired', 'securePdfLinkPreferred', 'pdfAttachmentFeatureFlagged', 'operationalErrorLedgerIntegration']) {
  if (!api.includes(key)) fail(`API analysis missing guardrail: ${key}`);
}
console.log('[qa-email-notifications-analysis] passed');
