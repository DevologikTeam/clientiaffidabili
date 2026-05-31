export type RcHardeningDesignPriority = "P0" | "P1" | "P2";

export type RcHardeningGateStatus =
  | "not_started"
  | "ready_to_run"
  | "running"
  | "passed"
  | "failed"
  | "blocked"
  | "waived_with_feature_off";

export type RcHardeningGateArea =
  | "build_ci"
  | "dependency_freeze"
  | "env_secrets"
  | "database_restore"
  | "provider_cutover"
  | "browser_e2e"
  | "security_privacy"
  | "observability_support"
  | "evidence_signoff";

export type RcHardeningDesignGate = {
  id: string;
  blockerCode: string;
  area: RcHardeningGateArea;
  priority: RcHardeningDesignPriority;
  owner: string;
  defaultStatus: RcHardeningGateStatus;
  blocksReleaseCandidate: boolean;
  requiredEvidence: string[];
  passRule: string;
  m21sImplementation: string;
};

export type RcHardeningWaiverRule = {
  id: string;
  appliesToGate: string;
  allowedStatus: "waived_with_feature_off";
  requiredControls: string[];
  blocksIfMissingControl: boolean;
};

export type RcHardeningEvidenceArtifact = {
  id: string;
  path: string;
  producedByGate: string;
  requiredForRc: boolean;
  redactionRule: string;
};

export type RcHardeningCutoverProvider = {
  id: string;
  provider: "stripe" | "paypal" | "openapi" | "openai" | "email_pdf";
  requiredSandboxScenarios: string[];
  liveEnablementRule: string;
  rollbackRule: string;
};

export const m21pRcHardeningDesignVersion = "0.73.0";

export const m21pRcHardeningGates: RcHardeningDesignGate[] = [
  {
    id: "rc-build-typecheck-docker",
    blockerCode: "RC-P0-001",
    area: "build_ci",
    priority: "P0",
    owner: "Tech Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["pnpm build log", "typecheck log", "docker compose build log", "healthcheck summary"],
    passRule: "All build, typecheck, Docker and healthcheck commands must pass in the target environment.",
    m21sImplementation: "Add RC gate runner entries and evidence file contracts for build and healthcheck logs.",
  },
  {
    id: "rc-dependency-freeze",
    blockerCode: "RC-P0-002",
    area: "dependency_freeze",
    priority: "P0",
    owner: "Tech Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["pnpm-lock.yaml", "dependency freeze summary"],
    passRule: "A lockfile must be present and any dependency update after freeze must reopen the build gate.",
    m21sImplementation: "Add static gate that records lockfile presence and blocks RC when absent.",
  },
  {
    id: "rc-env-secrets-feature-flags",
    blockerCode: "RC-P0-003",
    area: "env_secrets",
    priority: "P0",
    owner: "Security Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["secret scan log", "environment diff without secret values", "feature flag export", "ENABLE_DEMO_DATA=false proof"],
    passRule: "No exposed secrets, demo data disabled in production and uncertified features off.",
    m21sImplementation: "Add production configuration guard and feature flag evidence export.",
  },
  {
    id: "rc-database-migration-restore",
    blockerCode: "RC-P0-004",
    area: "database_restore",
    priority: "P0",
    owner: "Backend Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["migration baseline", "backup log", "restore drill log", "rollback plan"],
    passRule: "Baseline migration, backup and restore drill must exist before RC sign-off.",
    m21sImplementation: "Expose database gate as blocked until migration and restore artifacts are attached.",
  },
  {
    id: "rc-provider-sandbox-certification",
    blockerCode: "RC-P0-005",
    area: "provider_cutover",
    priority: "P0",
    owner: "Operations Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["sandbox run export", "provider error ledger", "webhook replay log", "waiver ledger when feature off"],
    passRule: "Each provider included in RC must pass sandbox; excluded providers require feature-off waiver.",
    m21sImplementation: "Connect M19-S sandbox certification status to RC gate summary.",
  },
  {
    id: "rc-browser-e2e-real",
    blockerCode: "RC-P0-006",
    area: "browser_e2e",
    priority: "P0",
    owner: "QA Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["Playwright report", "browser screenshots", "failure triage summary"],
    passRule: "The real Playwright suite must pass or failures must be explicitly resolved before RC.",
    m21sImplementation: "Add artifact slots and admin UI status for E2E report availability.",
  },
  {
    id: "rc-security-privacy-freeze",
    blockerCode: "RC-P0-007",
    area: "security_privacy",
    priority: "P0",
    owner: "Security Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["secret scan", "sensitive route noindex export", "tracking denylist export", "PII redaction review"],
    passRule: "Sensitive data, tracking, noindex and secret controls must be frozen before RC.",
    m21sImplementation: "Aggregate existing M20-S SEO/privacy gates into RC hardening bundle.",
  },
  {
    id: "rc-evidence-bundle-signoff",
    blockerCode: "RC-P0-008",
    area: "evidence_signoff",
    priority: "P0",
    owner: "Product Owner",
    defaultStatus: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["evidence bundle JSON", "risk register", "owner signoffs", "release notes draft"],
    passRule: "The final bundle must show no open blocking P0 gates and must list all waivers.",
    m21sImplementation: "Generate m21s evidence bundle from gate registry and artifact inventory.",
  },
  {
    id: "rc-observability-support-runbook",
    blockerCode: "RC-P1-001",
    area: "observability_support",
    priority: "P1",
    owner: "Operations Lead",
    defaultStatus: "not_started",
    blocksReleaseCandidate: false,
    requiredEvidence: ["support runbook", "error ledger summary", "rollback contact path"],
    passRule: "P1 can remain open only with owner, action plan and accepted risk.",
    m21sImplementation: "Show support and runbook readiness in the command center without blocking the RC by default.",
  },
];

