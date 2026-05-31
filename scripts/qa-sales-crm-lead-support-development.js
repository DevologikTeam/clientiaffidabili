#!/usr/bin/env node
const fs = require('fs');

const requiredFiles = [
  'apps/api/src/modules/sales-crm/sales-crm.module.ts',
  'apps/api/src/modules/sales-crm/sales-crm.service.ts',
  'apps/api/src/modules/sales-crm/sales-crm.controller.ts',
  'apps/api/src/modules/sales-crm/sales-crm-admin.controller.ts',
  'apps/api/src/modules/sales-crm/entities/contact-message.entity.ts',
  'apps/api/src/modules/sales-crm/entities/sales-lead.entity.ts',
  'apps/api/src/modules/sales-crm/entities/sales-opportunity.entity.ts',
  'apps/api/src/modules/sales-crm/entities/crm-support-ticket.entity.ts',
  'apps/web/app/contatti/page.tsx',
  'apps/web/app/admin/crm/page.tsx',
  'apps/web/app/admin/crm/inbox/page.tsx',
  'apps/web/components/sales-crm/ContactCaptureForm.tsx',
  'apps/web/components/sales-crm/ContactInboxTable.tsx',
  'apps/web/lib/sales-crm/sales-crm-runtime.ts',
  'docs/sprints/M15-S_SALES_CRM_LEAD_MANAGEMENT_SUPPORT_OPERATIONS_DEVELOPMENT.md',
];

const requiredTokens = [
  ['apps/api/src/modules/sales-crm/sales-crm.service.ts', 'const saved = await this.contactMessages.save(contact);'],
  ['apps/api/src/modules/sales-crm/sales-crm.service.ts', 'await this.emailDelivery.deliver(saved)'],
  ['apps/api/src/modules/sales-crm/sales-crm.service.ts', 'createHash'],
  ['apps/api/src/modules/sales-crm/entities/contact-message.entity.ts', 'ipAddressHash'],
  ['apps/api/src/app.module.ts', 'SalesCrmModule'],
  ['apps/api/src/app.module.ts', 'ContactMessage'],
  ['apps/web/app/contatti/page.tsx', 'ContactCaptureForm'],
  ['apps/web/app/admin/crm/page.tsx', 'AdminCrmSummary'],
  ['docs/sales-crm/19_CRM_PRIVACY_SECURITY_QA_GUARDRAILS.md', 'IP hashato'],
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));
if (missingFiles.length) {
  console.error('Missing files:', missingFiles);
  process.exit(1);
}

const missingTokens = requiredTokens.filter(([file, token]) => !fs.readFileSync(file, 'utf8').includes(token));
if (missingTokens.length) {
  console.error('Missing tokens:', missingTokens);
  process.exit(1);
}

const service = fs.readFileSync('apps/api/src/modules/sales-crm/sales-crm.service.ts', 'utf8');
const saveIndex = service.indexOf('const saved = await this.contactMessages.save(contact);');
const emailIndex = service.indexOf('await this.emailDelivery.deliver(saved)');
if (saveIndex === -1 || emailIndex === -1 || saveIndex > emailIndex) {
  console.error('Save-first-email-second rule is not respected.');
  process.exit(1);
}

console.log('Sales CRM lead/support development QA passed.');
