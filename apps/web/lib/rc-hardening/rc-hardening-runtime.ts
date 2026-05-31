export type RcRuntimeGateStatus =
  | "ready_to_run"
  | "passed"
  | "failed"
  | "blocked"
  | "waived_with_feature_off";

export type RcRuntimeGateArea =
  | "build_ci"
  | "dependency_freeze"
  | "env_secrets"
  | "database_restore"
  | "provider_cutover"
  | "browser_e2e"
  | "security_privacy"
  | "observability_support"
  | "evidence_signoff";

export type RcRuntimeGate = {
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

export type RcRuntimeEvidenceBundle = {
  release: string;
  sprint: string;
  generatedAt: string;
  overallStatus: "blocked" | "ready_for_rc" | "failed";
  blockingGateCount: number;
  openBlockingGateCount: number;
  gates: RcRuntimeGate[];
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
    status: "pending" | "signed";
  }>;
};

export const m21sRcHardeningRuntimeVersion = "0.74.2";

export const m21sRcRuntimeGates: RcRuntimeGate[] = [
  {
    id: "rc-build-typecheck-docker",
    blockerCode: "RC-P0-001",
    area: "build_ci",
    label: "Build, typecheck, Docker e healthcheck reali",
    owner: "Tech Lead",
    status: "blocked",
    blocksReleaseCandidate: true,
    requiredEvidence: ["pnpm build log", "pnpm typecheck log", "docker compose build log", "healthcheck summary"],
    attachedArtifacts: ["artifacts/rc-hardening/build/README.md"],
    missingEvidence: ["artifacts/rc-hardening/build/pnpm-build.log", "artifacts/rc-hardening/build/docker-build.log"],
    nextAction: "Eseguire pnpm build, pnpm typecheck e docker compose build --no-cache api web in ambiente target, poi allegare i log redatti.",
    waiverAllowed: false,
  },
  {
    id: "rc-dependency-freeze",
    blockerCode: "RC-P0-002",
    area: "dependency_freeze",
    label: "Dependency freeze e lockfile riproducibile",
    owner: "Tech Lead",
    status: "blocked",
    blocksReleaseCandidate: true,
    requiredEvidence: ["pnpm-lock.yaml", "freeze summary", "dependency update policy"],
    attachedArtifacts: ["artifacts/rc-hardening/m21s-rc-evidence-bundle.json"],
    missingEvidence: ["pnpm-lock.yaml"],
    nextAction: "Generare e committare pnpm-lock.yaml nell'ambiente reale oppure bloccare la RC con risk acceptance formale.",
    waiverAllowed: false,
  },
  {
    id: "rc-env-secrets-feature-flags",
    blockerCode: "RC-P0-003",
    area: "env_secrets",
    label: "Runtime config, secret scan e demo data guard",
    owner: "Security Lead",
    status: "ready_to_run",
    blocksReleaseCandidate: true,
    requiredEvidence: ["secret scan log", "production env diff redatto", "ENABLE_DEMO_DATA=false proof", "feature flag export"],
    attachedArtifacts: ["scripts/rc-hardening-production-env-guard.js", "artifacts/rc-hardening/m21s-production-env-guard.sample.json"],
    missingEvidence: ["production env diff from target"],
    nextAction: "Eseguire il production env guard sul target e allegare l'export senza valori segreti.",
    waiverAllowed: false,
  },
  {
    id: "rc-database-migration-restore",
    blockerCode: "RC-P0-004",
    area: "database_restore",
    label: "Migrazioni DB, backup e restore drill",
    owner: "Backend Lead",
    status: "blocked",
    blocksReleaseCandidate: true,
    requiredEvidence: ["migration baseline", "backup log", "restore drill log", "rollback plan"],
    attachedArtifacts: ["artifacts/rc-hardening/database/README.md"],
    missingEvidence: ["apps/api/src/migrations", "artifacts/rc-hardening/database/restore-drill.log"],
    nextAction: "Versionare la baseline migration e provare un restore drill su database non produttivo.",
    waiverAllowed: false,
  },
  {
    id: "rc-provider-sandbox-certification",
    blockerCode: "RC-P0-005",
    area: "provider_cutover",
    label: "Provider sandbox e cutover live controllato",
    owner: "Operations Lead",
    status: "blocked",
    blocksReleaseCandidate: true,
    requiredEvidence: ["sandbox run export", "provider error ledger", "webhook replay log", "waiver ledger when feature off"],
    attachedArtifacts: ["artifacts/sandbox-certification/latest-run.json", "artifacts/rc-hardening/providers/README.md"],
    missingEvidence: ["Stripe sandbox reale", "PayPal sandbox reale", "Openapi sandbox reale", "OpenAI sandbox reale", "email/PDF sandbox reale"],
    nextAction: "Eseguire gli scenari sandbox reali o chiudere ogni provider non certificato con waiver feature-off e UI disabilitata.",
    waiverAllowed: true,
    waiverControl: "waived_with_feature_off consentito solo con feature flag disabilitata, percorso UI spento e nota release.",
  },
  {
    id: "rc-browser-e2e-real",
    blockerCode: "RC-P0-006",
    area: "browser_e2e",
    label: "Playwright reale sui percorsi P0/P1",
    owner: "QA Lead",
    status: "blocked",
    blocksReleaseCandidate: true,
    requiredEvidence: ["Playwright HTML report", "screenshots", "failure triage summary"],
    attachedArtifacts: ["artifacts/rc-hardening/e2e/README.md"],
    missingEvidence: ["playwright-report", "test-results"],
    nextAction: "Eseguire pnpm e2e:ci con servizi avviati e allegare report HTML, screenshot e triage.",
    waiverAllowed: false,
  },
  {
    id: "rc-security-privacy-freeze",
    blockerCode: "RC-P0-007",
    area: "security_privacy",
    label: "Security/privacy freeze, noindex e tracking denylist",
    owner: "Security Lead",
    status: "ready_to_run",
    blocksReleaseCandidate: true,
    requiredEvidence: ["secret scan", "sensitive route noindex export", "tracking denylist export", "PII redaction review"],
    attachedArtifacts: ["scripts/security-secret-scan.js", "apps/web/app/robots.ts", "apps/web/lib/seo/page-metadata.ts"],
    missingEvidence: ["PII redaction review signed"],
    nextAction: "Eseguire secret scan e privacy freeze sul commit candidato, poi firmare l'evidence bundle.",
    waiverAllowed: false,
  },
  {
    id: "rc-evidence-bundle-signoff",
    blockerCode: "RC-P0-008",
    area: "evidence_signoff",
    label: "Evidence bundle e sign-off proprietari",
    owner: "Product Owner",
    status: "blocked",
    blocksReleaseCandidate: true,
    requiredEvidence: ["evidence bundle JSON", "risk register", "owner signoffs", "release notes draft"],
    attachedArtifacts: ["artifacts/rc-hardening/m21s-rc-evidence-bundle.json", "docs/releases/0.74.2.md"],
    missingEvidence: ["owner signoffs"],
    nextAction: "Firmare il bundle solo dopo chiusura dei P0 o waiver feature-off validi.",
    waiverAllowed: false,
  },
  {
    id: "rc-observability-support-runbook",
    blockerCode: "RC-P1-001",
    area: "observability_support",
    label: "Osservabilita, error ledger e support runbook",
    owner: "Operations Lead",
    status: "ready_to_run",
    blocksReleaseCandidate: false,
    requiredEvidence: ["support runbook", "error ledger summary", "rollback contact path"],
    attachedArtifacts: ["docs/rc-hardening/22_OBSERVABILITY_SUPPORT_RUNBOOK_RUNTIME.md"],
    missingEvidence: ["target alert routing proof"],
    nextAction: "Collegare alert routing e responsabilita operative prima del pilot.",
    waiverAllowed: true,
    waiverControl: "P1 puo restare aperto solo con owner, scadenza e rischio accettato.",
  },
];

