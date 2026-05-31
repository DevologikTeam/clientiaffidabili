export const securityHardeningSummary = {
  sprint: 'M9-A',
  version: '0.29.0',
  posture: 'production-readiness-analysis',
  primaryRisks: [
    'object-level authorization failure',
    'webhook spoofing or replay',
    'provider cost exhaustion',
    'raw provider payload exposure',
    'secret leakage',
    'missing restore drill',
  ],
  customerFacingPromise: 'Dati protetti, report tracciabili, pagamenti sicuri e limiti chiari.',
  productionGate: [
    'RBAC backend verified',
    'webhook signatures verified',
    'provider calls idempotent',
    'secrets scanned',
    'logs redacted',
    'backup restore tested',
  ],
};

export type SecurityHardeningSummary = typeof securityHardeningSummary;
