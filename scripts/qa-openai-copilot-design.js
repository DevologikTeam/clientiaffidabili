const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M17-P_OPENAI_ASSISTED_OPERATIONS_CONTENT_COPILOT_DESIGN.md',
  'docs/openai-copilot/09_COPILOT_EXPERIENCE_BLUEPRINT.md',
  'docs/openai-copilot/10_OPENAI_SETTINGS_AND_SECRET_BLUEPRINT.md',
  'docs/openai-copilot/11_PROMPT_REGISTRY_OUTPUT_SCHEMA_BLUEPRINT.md',
  'docs/openai-copilot/12_REDACTION_CONTEXT_PACK_BLUEPRINT.md',
  'docs/openai-copilot/13_APPROVAL_AUDIT_WORKFLOW_BLUEPRINT.md',
  'docs/openai-copilot/14_USAGE_COST_ERROR_LEDGER_BLUEPRINT.md',
  'docs/openai-copilot/15_COPILOT_UI_COMPONENTS_BLUEPRINT.md',
  'docs/openai-copilot/16_M17S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/openai-copilot/openai-copilot-design.types.ts',
  'apps/api/src/modules/openai-copilot/openai-prompt-registry.ts',
  'apps/web/lib/openai-copilot/openai-copilot-design.ts',
];

const mustContain = [
  'AI propone',
  'Admin verifica',
  'redaction',
  'budget',
  'error ledger',
  'approval',
  'secret',
  'rischio zero',
  'pagamento garantito',
  'solvibilita',
];

let failed = false;
for (const rel of required) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${rel}`);
    failed = true;
  }
}

const corpus = required
  .filter((rel) => fs.existsSync(path.join(root, rel)))
  .map((rel) => fs.readFileSync(path.join(root, rel), 'utf8'))
  .join('\n');

for (const term of mustContain) {
  if (!corpus.toLowerCase().includes(term.toLowerCase())) {
    console.error(`Missing required design term: ${term}`);
    failed = true;
  }
}

if (/OPENAI_API_KEY\s*=\s*sk-/.test(corpus) || /sk-proj-[A-Za-z0-9_-]{8,}/.test(corpus)) {
  console.error('Potential hardcoded OpenAI API key detected in design corpus.');
  failed = true;
}

if (!corpus.includes('metadata_only')) {
  console.error('Expected metadata_only logging policy not found.');
  failed = true;
}

if (failed) process.exit(1);
console.log('qa-openai-copilot-design: passed');
