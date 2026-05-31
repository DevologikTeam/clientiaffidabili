export const launchReadinessAnalysis = {
  version: '0.41.0',
  sprint: 'M13-A Production QA, Browser E2E & Launch Readiness Analysis',
  readinessStatus: 'not_ready_for_production',
  recommendedTooling: {
    browserE2E: 'Playwright',
    deploySmoke: 'curl + scripted smoke checks',
    productionGate: 'custom blocking script + manual sign-off',
  },
  p0Journeys: [
    'public checkout purchase',
    'post-payment provider request',
    'report access authorization',
    'admin sensitive action with reason',
    'refund/credit ledger reconciliation',
    'backup restore drill',
  ],
  nextSprint: 'M13-P Production QA, Browser E2E & Launch Readiness Design',
} as const;
