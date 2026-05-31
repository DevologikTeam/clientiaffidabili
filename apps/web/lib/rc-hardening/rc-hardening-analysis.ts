export type RcHardeningSeverity = "P0" | "P1" | "P2";
export type RcHardeningStatus = "open" | "ready_to_run" | "passed" | "failed" | "blocked" | "waived_with_feature_off";

export type RcHardeningFinding = {
  id: string;
  area: string;
  severity: RcHardeningSeverity;
  status: RcHardeningStatus;
  title: string;
  evidence: string;
  nextAction: string;
  blocksRc: boolean;
};

export const m21aRcHardeningMetrics = {
  webPageRoutes: 72,
  webLayouts: 6,
  webComponents: 137,
  apiModuleDirs: 25,
  apiControllers: 27,
  apiServices: 50,
  apiEntities: 74,
  qaScripts: 79,
  e2eSpecs: 5,
  routesWithMetadata: 10,
  sensitiveLayoutsWithNoindex: 5,
  hasPnpmLock: false,
  hasApiMigrations: false,
} as const;

export const m21aRcHardeningFindings: RcHardeningFinding[] = [
  {
    id: "rc-p0-build-real-target",
    area: "build",
    severity: "P0",
    status: "open",
    title: "Build reale web/api non certificata nel pacchetto",
    evidence: "Il pacchetto contiene gate statici, ma non log pnpm build/Docker/Playwright reali.",
    nextAction: "Eseguire build, typecheck, Docker e Playwright in ambiente target con artifact.",
    blocksRc: true,
  },
  {
    id: "rc-p0-lockfile-freeze",
    area: "dependency_freeze",
    severity: "P0",
    status: "open",
    title: "Lockfile assente",
    evidence: "pnpm-lock.yaml non presente nel repository analizzato.",
    nextAction: "Definire policy freeze dipendenze e commit lockfile oppure alternativa approvata.",
    blocksRc: true,
  },
  {
    id: "rc-p0-database-migrations",
    area: "database",
    severity: "P0",
    status: "open",
    title: "Migrazioni DB non versionate",
    evidence: "74 entity TypeORM e nessuna cartella migration rilevata staticamente.",
    nextAction: "Creare baseline migration o schema freeze con restore drill.",
    blocksRc: true,
  },
  {
    id: "rc-p0-provider-sandbox-real",
    area: "providers",
    severity: "P0",
    status: "open",
    title: "Provider sandbox reali non eseguiti",
    evidence: "M19-S implementa sandbox certification mock-first, non esecuzioni reali.",
    nextAction: "Eseguire Stripe, PayPal, Openapi, OpenAI, email e PDF in sandbox o waiver feature-off.",
    blocksRc: true,
  },
  {
    id: "rc-p0-browser-e2e-real",
    area: "qa_browser",
    severity: "P0",
    status: "open",
    title: "Playwright reale non certificato qui",
    evidence: "Sono presenti 5 spec E2E, ma senza report reale nel pacchetto.",
    nextAction: "Eseguire pnpm e2e:ci con report e screenshot artifact.",
    blocksRc: true,
  },
  {
    id: "rc-p0-demo-data-production-guard",
    area: "runtime_config",
    severity: "P0",
    status: "open",
    title: "Demo data deve essere bloccato in produzione",
    evidence: ".env.example usa ENABLE_DEMO_DATA=true per locale; production deve forzare false.",
    nextAction: "Aggiungere RC env gate per bloccare valori demo/test in produzione.",
    blocksRc: true,
  },
  {
    id: "rc-p1-evidence-bundle",
    area: "release_governance",
    severity: "P1",
    status: "open",
    title: "Artifact RC non centralizzati",
    evidence: "QA, sandbox, Docker, security e rollback sono distribuiti tra moduli diversi.",
    nextAction: "Disegnare evidence bundle e command center RC.",
    blocksRc: false,
  },
  {
    id: "rc-p1-support-runbook",
    area: "operations",
    severity: "P1",
    status: "open",
    title: "Support triage RC da unificare",
    evidence: "Error ledger, email ledger, provider ledger e support ticket esistono ma non hanno vista RC unica.",
    nextAction: "Definire runbook per checkout, report, provider, email, refund e rollback.",
    blocksRc: false,
  },
];

export const m21aRcHardeningGateKeywords = [
  "build",
  "typecheck",
  "docker",
  "coolify",
  "playwright",
  "migration",
  "backup",
  "restore",
  "secret_scan",
  "sandbox_certification",
  "rollback",
  "noindex",
  "feature_flag",
  "waiver",
] as const;

export function getM21aBlockingFindings() {
  return m21aRcHardeningFindings.filter((finding) => finding.blocksRc);
}
