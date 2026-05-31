#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'apps/api/src/modules/sandbox-certification/sandbox-certification.module.ts',
  'apps/api/src/modules/sandbox-certification/sandbox-certification.controller.ts',
  'apps/api/src/modules/sandbox-certification/sandbox-certification.service.ts',
  'apps/api/src/modules/sandbox-certification/sandbox-certification.adapter.ts',
  'apps/api/src/modules/sandbox-certification/sandbox-certification-runtime.types.ts',
  'apps/api/src/modules/sandbox-certification/entities/sandbox-scenario.entity.ts',
  'apps/api/src/modules/sandbox-certification/entities/sandbox-certification-run.entity.ts',
  'apps/api/src/modules/sandbox-certification/entities/sandbox-scenario-result.entity.ts',
  'apps/api/src/modules/sandbox-certification/entities/sandbox-evidence.entity.ts',
  'apps/api/src/modules/sandbox-certification/entities/sandbox-waiver.entity.ts',
  'apps/api/src/modules/sandbox-certification/dto/create-sandbox-certification-run.dto.ts',
  'apps/api/src/modules/sandbox-certification/dto/retry-sandbox-scenario.dto.ts',
  'apps/api/src/modules/sandbox-certification/dto/waive-sandbox-scenario.dto.ts',
  'apps/web/lib/sandbox-certification/sandbox-certification-runtime.ts',
  'apps/web/components/sandbox-certification/CertificationSummaryCards.tsx',
  'apps/web/components/sandbox-certification/CertificationScenarioTable.tsx',
  'apps/web/components/sandbox-certification/CertificationRunTimeline.tsx',
  'apps/web/components/sandbox-certification/CertificationEvidenceList.tsx',
  'apps/web/components/sandbox-certification/CertificationBlockerPanel.tsx',
  'apps/web/components/sandbox-certification/CertificationWaiverModal.tsx',
  'apps/web/components/sandbox-certification/CertificationRunbookCard.tsx',
  'apps/web/app/admin/launch-readiness/sandbox-certification/page.tsx',
  'apps/web/app/admin/launch-readiness/sandbox-certification/scenarios/page.tsx',
  'apps/web/app/admin/launch-readiness/sandbox-certification/[runId]/page.tsx',
  'scripts/sandbox-certification-runner.js',
  'scripts/sandbox-certification-static-gate.js',
  'docs/sprints/M19-S_SANDBOX_CERTIFICATION_DEVELOPMENT.md',
  'docs/sandbox-certification/19_SANDBOX_CERTIFICATION_RUNTIME.md',
  'docs/sandbox-certification/20_SANDBOX_RUNNER_AND_PROVIDER_ADAPTERS.md',
  'docs/sandbox-certification/21_SANDBOX_ADMIN_UI_IMPLEMENTATION.md',
  'docs/releases/0.68.0.md',
];

const requiredContent = [
  ['apps/api/src/app.module.ts', 'SandboxCertificationModule'],
  ['apps/api/src/app.module.ts', 'SandboxCertificationRun'],
  ['apps/api/src/modules/sandbox-certification/sandbox-certification.controller.ts', "@Controller('admin/sandbox-certification')"],
  ['apps/api/src/modules/sandbox-certification/sandbox-certification.service.ts', 'recordOperationalError'],
  ['apps/api/src/modules/sandbox-certification/sandbox-certification.service.ts', 'featureDisabled'],
  ['apps/api/src/modules/sandbox-certification/sandbox-certification.adapter.ts', 'MockSandboxCertificationAdapter'],
  ['apps/api/src/modules/sandbox-certification/sandbox-certification.adapter.ts', 'rawProviderPayload'],
  ['apps/api/src/modules/sandbox-certification/entities/sandbox-waiver.entity.ts', 'auditTrail'],
  ['apps/web/app/admin/launch-readiness/sandbox-certification/page.tsx', 'Sandbox certification'],
  ['apps/web/components/sandbox-certification/CertificationBlockerPanel.tsx', 'Operational Error Ledger'],
  ['package.json', 'qa:sandbox-certification-development'],
  ['package.json', 'sandbox:certification:runner'],
];

const failures = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(process.cwd(), file))) failures.push(`Missing required file: ${file}`);
}
for (const [file, needle] of requiredContent) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(needle)) failures.push(`Missing content '${needle}' in ${file}`);
}

const registry = fs.existsSync('apps/api/src/modules/sandbox-certification/sandbox-certification-scenario.registry.ts')
  ? fs.readFileSync('apps/api/src/modules/sandbox-certification/sandbox-certification-scenario.registry.ts', 'utf8')
  : '';
const scenarioIds = Array.from(registry.matchAll(/id: '([^']+)'/g)).map((match) => match[1]);
if (new Set(scenarioIds).size < 12) failures.push('Sandbox registry must include at least 12 scenarios for M19-S breadth.');
for (const area of ['payments.stripe', 'payments.paypal', 'provider.openapi', 'ai.openai', 'email.delivery', 'report.pdf', 'auth.accounts', 'partner.api', 'docker.coolify']) {
  if (!registry.includes(area)) failures.push(`Registry missing area ${area}.`);
}

const service = fs.existsSync('apps/api/src/modules/sandbox-certification/sandbox-certification.service.ts')
  ? fs.readFileSync('apps/api/src/modules/sandbox-certification/sandbox-certification.service.ts', 'utf8')
  : '';
if (service.includes('provider.send(') || service.includes('stripe.checkout.sessions.create(')) failures.push('Sandbox service must not call live providers directly.');
if (!service.includes('OperationalErrorEvent')) failures.push('Sandbox service must integrate OperationalErrorEvent.');

const forbiddenClaims = ['rischio zero', 'pagamento garantito', 'solvibilita garantita', 'solvibilità garantita'];
const combined = requiredFiles.filter((file) => fs.existsSync(file) && !file.startsWith('scripts/')).map((file) => fs.readFileSync(file, 'utf8')).join('\n');
for (const claim of forbiddenClaims) {
  if (combined.toLowerCase().includes(claim)) failures.push(`Forbidden claim found: ${claim}`);
}

const liveKeyPatterns = [/sk_live_[A-Za-z0-9]{20,}/, /pk_live_[A-Za-z0-9]{20,}/, /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/];
for (const pattern of liveKeyPatterns) {
  if (pattern.test(combined)) failures.push(`Live secret pattern found: ${pattern}`);
}

if (failures.length) {
  console.error('M19-S sandbox certification development QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('M19-S sandbox certification development QA passed.');
