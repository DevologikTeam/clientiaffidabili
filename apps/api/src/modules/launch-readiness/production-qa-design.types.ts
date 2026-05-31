export type ProductionQaGate =
  | 'repository'
  | 'container'
  | 'browser_e2e'
  | 'security'
  | 'payment_provider'
  | 'backup_restore'
  | 'manual_signoff';

export type ProductionQaGateCheck = {
  key: string;
  gate: ProductionQaGate;
  label: string;
  blocker: boolean;
  requiredEvidence: Array<'log' | 'artifact' | 'screenshot' | 'json' | 'manual_signoff'>;
};

export const productionQaGateChecks: ProductionQaGateCheck[] = [
  { key: 'pnpm-install-build', gate: 'repository', label: 'Install, typecheck, lint, test and build pass', blocker: true, requiredEvidence: ['log'] },
  { key: 'docker-compose-smoke', gate: 'container', label: 'Docker Compose starts with API/Web health checks', blocker: true, requiredEvidence: ['log', 'json'] },
  { key: 'playwright-critical', gate: 'browser_e2e', label: 'Critical Playwright journeys pass', blocker: true, requiredEvidence: ['artifact', 'screenshot'] },
  { key: 'object-auth-cross-account', gate: 'security', label: 'Cross-account object access is denied', blocker: true, requiredEvidence: ['json'] },
  { key: 'stripe-paypal-webhook-sandbox', gate: 'payment_provider', label: 'Payment webhooks verified and idempotent in sandbox', blocker: true, requiredEvidence: ['json', 'log'] },
  { key: 'backup-restore-drill', gate: 'backup_restore', label: 'Staging backup restore drill completed', blocker: true, requiredEvidence: ['manual_signoff', 'log'] },
];
