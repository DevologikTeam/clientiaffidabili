export type RcRuntimeGateStatus = 'ready_to_run' | 'passed' | 'failed' | 'blocked' | 'waived_with_feature_off';

export type RcRuntimeGateArea =
  | 'build_ci'
  | 'dependency_freeze'
  | 'env_secrets'
  | 'database_restore'
  | 'provider_cutover'
  | 'browser_e2e'
  | 'security_privacy'
  | 'observability_support'
  | 'evidence_signoff';

export type RcRuntimeGateContract = {
  id: string;
  blockerCode: string;
  area: RcRuntimeGateArea;
  label: string;
  owner: string;
  status: RcRuntimeGateStatus;
  blocksReleaseCandidate: boolean;
  requiredEvidence: string[];
  attachedArtifacts: string[];
  missingEvidence: string[];
  nextAction: string;
  waiverAllowed: boolean;
  waiverControl?: string;
};

export type RcRuntimeSummaryContract = {
  release: string;
  overallStatus: 'blocked' | 'ready_for_rc' | 'failed';
  generatedAt: string;
  total: number;
  blocking: number;
  openBlocking: number;
  passed: number;
  readyToRun: number;
  blocked: number;
  waived: number;
  gates: RcRuntimeGateContract[];
};

export type RcRuntimeEvidenceBundleContract = {
  release: string;
  sprint: string;
  generatedAt: string;
  overallStatus: 'blocked' | 'ready_for_rc' | 'failed';
  blockingGateCount: number;
  openBlockingGateCount: number;
  gates: RcRuntimeGateContract[];
  artifactInventory: Array<{
    id: string;
    path: string;
    requiredForRc: boolean;
    presentInPackage: boolean;
    redactionRule: string;
  }>;
  signoffs: Array<{
    role: string;
    owner: string;
    required: boolean;
    status: 'pending' | 'signed';
  }>;
};

export const rcHardeningRuntimeVersion = '0.74.2';