export const m21sRcArtifactInventory = [
  {
    id: "artifact-rc-gate-run",
    path: "artifacts/rc-hardening/m21s-rc-gate-run.json",
    requiredForRc: true,
    presentInPackage: true,
    redactionRule: "Contiene solo stati, path e missing evidence; nessun segreto.",
  },
  {
    id: "artifact-rc-evidence-bundle",
    path: "artifacts/rc-hardening/m21s-rc-evidence-bundle.json",
    requiredForRc: true,
    presentInPackage: true,
    redactionRule: "Bundle sintetico senza payload provider o ENV values.",
  },
  {
    id: "artifact-production-env-guard-sample",
    path: "artifacts/rc-hardening/m21s-production-env-guard.sample.json",
    requiredForRc: false,
    presentInPackage: true,
    redactionRule: "Esempio con valori booleani e chiavi, non valori segreti.",
  },
  {
    id: "artifact-build-real-log",
    path: "artifacts/rc-hardening/build/pnpm-build.log",
    requiredForRc: true,
    presentInPackage: false,
    redactionRule: "Allegare dal target dopo rimozione di credenziali e variabili sensibili.",
  },
  {
    id: "artifact-docker-real-log",
    path: "artifacts/rc-hardening/build/docker-build.log",
    requiredForRc: true,
    presentInPackage: false,
    redactionRule: "Mantenere digest e risultato, rimuovere credenziali registry.",
  },
  {
    id: "artifact-restore-real-log",
    path: "artifacts/rc-hardening/database/restore-drill.log",
    requiredForRc: true,
    presentInPackage: false,
    redactionRule: "Nessun dato cliente reale; usare database di test o dump redatto.",
  },
  {
    id: "artifact-provider-sandbox-real",
    path: "artifacts/rc-hardening/providers/sandbox-certification-real.json",
    requiredForRc: true,
    presentInPackage: false,
    redactionRule: "Mascherare payload, token, email e riferimenti cliente.",
  },
  {
    id: "artifact-playwright-real-report",
    path: "playwright-report/index.html",
    requiredForRc: true,
    presentInPackage: false,
    redactionRule: "Screenshot senza PII e credenziali.",
  },
] as const;

