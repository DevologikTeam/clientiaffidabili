export type RcHardeningGateStatus = "not_started" | "ready_to_run" | "running" | "passed" | "failed" | "blocked" | "waived_with_feature_off";

export type RcHardeningGateContract = {
  id: string;
  label: string;
  owner: string;
  status: RcHardeningGateStatus;
  blocksReleaseCandidate: boolean;
  requiredEvidence: string[];
};

export const rcHardeningAnalysisGateContracts: RcHardeningGateContract[] = [
  {
    id: "rc-build-typecheck-docker",
    label: "Build, typecheck, Docker and CI gate",
    owner: "Tech Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["pnpm build log", "Docker build log", "healthcheck smoke log"],
  },
  {
    id: "rc-env-secrets",
    label: "Runtime config and secrets gate",
    owner: "Security Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["secret scan", "production env diff", "feature flag export"],
  },
  {
    id: "rc-database-restore",
    label: "Database migration, backup and restore gate",
    owner: "Backend Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["migration baseline", "backup log", "restore drill log"],
  },
  {
    id: "rc-provider-sandbox",
    label: "Provider sandbox certification gate",
    owner: "Operations Lead",
    status: "not_started",
    blocksReleaseCandidate: true,
    requiredEvidence: ["sandbox run", "error ledger review", "waiver ledger if disabled"],
  },
];
