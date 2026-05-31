const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'apps/api/src/modules/openai-copilot/openai-copilot.module.ts',
  'apps/api/src/modules/openai-copilot/openai-copilot.controller.ts',
  'apps/api/src/modules/openai-copilot/openai-copilot.service.ts',
  'apps/api/src/modules/openai-copilot/openai-redaction.service.ts',
  'apps/api/src/modules/openai-copilot/openai-output-guard.service.ts',
  'apps/api/src/modules/openai-copilot/openai-adapter.service.ts',
  'apps/api/src/modules/openai-copilot/entities/openai-prompt-template.entity.ts',
  'apps/api/src/modules/openai-copilot/entities/openai-request.entity.ts',
  'apps/api/src/modules/openai-copilot/entities/openai-usage-ledger.entity.ts',
  'apps/api/src/modules/openai-copilot/entities/openai-copilot-draft.entity.ts',
  'apps/web/app/admin/openai-copilot/page.tsx',
  'apps/web/components/openai-copilot/CopilotStatusPanel.tsx',
  'docs/sprints/M17-S_OPENAI_ASSISTED_OPERATIONS_CONTENT_COPILOT_DEVELOPMENT.md',
  'docs/releases/0.62.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing files:', missing);
  process.exit(1);
}

const service = fs.readFileSync(path.join(root, 'apps/api/src/modules/openai-copilot/openai-copilot.service.ts'), 'utf8');
const checks = [
  'OpenAI copilot disabilitato da admin settings',
  'Use case OpenAI non abilitato',
  'redaction.redact',
  'outputGuard.validateOutput',
  'usageLedger.save',
  'requiresHumanReview',
];
for (const needle of checks) {
  if (!service.includes(needle)) {
    console.error(`OpenAI copilot service missing guard: ${needle}`);
    process.exit(1);
  }
}

const guard = fs.readFileSync(path.join(root, 'apps/api/src/modules/openai-copilot/openai-output-guard.service.ts'), 'utf8');
for (const banned of ['rischio zero', 'pagamento garantito', 'solvibilita garantita']) {
  if (!guard.includes(banned)) {
    console.error(`Output guard missing banned claim: ${banned}`);
    process.exit(1);
  }
}

const app = fs.readFileSync(path.join(root, 'apps/api/src/app.module.ts'), 'utf8');
for (const needle of ['OpenaiCopilotModule', 'OpenaiPromptTemplate', 'OpenaiRequest', 'OpenaiUsageLedgerEntry', 'OpenaiCopilotDraft']) {
  if (!app.includes(needle)) {
    console.error(`AppModule missing ${needle}`);
    process.exit(1);
  }
}

const ui = fs.readFileSync(path.join(root, 'apps/web/app/admin/openai-copilot/page.tsx'), 'utf8');
if (!ui.includes('OpenAI copilot interno') || !ui.includes('bozza')) {
  console.error('Admin UI does not communicate internal copilot / draft mode.');
  process.exit(1);
}

console.log('qa-openai-copilot-development passed');
