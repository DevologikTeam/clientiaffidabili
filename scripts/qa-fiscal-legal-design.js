#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const required = [
  'docs/sprints/M10-P_FISCALITA_FATTURAZIONE_CUSTOMER_LEGAL_DESIGN.md',
  'docs/fiscal-legal/10_FISCAL_LEGAL_EXPERIENCE_BLUEPRINT.md',
  'docs/fiscal-legal/11_CUSTOMER_TAX_PROFILE_BLUEPRINT.md',
  'docs/fiscal-legal/12_FISCAL_DOCUMENT_LIFECYCLE_BLUEPRINT.md',
  'docs/fiscal-legal/13_REFUND_CREDIT_NOTE_BLUEPRINT.md',
  'docs/fiscal-legal/14_LEGAL_PACK_VERSIONING_BLUEPRINT.md',
  'docs/fiscal-legal/15_CONSENT_ACCEPTANCE_CHECKOUT_BLUEPRINT.md',
  'docs/fiscal-legal/16_CUSTOMER_FISCAL_LEGAL_DASHBOARD_BLUEPRINT.md',
  'docs/fiscal-legal/17_ADMIN_FISCAL_LEGAL_OPERATIONS_BLUEPRINT.md',
  'docs/fiscal-legal/18_FISCAL_LEGAL_API_CONTRACTS.md',
  'docs/fiscal-legal/19_M10S_IMPLEMENTATION_HANDOFF.md',
  'docs/research/M10P_FISCAL_LEGAL_SOURCE_NOTES.md',
  'apps/api/src/modules/fiscal-legal/fiscal-legal.types.ts',
  'apps/api/src/modules/fiscal-legal/fiscal-legal-design.registry.ts',
  'apps/web/lib/fiscal-legal/fiscal-legal-design.ts',
  'docs/qa/M10-P_QA_REPORT.md',
  'docs/releases/0.33.0.md',
];

for (const rel of required) {
  if (!fs.existsSync(rel)) throw new Error(`Missing required M10-P file: ${rel}`);
  const text = fs.readFileSync(rel, 'utf8');
  if (text.trim().length < 250) throw new Error(`M10-P file too small: ${rel}`);
}

const sprint = fs.readFileSync('docs/sprints/M10-P_FISCALITA_FATTURAZIONE_CUSTOMER_LEGAL_DESIGN.md', 'utf8').toLowerCase();
for (const term of ['fatturazione', 'rimborsi', 'note credito', 'legal pack', 'versionato', 'commercialista']) {
  if (!sprint.includes(term)) throw new Error(`M10-P sprint missing term: ${term}`);
}

const legalPack = fs.readFileSync('docs/fiscal-legal/14_LEGAL_PACK_VERSIONING_BLUEPRINT.md', 'utf8');
for (const phrase of ['Termini di servizio', 'Privacy policy', 'Cookie policy', 'Refund policy', 'Acceptable Use', 'Report disclaimer']) {
  if (!legalPack.includes(phrase)) throw new Error(`Legal pack blueprint missing ${phrase}`);
}

const refund = fs.readFileSync('docs/fiscal-legal/13_REFUND_CREDIT_NOTE_BLUEPRINT.md', 'utf8').toLowerCase();
for (const phrase of ['fattura emessa', 'nota credito', 'dispute aperta', 'reason obbligatoria']) {
  if (!refund.includes(phrase)) throw new Error(`Refund blueprint missing ${phrase}`);
}

const registry = fs.readFileSync('apps/api/src/modules/fiscal-legal/fiscal-legal-design.registry.ts', 'utf8');
for (const needle of ['mandatoryCheckoutLegalDocuments', 'requiresReason', 'canCheckoutProceed']) {
  if (!registry.includes(needle)) throw new Error(`Fiscal legal registry missing ${needle}`);
}

console.log('qa-fiscal-legal-design: passed');