export const m21sRcEvidenceBundle: RcRuntimeEvidenceBundle = {
  release: m21sRcHardeningRuntimeVersion,
  sprint: "M21-S RC Hardening Development",
  generatedAt: "2026-05-30T00:00:00.000Z",
  overallStatus: "blocked",
  blockingGateCount: m21sRcRuntimeGates.filter((gate) => gate.blocksReleaseCandidate).length,
  openBlockingGateCount: m21sRcRuntimeGates.filter((gate) => gate.blocksReleaseCandidate && gate.status !== "passed" && gate.status !== "waived_with_feature_off").length,
  gates: m21sRcRuntimeGates,
  artifactInventory: [...m21sRcArtifactInventory],
  signoffs: [
    { role: "Tech Lead", owner: "Build e dependency freeze", required: true, status: "pending" },
    { role: "Backend Lead", owner: "Migrazioni, backup e restore", required: true, status: "pending" },
    { role: "Security/Privacy Lead", owner: "Secret, demo data e privacy freeze", required: true, status: "pending" },
    { role: "Operations Lead", owner: "Provider sandbox, rollback e support", required: true, status: "pending" },
    { role: "QA Lead", owner: "Playwright reale e browser evidence", required: true, status: "pending" },
    { role: "Product Owner", owner: "Accettazione RC e release notes", required: true, status: "pending" },
  ],
};

export function getM21sBlockingRuntimeGates() {
  return m21sRcRuntimeGates.filter((gate) => gate.blocksReleaseCandidate && gate.status !== "passed" && gate.status !== "waived_with_feature_off");
}

export function getM21sRcRuntimeSummary() {
  const total = m21sRcRuntimeGates.length;
  const blocking = m21sRcRuntimeGates.filter((gate) => gate.blocksReleaseCandidate).length;
  const openBlocking = getM21sBlockingRuntimeGates().length;
  const passed = m21sRcRuntimeGates.filter((gate) => gate.status === "passed").length;
  const readyToRun = m21sRcRuntimeGates.filter((gate) => gate.status === "ready_to_run").length;
  const blocked = m21sRcRuntimeGates.filter((gate) => gate.status === "blocked").length;
  const waived = m21sRcRuntimeGates.filter((gate) => gate.status === "waived_with_feature_off").length;
  return {
    release: m21sRcHardeningRuntimeVersion,
    overallStatus: openBlocking === 0 ? "ready_for_rc" : "blocked",
    total,
    blocking,
    openBlocking,
    passed,
    readyToRun,
    blocked,
    waived,
  } as const;
}

export function getM21sGateTone(status: RcRuntimeGateStatus) {
  if (status === "passed") return "success";
  if (status === "ready_to_run") return "warning";
  if (status === "waived_with_feature_off") return "info";
  return "danger";
}

export function getM21sGateLabel(status: RcRuntimeGateStatus) {
  if (status === "passed") return "Passato";
  if (status === "ready_to_run") return "Pronto da eseguire";
  if (status === "waived_with_feature_off") return "Waiver feature-off";
  if (status === "failed") return "Fallito";
  return "Bloccato";
}
