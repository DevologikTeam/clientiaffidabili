#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M17-A_OPENAI_ASSISTED_OPERATIONS_CONTENT_COPILOT_ANALYSIS.md',
  'docs/openai-copilot/01_OPENAI_COPILOT_PRODUCT_STRATEGY.md',
  'docs/openai-copilot/02_USE_CASE_RISK_MATRIX_ANALYSIS.md',
  'docs/openai-copilot/03_DATA_REDACTION_PRIVACY_ANALYSIS.md',
  'docs/openai-copilot/04_PROMPT_REGISTRY_AND_OUTPUT_GUARDRAILS_ANALYSIS.md',
  'docs/openai-copilot/05_OPENAI_SETTINGS_COST_USAGE_ANALYSIS.md',
  'docs/openai-copilot/06_APPROVAL_AUDIT_ERROR_LEDGER_ANALYSIS.md',
  'docs/openai-copilot/07_ADMIN_UX_COPILOT_ANALYSIS.md',
  'docs/openai-copilot/08_M17P_M17S_READINESS_CHECKLIST.md',
  'docs/research/M17A_OPENAI_COPILOT_SOURCE_NOTES.md',
  'apps/api/src/modules/openai-copilot/openai-copilot.analysis.ts',
  'apps/web/lib/openai-copilot/openai-copilot-analysis.ts',
  'docs/releases/0.60.0.md'
];

const fail = (message) => { console.error(`[qa-openai-copilot-analysis] ${message}`); process.exit(1); };
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing required file: ${file}`);
}

const sprint = read('docs/sprints/M17-A_OPENAI_ASSISTED_OPERATIONS_CONTENT_COPILOT_ANALYSIS.md');
for (const needle of [
  'AI propone -> Admin verifica -> Admin approva -> Sistema audita',
  'OpenAI disabilitato di default',
  'Redaction prima di ogni richiesta',
  'Budget giornaliero/mensile',
  'Error ledger',
  'No PII'
]) {
  if (!sprint.includes(needle)) fail(`Sprint analysis missing guardrail: ${needle}`);
}

const privacy = read('docs/openai-copilot/03_DATA_REDACTION_PRIVACY_ANALYSIS.md');
for (const forbidden of ['numeri carta', 'IBAN completo', 'API key', 'raw payload provider', 'IP in chiaro']) {
  if (!privacy.includes(forbidden)) fail(`Redaction analysis missing forbidden data: ${forbidden}`);
}

const prompts = read('docs/openai-copilot/04_PROMPT_REGISTRY_AND_OUTPUT_GUARDRAILS_ANALYSIS.md');
for (const claim of ['rischio zero', 'pagamento garantito', 'solvibilita']) {
  if (!prompts.includes(claim)) fail(`Prompt guardrails missing forbidden claim: ${claim}`);
}

const api = read('apps/api/src/modules/openai-copilot/openai-copilot.analysis.ts');
for (const needle of ['disabled_by_default', 'backend_only', 'redaction_before_request', 'human_approval_required', 'no_automatic_decisions']) {
  if (!api.includes(needle)) fail(`API analysis missing required guardrail: ${needle}`);
}
if (!api.includes('defaultEnabled: false')) fail('OpenAI use cases must be disabled by default.');
if (api.includes('canPublishAutomatically: true')) fail('No MVP AI use case may publish automatically.');

const web = read('apps/web/lib/openai-copilot/openai-copilot-analysis.ts');
if (!web.includes('publicChatbot: false')) fail('Public chatbot must be disabled for MVP.');
if (!web.includes('automaticSensitiveActions: false')) fail('Automatic sensitive actions must be disabled.');

console.log('[qa-openai-copilot-analysis] passed');
