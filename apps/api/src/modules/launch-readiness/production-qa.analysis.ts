export type LaunchReadinessPriority = 'P0' | 'P1' | 'P2';

export interface CriticalJourneyAnalysisItem {
  code: string;
  title: string;
  priority: LaunchReadinessPriority;
  actor: 'public' | 'customer' | 'admin' | 'partner' | 'system';
  expectedEvidence: string[];
  goLiveBlocker: boolean;
}

export const M13A_CRITICAL_JOURNEYS: CriticalJourneyAnalysisItem[] = [
  {
    code: 'PUBLIC_CHECKOUT_PURCHASE',
    title: 'Public service purchase through checkout',
    priority: 'P0',
    actor: 'customer',
    expectedEvidence: ['browser trace', 'order snapshot', 'payment ledger'],
    goLiveBlocker: true,
  },
  {
    code: 'POST_PAYMENT_PROVIDER_REQUEST',
    title: 'Provider request starts only after confirmed payment or reserved credits',
    priority: 'P0',
    actor: 'system',
    expectedEvidence: ['provider idempotency key', 'cost ledger', 'request events'],
    goLiveBlocker: true,
  },
  {
    code: 'REPORT_OBJECT_AUTHORIZATION',
    title: 'Report is visible only to authorized account members',
    priority: 'P0',
    actor: 'customer',
    expectedEvidence: ['403 cross-account test', 'audit entry'],
    goLiveBlocker: true,
  },
  {
    code: 'REFUND_LEDGER_RECONCILIATION',
    title: 'Refund lifecycle keeps payment, credit wallet and invoice state coherent',
    priority: 'P0',
    actor: 'admin',
    expectedEvidence: ['refund request', 'ledger entries', 'admin reason'],
    goLiveBlocker: true,
  },
  {
    code: 'PARTNER_SANDBOX_API',
    title: 'Partner can use sandbox API without live provider consumption',
    priority: 'P1',
    actor: 'partner',
    expectedEvidence: ['sandbox api key', 'usage ledger', 'webhook test'],
    goLiveBlocker: false,
  },
];

export const M13A_LAUNCH_BLOCKERS = [
  'pnpm build not executed or failing',
  'Docker build not executed or failing',
  'Playwright P0 tests missing',
  'cross-account object authorization not tested',
  'Stripe/PayPal webhook signature not verified in sandbox',
  'provider idempotency not tested',
  'backup/restore drill not completed',
  'rollback plan missing',
  'legal/fiscal pack not validated',
];
