export type SecurityPriority = 'P0' | 'P1' | 'P2';

export interface SecurityAnalysisControl {
  area: string;
  risk: string;
  priority: SecurityPriority;
  requiredControl: string;
  productionBlocker: boolean;
}

export const SECURITY_HARDENING_ANALYSIS: SecurityAnalysisControl[] = [
  {
    area: 'access-control',
    risk: 'Customer can access reports, invoices or checks owned by another account.',
    priority: 'P0',
    requiredControl: 'Backend object-level authorization on every customer-facing resource.',
    productionBlocker: true,
  },
  {
    area: 'payments',
    risk: 'Forged or replayed webhook changes payment/subscription state.',
    priority: 'P0',
    requiredControl: 'Provider signature verification, event idempotency and reconciliation ledger.',
    productionBlocker: true,
  },
  {
    area: 'provider',
    risk: 'Duplicate or abusive provider calls create uncontrolled costs.',
    priority: 'P0',
    requiredControl: 'Provider request state machine, idempotency keys and cost ledger.',
    productionBlocker: true,
  },
  {
    area: 'privacy',
    risk: 'Raw provider payload or personal data leaked to users, admins or logs.',
    priority: 'P0',
    requiredControl: 'Raw payload vault, redaction, retention policy and access audit.',
    productionBlocker: true,
  },
  {
    area: 'operations',
    risk: 'No tested restore procedure for PostgreSQL and critical ledgers.',
    priority: 'P0',
    requiredControl: 'Encrypted backup and restore drill before production.',
    productionBlocker: true,
  },
];

export const PRODUCTION_SECURITY_GATES = [
  'real-build-web-api',
  'typecheck',
  'rbac-tests',
  'object-level-authorization-tests',
  'webhook-signature-tests',
  'provider-idempotency-tests',
  'secret-scan',
  'log-redaction-sample',
  'backup-restore-drill',
  'incident-response-runbook',
] as const;
