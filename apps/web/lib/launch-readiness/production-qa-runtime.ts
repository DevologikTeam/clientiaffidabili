export type LaunchGateStatus = 'passed' | 'warning' | 'blocked';

export interface LaunchGateCheck {
  id: string;
  label: string;
  status: LaunchGateStatus;
  evidence: string;
  requiredForGoLive: boolean;
  remediation?: string;
}

export const launchReadinessChecks: LaunchGateCheck[] = [
  { id: 'build', label: 'Build web/api', status: 'warning', evidence: 'Eseguire pnpm build in CI', requiredForGoLive: true },
  { id: 'typecheck', label: 'Typecheck monorepo', status: 'warning', evidence: 'Eseguire pnpm typecheck', requiredForGoLive: true },
  { id: 'playwright', label: 'Playwright P0/P1', status: 'warning', evidence: 'Eseguire pnpm e2e:ci con artifact HTML', requiredForGoLive: true },
  { id: 'docker-smoke', label: 'Docker/Coolify smoke', status: 'warning', evidence: 'Eseguire scripts/launch-smoke-check.js su ambiente avviato', requiredForGoLive: true },
  { id: 'security', label: 'Security gate', status: 'passed', evidence: 'Secret scan, webhook, redaction e object auth scaffold presenti', requiredForGoLive: true },
  { id: 'rollback', label: 'Rollback plan', status: 'warning', evidence: 'Runbook presente; provare restore/rollback reale', requiredForGoLive: true },
];

export const criticalJourneys = [
  'Homepage -> Servizi -> Dettaglio -> Checkout',
  'Checkout confermato -> pagamento sandbox -> provider mock -> report pubblicato',
  'Customer dashboard -> storico verifiche -> report -> fatture',
  'Admin operations -> retry/blocco/pubblicazione con reason e audit',
  'Partner sandbox -> API key -> company check sandbox -> usage ledger',
  'SEO CMS -> bozza -> review -> pubblicazione /guide/[slug]',
];
