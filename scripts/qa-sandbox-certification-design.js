const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M19-P_SANDBOX_CERTIFICATION_DESIGN.md',
  'docs/sandbox-certification/10_SANDBOX_CERTIFICATION_EXPERIENCE_BLUEPRINT.md',
  'docs/sandbox-certification/11_SANDBOX_TEST_MATRIX_BLUEPRINT.md',
  'docs/sandbox-certification/12_SANDBOX_PROVIDER_CERTIFICATION_CONTRACTS.md',
  'docs/sandbox-certification/13_SANDBOX_FIXTURE_AND_SEED_BLUEPRINT.md',
  'docs/sandbox-certification/14_SANDBOX_AUTOMATION_AND_E2E_BLUEPRINT.md',
  'docs/sandbox-certification/15_ERROR_LEDGER_REFUND_ROLLBACK_BLUEPRINT.md',
  'docs/sandbox-certification/16_SANDBOX_ADMIN_UI_BLUEPRINT.md',
  'docs/sandbox-certification/17_SANDBOX_API_CONTRACTS_BLUEPRINT.md',
  'docs/sandbox-certification/18_M19S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/sandbox-certification/sandbox-certification-design.types.ts',
  'apps/api/src/modules/sandbox-certification/sandbox-certification-scenario.registry.ts',
  'apps/web/lib/sandbox-certification/sandbox-certification-design.ts',
  'docs/releases/0.67.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing M19-P files:', missing.join('\n'));
  process.exit(1);
}

const combined = required
  .filter((file) => file.endsWith('.md') || file.endsWith('.ts'))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

const mustContain = [
  'Stripe',
  'PayPal',
  'Openapi',
  'OpenAI',
  'Email',
  'PDF',
  'Operational Error Ledger',
  'rimborso',
  'rollback',
  'waiver',
  'feature flag',
  'idempotente',
  'RC',
];

const missingTerms = mustContain.filter((term) => !combined.toLowerCase().includes(term.toLowerCase()));
if (missingTerms.length) {
  console.error('Missing M19-P required concepts:', missingTerms.join(', '));
  process.exit(1);
}

const forbidden = [
  'rischio zero',
  'pagamento garantito',
  'solvibilità garantita',
];
const forbiddenFound = forbidden.filter((term) => combined.toLowerCase().includes(term));
if (forbiddenFound.length) {
  console.error('Forbidden claims found:', forbiddenFound.join(', '));
  process.exit(1);
}

console.log('M19-P sandbox certification design QA passed.');
