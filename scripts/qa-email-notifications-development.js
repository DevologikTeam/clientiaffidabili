#!/usr/bin/env node
const fs = require('fs');

const requiredFiles = [
  'apps/api/src/modules/email-notifications/email-notifications.module.ts',
  'apps/api/src/modules/email-notifications/email-notifications.service.ts',
  'apps/api/src/modules/email-notifications/email-notifications.controller.ts',
  'apps/api/src/modules/email-notifications/email-notifications-admin.controller.ts',
  'apps/api/src/modules/email-notifications/email-provider.adapter.ts',
  'apps/api/src/modules/email-notifications/email-redaction.service.ts',
  'apps/api/src/modules/email-notifications/email-renderer.service.ts',
  'apps/api/src/modules/email-notifications/email-secure-link.service.ts',
  'apps/api/src/modules/email-notifications/entities/email-event.entity.ts',
  'apps/api/src/modules/email-notifications/entities/email-delivery.entity.ts',
  'apps/api/src/modules/email-notifications/entities/email-suppression.entity.ts',
  'apps/api/src/modules/email-notifications/entities/email-secure-link.entity.ts',
  'apps/api/src/modules/email-notifications/entities/email-provider-webhook-event.entity.ts',
  'apps/web/app/admin/email-notifications/page.tsx',
  'apps/web/components/email-notifications/EmailDeliveryTable.tsx',
  'docs/sprints/M18-S_EMAIL_CUSTOMER_NOTIFICATIONS_DEVELOPMENT.md',
  'docs/email-notifications/29_PDF_SECURE_LINK_EMAIL_RUNTIME.md'
];

const requiredContent = [
  ['apps/api/src/modules/email-notifications/email-notifications.service.ts', 'queue(input: QueueEmailInput)'],
  ['apps/api/src/modules/email-notifications/email-notifications.service.ts', 'suppressionRepo'],
  ['apps/api/src/modules/email-notifications/email-notifications.service.ts', 'recordProviderWebhook'],
  ['apps/api/src/modules/email-notifications/email-secure-link.service.ts', 'tokenHash'],
  ['apps/api/src/modules/email-notifications/email-redaction.service.ts', 'sanitizePayload'],
  ['apps/api/src/app.module.ts', 'EmailNotificationsModule'],
  ['apps/api/src/app.module.ts', 'EmailDelivery'],
  ['apps/web/app/admin/email-notifications/page.tsx', 'Email tecniche e notifiche cliente']
];

const failures = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) failures.push(`Missing required file: ${file}`);
}
for (const [file, needle] of requiredContent) {
  if (!fs.existsSync(file) || !fs.readFileSync(file, 'utf8').includes(needle)) {
    failures.push(`Missing content '${needle}' in ${file}`);
  }
}

const controller = fs.existsSync('apps/api/src/modules/email-notifications/email-notifications.controller.ts')
  ? fs.readFileSync('apps/api/src/modules/email-notifications/email-notifications.controller.ts', 'utf8')
  : '';
if (controller.includes('provider.send(')) failures.push('Controller must not call provider.send directly.');

const sensitiveNeedles = ['rawProviderPayload', 'cardNumber', 'ibanFull', 'openaiPrompt'];
const redaction = fs.existsSync('apps/api/src/modules/email-notifications/email-redaction.service.ts')
  ? fs.readFileSync('apps/api/src/modules/email-notifications/email-redaction.service.ts', 'utf8')
  : '';
for (const needle of sensitiveNeedles) {
  if (!redaction.includes(needle)) failures.push(`Email redaction service must cover ${needle}.`);
}

if (failures.length) {
  console.error('M18-S email notifications development QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('M18-S email notifications development QA passed.');
