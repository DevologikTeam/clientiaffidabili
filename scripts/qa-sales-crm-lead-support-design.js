#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/sprints/M15-P_SALES_CRM_LEAD_MANAGEMENT_SUPPORT_OPERATIONS_DESIGN.md',
  'docs/sales-crm/10_SALES_CRM_EXPERIENCE_BLUEPRINT.md',
  'docs/sales-crm/11_LEAD_CONTACT_TICKET_DATA_MODEL_BLUEPRINT.md',
  'docs/sales-crm/12_CONTACT_INBOX_AND_EMAIL_FALLBACK_BLUEPRINT.md',
  'docs/sales-crm/13_SALES_CRM_API_CONTRACTS_BLUEPRINT.md',
  'docs/sales-crm/14_CRM_UI_COMPONENTS_BLUEPRINT.md',
  'docs/sales-crm/15_M15S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/sales-crm/sales-crm.types.ts',
  'apps/web/lib/sales-crm/sales-crm-design.ts',
];
const missing = required.filter((f) => !fs.existsSync(f));
const inbox = fs.readFileSync('docs/sales-crm/12_CONTACT_INBOX_AND_EMAIL_FALLBACK_BLUEPRINT.md','utf8');
const tokens = ['prima', 'invio email', 'OperationalErrorEvent', 'emailDeliveryStatus'];
const missingTokens = tokens.filter((t) => !inbox.includes(t));
if (missing.length || missingTokens.length) {
  console.error('M15-P Sales CRM design QA failed.');
  if (missing.length) console.error('Missing files:', missing);
  if (missingTokens.length) console.error('Missing contact inbox tokens:', missingTokens);
  process.exit(1);
}
console.log('M15-P Sales CRM design QA passed.');
