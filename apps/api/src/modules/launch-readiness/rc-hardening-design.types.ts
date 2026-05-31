export type RcDesignGateStatus = "not_started" | "ready_to_run" | "running" | "passed" | "failed" | "blocked" | "waived_with_feature_off";

export type RcDesignGateContract = {
  id: string;
  blockerCode: string;
  label: string;
  owner: string;
  status: RcDesignGateStatus;
  blocksReleaseCandidate: boolean;
  requiredEvidence: string[];
  waiverAllowed: boolean;
  featureFlagRequiredForWaiver: boolean;
};

export type RcEvidenceBundleContract = {
  release: string;
  candidate: string;
  overallStatus: "blocked" | "ready_for_rc" | "failed";
  gates: RcDesignGateContract[];
  waivers: Array<{ gateId: string; reason: string; featureFlag: string; approvedBy: string }>;
  artifacts: Array<{ id: string; path: string; requiredForRc: boolean }>;
  signoffs: Array<{ role: string; required: boolean }>;
};

export const rcHardeningDesignGateContracts: RcDesignGateContract[] = [
  {
    id: "rc-build-typecheck-docker",
    blockerCode: "RC-P0-001",
    label: "Build, typecheck, Docker and healthcheck",
    owner: "Tech Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["pnpm build log", "typecheck log", "Docker build log", "healthcheck summary"],
    waiverAllowed: false,
    featureFlagRequiredForWaiver: false,
  },
  {
    id: "rc-dependency-freeze",
    blockerCode: "RC-P0-002",
    label: "Dependency freeze and lockfile",
    owner: "Tech Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["pnpm-lock.yaml", "freeze summary"],
    waiverAllowed: false,
    featureFlagRequiredForWaiver: false,
  },
  {
    id: "rc-env-secrets-feature-flags",
    blockerCode: "RC-P0-003",
    label: "Runtime config, secrets and feature flags",
    owner: "Security Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["secret scan", "production env diff", "ENABLE_DEMO_DATA=false proof"],
    waiverAllowed: false,
    featureFlagRequiredForWaiver: false,
  },
  {
    id: "rc-database-migration-restore",
    blockerCode: "RC-P0-004",
    label: "Database migration, backup and restore",
    owner: "Backend Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["migration baseline", "backup log", "restore drill log", "rollback plan"],
    waiverAllowed: false,
    featureFlagRequiredForWaiver: false,
  },
  {
    id: "rc-provider-sandbox-certification",
    blockerCode: "RC-P0-005",
    label: "Provider sandbox certification",
    owner: "Operations Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["sandbox run", "provider error ledger", "waiver ledger if disabled"],
    waiverAllowed: true,
    featureFlagRequiredForWaiver: true,
  },
  {
    id: "rc-browser-e2e-real",
    blockerCode: "RC-P0-006",
    label: "Real browser E2E",
    owner: "QA Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["Playwright report", "screenshots", "failure triage"],
    waiverAllowed: false,
    featureFlagRequiredForWaiver: false,
  },
  {
    id: "rc-security-privacy-freeze",
    blockerCode: "RC-P0-007",
    label: "Security and privacy freeze",
    owner: "Security Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["secret scan", "sensitive route noindex export", "tracking denylist"],
    waiverAllowed: false,
    featureFlagRequiredForWaiver: false,
  },
  {
    id: "rc-evidence-bundle-signoff",
    blockerCode: "RC-P0-008",
    label: "Evidence bundle and owner sign-off",
    owner: "Product Owner",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["evidence bundle JSON", "risk register", "owner signoffs"],
    waiverAllowed: false,
    featureFlagRequiredForWaiver: false,
  },
];

export const rcEvidenceBundleDesignContract: RcEvidenceBundleContract = {
  release: "0.73.0",
  candidate: "M21-S",
  overallStatus: "blocked",
  gates: rcHardeningDesignGateContracts,
  waivers: [],
  artifacts: [
    { id: "artifact-build-log", path: "artifacts/rc-hardening/build/pnpm-build.log", requiredForRc: true },
    { id: "artifact-docker-log", path: "artifacts/rc-hardening/build/docker-build.log", requiredForRc: true },
    { id: "artifact-db-restore", path: "artifacts/rc-hardening/database/restore-drill.log", requiredForRc: true },
    { id: "artifact-provider-sandbox", path: "artifacts/rc-hardening/providers/sandbox-certification.json", requiredForRc: true },
    { id: "artifact-evidence-bundle", path: "artifacts/rc-hardening/m21s-rc-evidence-bundle.json", requiredForRc: true },
  ],
  signoffs: [
    { role: "Tech Lead", required: true },
    { role: "Backend Lead", required: true },
    { role: "Security/Privacy Lead", required: true },
    { role: "Operations Lead", required: true },
    { role: "Product Owner", required: true },
  ],
};
