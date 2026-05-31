#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'docs/sprints/M18-P_EMAIL_CUSTOMER_NOTIFICATIONS_DESIGN.md',
  'docs/email-notifications/15_EMAIL_NOTIFICATION_EXPERIENCE_BLUEPRINT.md',
  'docs/email-notifications/16_EMAIL_EVENT_TEMPLATE_REGISTRY_BLUEPRINT.md',
  'docs/email-notifications/17_EMAIL_DELIVERY_LEDGER_WEBHOOKS_BLUEPRINT.md',
  'docs/email-notifications/18_ACCOUNT_AUTH_SECURITY_EMAIL_BLUEPRINT.md',
  'docs/email-notifications/19_ORDER_PAYMENT_REFUND_EMAIL_BLUEPRINT.md',
  'docs/email-notifications/20_REPORT_PDF_DOCUMENT_EMAIL_BLUEPRINT.md',
  'docs/email-notifications/21_EMAIL_ADMIN_MONITOR_OPERATIONS_BLUEPRINT.md',
  'docs/email-notifications/22_EMAIL_PROVIDER_SETTINGS_AND_DELIVERABILITY_BLUEPRINT.md',
  'docs/email-notifications/23_EMAIL_TEMPLATE_COPY_DECK_BLUEPRINT.md',
  'docs/email-notifications/24_EMAIL_API_CONTRACTS_BLUEPRINT.md',
  'docs/email-notifications/25_M18S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/email-notifications/email-notifications-design.types.ts',
  'apps/api/src/modules/email-notifications/email-template.registry.ts',
  'apps/web/lib/email-notifications/email-notifications-design.ts'
];

const requiredTerms = [
  'remember-me',
  'recupero password',
  'PDF',
  'link sicuro',
  'EmailDelivery',
  'EmailSuppression',
  'Operational Error Ledger',
  'bounce',
  'complaint',
  'retry',
  'webhook',
  'template',
  'SPF',
  'DKIM',
  'DMARC'
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));
if (missing.length) {
  console.error('Missing required M18-P files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const docs = requiredFiles
  .filter((file) => file.endsWith('.md'))
  .map((file) => fs.readFileSync(path.join(process.cwd(), file), 'utf8'))
  .join('\n');

const missingTerms = requiredTerms.filter((term) => !docs.includes(term));
if (missingTerms.length) {
  console.error('Missing required M18-P terms:');
  for (const term of missingTerms) console.error(`- ${term}`);
  process.exit(1);
}

const registry = fs.readFileSync(path.join(process.cwd(), 'apps/api/src/modules/email-notifications/email-template.registry.ts'), 'utf8');
const forbiddenRuntimeValues = ['cardNumber', 'ibanFull', 'rawProviderPayload', 'openaiPrompt'];
for (const token of forbiddenRuntimeValues) {
  if (!registry.includes(token)) {
    console.error(`Registry must explicitly forbid ${token}`);
    process.exit(1);
  }
}

console.log('M18-P email notifications design QA passed.');