export const rcHardeningRuntimeGateContracts: RcRuntimeGateContract[] = [
  {
    id: 'rc-build-typecheck-docker',
    blockerCode: 'RC-P0-001',
    area: 'build_ci',
    label: 'Build, typecheck, Docker and healthcheck reali',
    owner: 'Tech Lead',
    status: 'blocked',
    blocksReleaseCandidate: true,
    requiredEvidence: ['pnpm build log', 'pnpm typecheck log', 'docker compose build log', 'healthcheck summary'],
    attachedArtifacts: ['artifacts/rc-hardening/build/README.md'],
    missingEvidence: ['artifacts/rc-hardening/build/pnpm-build.log', 'artifacts/rc-hardening/build/docker-build.log'],
    nextAction: 'Eseguire build, typecheck e Docker nel target e allegare log redatti.',
    waiverAllowed: false,
  },
  {
    id: 'rc-dependency-freeze',
    blockerCode: 'RC-P0-002',
    area: 'dependency_freeze',
    label: 'Dependency freeze and lockfile',
    owner: 'Tech Lead',
    status: 'blocked',
    blocksReleaseCandidate: true,
    requiredEvidence: ['pnpm-lock.yaml', 'freeze summary'],
    attachedArtifacts: ['artifacts/rc-hardening/m21s-rc-evidence-bundle.json'],
    missingEvidence: ['pnpm-lock.yaml'],
    nextAction: 'Generare lockfile reale e congelare gli update prima della RC.',
    waiverAllowed: false,
  },
  {
    id: 'rc-env-secrets-feature-flags',
    blockerCode: 'RC-P0-003',
    area: 'env_secrets',
    label: 'Runtime config, secrets and feature flags',
    owner: 'Security Lead',
    status: 'ready_to_run',
    blocksReleaseCandidate: true,
    requiredEvidence: ['secret scan log', 'production env diff redatto', 'ENABLE_DEMO_DATA=false proof', 'feature flag export'],
    attachedArtifacts: ['scripts/rc-hardening-production-env-guard.js', 'artifacts/rc-hardening/m21s-production-env-guard.sample.json'],
    missingEvidence: ['production env diff from target'],
    nextAction: 'Eseguire production env guard sul target senza esportare valori segreti.',
    waiverAllowed: false,
  },
  {
    id: 'rc-database-migration-restore',
    blockerCode: 'RC-P0-004',
    area: 'database_restore',
    label: 'Database migration, backup and restore',
    owner: 'Backend Lead',
    status: 'blocked',
    blocksReleaseCandidate: true,
    requiredEvidence: ['migration baseline', 'backup log', 'restore drill log', 'rollback plan'],
    attachedArtifacts: ['artifacts/rc-hardening/database/README.md'],
    missingEvidence: ['apps/api/src/migrations', 'artifacts/rc-hardening/database/restore-drill.log'],
    nextAction: 'Versionare la migration baseline e provare restore drill su database non produttivo.',
    waiverAllowed: false,
  },
  {
    id: 'rc-provider-sandbox-certification',
    blockerCode: 'RC-P0-005',
    area: 'provider_cutover',
    label: 'Provider sandbox certification',
    owner: 'Operations Lead',
    status: 'blocked',
    blocksReleaseCandidate: true,
    requiredEvidence: ['sandbox run export', 'provider error ledger', 'webhook replay log', 'waiver ledger when feature off'],
    attachedArtifacts: ['artifacts/sandbox-certification/latest-run.json', 'artifacts/rc-hardening/providers/README.md'],
    missingEvidence: ['Stripe sandbox reale', 'PayPal sandbox reale', 'Openapi sandbox reale', 'OpenAI sandbox reale', 'email/PDF sandbox reale'],
    nextAction: 'Eseguire sandbox reali o waiver feature-off con UI e live credentials disabilitate.',
    waiverAllowed: true,
    waiverControl: 'waived_with_feature_off consentito solo con feature flag disabilitata, percorso UI spento e nota release.',
  },
  {
    id: 'rc-browser-e2e-real',
    blockerCode: 'RC-P0-006',
    area: 'browser_e2e',
    label: 'Real browser E2E',
    owner: 'QA Lead',
    status: 'blocked',
    blocksReleaseCandidate: true,
    requiredEvidence: ['Playwright report', 'screenshots', 'failure triage summary'],
    attachedArtifacts: ['artifacts/rc-hardening/e2e/README.md'],
    missingEvidence: ['playwright-report', 'test-results'],
    nextAction: 'Eseguire pnpm e2e:ci con servizi avviati e allegare report.',
    waiverAllowed: false,
  },
  {
    id: 'rc-security-privacy-freeze',
    blockerCode: 'RC-P0-007',
    area: 'security_privacy',
    label: 'Security and privacy freeze',
    owner: 'Security Lead',
    status: 'ready_to_run',
    blocksReleaseCandidate: true,
    requiredEvidence: ['secret scan', 'sensitive route noindex export', 'tracking denylist export', 'PII redaction review'],
    attachedArtifacts: ['scripts/security-secret-scan.js', 'apps/web/app/robots.ts', 'apps/web/lib/seo/page-metadata.ts'],
    missingEvidence: ['PII redaction review signed'],
    nextAction: 'Eseguire security/privacy freeze sul commit candidato.',
    waiverAllowed: false,
  },
  {
    id: 'rc-evidence-bundle-signoff',
    blockerCode: 'RC-P0-008',
    area: 'evidence_signoff',
    label: 'Evidence bundle and owner sign-off',
    owner: 'Product Owner',
    status: 'blocked',
    blocksReleaseCandidate: true,
    requiredEvidence: ['evidence bundle JSON', 'risk register', 'owner signoffs', 'release notes draft'],
    attachedArtifacts: ['artifacts/rc-hardening/m21s-rc-evidence-bundle.json', 'docs/releases/0.74.2.md'],
    missingEvidence: ['owner signoffs'],
    nextAction: 'Firmare solo dopo chiusura P0 o waiver feature-off validi.',
    waiverAllowed: false,
  },
  {
    id: 'rc-observability-support-runbook',
    blockerCode: 'RC-P1-001',
    area: 'observability_support',
    label: 'Observability, error ledger and support runbook',
    owner: 'Operations Lead',
    status: 'ready_to_run',
    blocksReleaseCandidate: false,
    requiredEvidence: ['support runbook', 'error ledger summary', 'rollback contact path'],
    attachedArtifacts: ['docs/rc-hardening/22_OBSERVABILITY_SUPPORT_RUNBOOK_RUNTIME.md'],
    missingEvidence: ['target alert routing proof'],
    nextAction: 'Collegare alert routing e responsabilita operative prima del pilot.',
    waiverAllowed: true,
    waiverControl: 'P1 puo restare aperto solo con owner, scadenza e rischio accettato.',
  },
];

