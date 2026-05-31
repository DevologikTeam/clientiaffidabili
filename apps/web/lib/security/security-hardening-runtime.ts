export type ProductionGateStatus = 'pass' | 'warning' | 'fail';

export type SecurityRuntimeControl = {
  code: string;
  title: string;
  owner: 'api' | 'web' | 'devops' | 'operations' | 'legal' | 'security';
  severity: 'p0' | 'p1' | 'p2' | 'p3';
  status: 'implemented' | 'verified' | 'blocked';
  blocksProduction: boolean;
};

export type ProductionGateRuntimeCheck = {
  code: string;
  title: string;
  status: ProductionGateStatus;
  evidence: string;
  blocksProduction: boolean;
};

export const securityRuntimeControls: SecurityRuntimeControl[] = [
  { code: 'SEC-AUTH-001', title: 'RBAC e object-level authorization', owner: 'api', severity: 'p0', status: 'implemented', blocksProduction: true },
  { code: 'SEC-WEBHOOK-001', title: 'Webhook firmati, idempotenti e riconciliabili', owner: 'api', severity: 'p0', status: 'implemented', blocksProduction: true },
  { code: 'SEC-SECRETS-001', title: 'Secret scan e policy Coolify backend-only', owner: 'devops', severity: 'p0', status: 'implemented', blocksProduction: true },
  { code: 'SEC-LOG-001', title: 'Redaction log, PII e raw provider payload', owner: 'api', severity: 'p0', status: 'implemented', blocksProduction: true },
  { code: 'SEC-BACKUP-001', title: 'Runbook backup/restore e incident response', owner: 'devops', severity: 'p0', status: 'implemented', blocksProduction: true },
  { code: 'SEC-GATE-001', title: 'Production gate statico e runtime', owner: 'security', severity: 'p0', status: 'implemented', blocksProduction: true },
];

export const productionGateRuntimeChecks: ProductionGateRuntimeCheck[] = [
  { code: 'GATE-SECRETS', title: 'Secret scan', status: 'pass', evidence: 'node scripts/security-secret-scan.js', blocksProduction: true },
  { code: 'GATE-BUILD', title: 'Build reale ambiente pulito', status: 'warning', evidence: 'Da eseguire con pnpm install/typecheck/build', blocksProduction: true },
  { code: 'GATE-BOLA', title: 'Test IDOR/BOLA cross-account', status: 'warning', evidence: 'Scaffold guard e policy implementati; test reali da eseguire con auth reale', blocksProduction: true },
  { code: 'GATE-WEBHOOKS', title: 'Webhook signature/replay/idempotenza', status: 'warning', evidence: 'Servizio verifica implementato; validare in sandbox Stripe/PayPal/Openapi', blocksProduction: true },
  { code: 'GATE-RESTORE', title: 'Restore drill', status: 'warning', evidence: 'Runbook pronto; prova restore da completare prima go-live', blocksProduction: true },
];

export const productionHardeningNextActions = [
  'Installare dipendenze ed eseguire typecheck/build reale in ambiente pulito.',
  'Collegare guard RBAC/object authorization agli endpoint customer/admin reali.',
  'Eseguire test webhook con Stripe CLI, PayPal sandbox e callback Openapi sandbox.',
  'Eseguire backup/restore drill PostgreSQL e allegare report in docs/qa.',
  'Mantenere ENABLE_PROVIDER_CALLS=false finché tutti i gate P0 non sono verdi.',
];