export const m21pRcHardeningWaiverRules: RcHardeningWaiverRule[] = [
  {
    id: "waiver-feature-off-only",
    appliesToGate: "rc-provider-sandbox-certification",
    allowedStatus: "waived_with_feature_off",
    requiredControls: ["feature flag disabled", "UI path disabled", "release note declares excluded feature", "owner assigned"],
    blocksIfMissingControl: true,
  },
  {
    id: "waiver-no-unverified-live-provider",
    appliesToGate: "rc-provider-sandbox-certification",
    allowedStatus: "waived_with_feature_off",
    requiredControls: ["live credentials not active", "sandbox not marketed as production", "error ledger monitoring enabled"],
    blocksIfMissingControl: true,
  },
];

export const m21pRcHardeningEvidenceArtifacts: RcHardeningEvidenceArtifact[] = [
  {
    id: "artifact-build-log",
    path: "artifacts/rc-hardening/build/pnpm-build.log",
    producedByGate: "rc-build-typecheck-docker",
    requiredForRc: true,
    redactionRule: "No environment values or credentials in logs.",
  },
  {
    id: "artifact-docker-log",
    path: "artifacts/rc-hardening/build/docker-build.log",
    producedByGate: "rc-build-typecheck-docker",
    requiredForRc: true,
    redactionRule: "Keep image digest, remove registry credentials.",
  },
  {
    id: "artifact-db-restore",
    path: "artifacts/rc-hardening/database/restore-drill.log",
    producedByGate: "rc-database-migration-restore",
    requiredForRc: true,
    redactionRule: "No real customer data in restore evidence.",
  },
  {
    id: "artifact-provider-sandbox",
    path: "artifacts/rc-hardening/providers/sandbox-certification.json",
    producedByGate: "rc-provider-sandbox-certification",
    requiredForRc: true,
    redactionRule: "Mask provider payloads and tokens.",
  },
  {
    id: "artifact-evidence-bundle",
    path: "artifacts/rc-hardening/m21s-rc-evidence-bundle.json",
    producedByGate: "rc-evidence-bundle-signoff",
    requiredForRc: true,
    redactionRule: "Bundle must contain statuses and references, not secrets.",
  },
];

export const m21pRcHardeningProviderCutover: RcHardeningCutoverProvider[] = [
  {
    id: "provider-stripe-cutover",
    provider: "stripe",
    requiredSandboxScenarios: ["checkout success", "webhook idempotency", "refund", "dispute"],
    liveEnablementRule: "Enable live only after sandbox passed and payment feature flag is on for the approved scope.",
    rollbackRule: "Disable payment flag, stop checkout entry points and review payment ledger.",
  },
  {
    id: "provider-paypal-cutover",
    provider: "paypal",
    requiredSandboxScenarios: ["order capture", "subscription", "refund", "webhook replay"],
    liveEnablementRule: "Enable live only after sandbox passed or keep PayPal waived with feature off.",
    rollbackRule: "Disable PayPal flag and keep Stripe or manual support path if approved.",
  },
  {
    id: "provider-openapi-cutover",
    provider: "openapi",
    requiredSandboxScenarios: ["request accepted", "report completed", "provider error", "document delivery"],
    liveEnablementRule: "Enable only for products with mapped listino and tested report lifecycle.",
    rollbackRule: "Disable report ordering and keep support notification active.",
  },
  {
    id: "provider-openai-cutover",
    provider: "openai",
    requiredSandboxScenarios: ["safe prompt", "rate limit", "fallback", "error ledger"],
    liveEnablementRule: "Enable only for admin/customer assisted operations that have fallback and no sensitive data leak.",
    rollbackRule: "Disable AI flag and fall back to manual copy/support workflows.",
  },
  {
    id: "provider-email-pdf-cutover",
    provider: "email_pdf",
    requiredSandboxScenarios: ["technical email sent", "bounce", "secure PDF link", "suppression"],
    liveEnablementRule: "Enable live email only after templates, bounce handling and secure link policies pass.",
    rollbackRule: "Pause transactional sends that are not legally required and route support manually.",
  },
];

export function getM21pBlockingRcGates() {
  return m21pRcHardeningGates.filter((gate) => gate.blocksReleaseCandidate);
}

export function getM21pGateById(id: string) {
  return m21pRcHardeningGates.find((gate) => gate.id === id);
}