export const rcHardeningRuntimeEvidenceBundle: RcRuntimeEvidenceBundleContract = {
  release: rcHardeningRuntimeVersion,
  sprint: 'M21-S RC Hardening Development',
  generatedAt: '2026-05-30T00:00:00.000Z',
  overallStatus: 'blocked',
  blockingGateCount: rcHardeningRuntimeGateContracts.filter((gate) => gate.blocksReleaseCandidate).length,
  openBlockingGateCount: rcHardeningRuntimeGateContracts.filter((gate) => gate.blocksReleaseCandidate && gate.status !== 'passed' && gate.status !== 'waived_with_feature_off').length,
  gates: rcHardeningRuntimeGateContracts,
  artifactInventory: [
    { id: 'artifact-rc-gate-run', path: 'artifacts/rc-hardening/m21s-rc-gate-run.json', requiredForRc: true, presentInPackage: true, redactionRule: 'No secrets.' },
    { id: 'artifact-rc-evidence-bundle', path: 'artifacts/rc-hardening/m21s-rc-evidence-bundle.json', requiredForRc: true, presentInPackage: true, redactionRule: 'No provider payloads.' },
    { id: 'artifact-production-env-guard-sample', path: 'artifacts/rc-hardening/m21s-production-env-guard.sample.json', requiredForRc: false, presentInPackage: true, redactionRule: 'Keys and boolean status only.' },
    { id: 'artifact-build-real-log', path: 'artifacts/rc-hardening/build/pnpm-build.log', requiredForRc: true, presentInPackage: false, redactionRule: 'Redact credentials.' },
    { id: 'artifact-provider-sandbox-real', path: 'artifacts/rc-hardening/providers/sandbox-certification-real.json', requiredForRc: true, presentInPackage: false, redactionRule: 'Mask tokens and payloads.' },
  ],
  signoffs: [
    { role: 'Tech Lead', owner: 'Build e dependency freeze', required: true, status: 'pending' },
    { role: 'Backend Lead', owner: 'Migrazioni, backup e restore', required: true, status: 'pending' },
    { role: 'Security/Privacy Lead', owner: 'Secret, demo data e privacy freeze', required: true, status: 'pending' },
    { role: 'Operations Lead', owner: 'Provider sandbox, rollback e support', required: true, status: 'pending' },
    { role: 'QA Lead', owner: 'Playwright reale e browser evidence', required: true, status: 'pending' },
    { role: 'Product Owner', owner: 'Accettazione RC e release notes', required: true, status: 'pending' },
  ],
};

export function buildRcHardeningRuntimeSummary(): RcRuntimeSummaryContract {
  const gates = rcHardeningRuntimeGateContracts;
  const openBlocking = gates.filter((gate) => gate.blocksReleaseCandidate && gate.status !== 'passed' && gate.status !== 'waived_with_feature_off').length;
  return {
    release: rcHardeningRuntimeVersion,
    overallStatus: openBlocking === 0 ? 'ready_for_rc' : 'blocked',
    generatedAt: new Date().toISOString(),
    total: gates.length,
    blocking: gates.filter((gate) => gate.blocksReleaseCandidate).length,
    openBlocking,
    passed: gates.filter((gate) => gate.status === 'passed').length,
    readyToRun: gates.filter((gate) => gate.status === 'ready_to_run').length,
    blocked: gates.filter((gate) => gate.status === 'blocked').length,
    waived: gates.filter((gate) => gate.status === 'waived_with_feature_off').length,
    gates,
  };
}
