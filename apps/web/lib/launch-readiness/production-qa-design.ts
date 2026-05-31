export type LaunchGateStatus = 'not_started' | 'running' | 'passed' | 'failed' | 'blocked';

export type CriticalJourney = {
  id: string;
  label: string;
  area: 'public' | 'checkout' | 'customer' | 'admin' | 'partner' | 'security' | 'billing' | 'provider' | 'report';
  blocker: boolean;
  evidence: string[];
};

export const criticalJourneys: CriticalJourney[] = [
  { id: 'public-funnel', label: 'Home → servizi → dettaglio → checkout', area: 'public', blocker: true, evidence: ['screenshot', 'html-report'] },
  { id: 'checkout-consent', label: 'Checkout blocca senza uso lecito', area: 'checkout', blocker: true, evidence: ['test-result'] },
  { id: 'payment-provider-report', label: 'Pagamento → provider → report', area: 'billing', blocker: true, evidence: ['ledger', 'audit', 'report-snapshot'] },
  { id: 'customer-report-access', label: 'Cliente accede solo ai propri report', area: 'security', blocker: true, evidence: ['api-response', 'audit'] },
  { id: 'admin-reason-audit', label: 'Admin action richiede reason e audit', area: 'admin', blocker: true, evidence: ['audit'] },
  { id: 'partner-sandbox-api', label: 'Partner sandbox API key e usage ledger', area: 'partner', blocker: true, evidence: ['usage-ledger'] },
];

export const launchReadinessDesign = {
  version: '0.42.0',
  sprint: 'M13-P',
  status: 'blueprint',
  gates: ['repository', 'container', 'browser-e2e', 'security-payment-provider', 'manual-signoff'],
  criticalJourneys,
};
