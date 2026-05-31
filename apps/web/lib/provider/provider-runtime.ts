export type ProviderRuntimeStatus =
  | 'created'
  | 'validated'
  | 'sent_to_provider'
  | 'waiting_provider'
  | 'completed'
  | 'requires_review'
  | 'retry_scheduled'
  | 'failed';

export interface ProviderRuntimeQueueItem {
  id: string;
  orderId: string;
  checkId: string;
  productCode: string;
  providerName: string;
  status: ProviderRuntimeStatus;
  costCents: number;
  attempts: number;
  nextAction: string;
  createdAt: string;
}

export const providerRuntimeDemoQueue: ProviderRuntimeQueueItem[] = [
  {
    id: 'pr_demo_company_pro',
    orderId: 'ord_demo_paid',
    checkId: 'chk_demo_company',
    productCode: 'COMPANY_PRO',
    providerName: 'openapi',
    status: 'completed',
    costCents: 890,
    attempts: 1,
    nextAction: 'Nessuna azione: richiesta completata.',
    createdAt: '2026-05-29T12:00:00.000Z',
  },
  {
    id: 'pr_demo_kyb',
    orderId: 'ord_demo_review',
    checkId: 'chk_demo_kyb',
    productCode: 'KYB_COMPLIANCE',
    providerName: 'openapi',
    status: 'requires_review',
    costCents: 2100,
    attempts: 1,
    nextAction: 'Review operativa prima della consegna.',
    createdAt: '2026-05-29T12:10:00.000Z',
  },
];

export function formatProviderCost(cents: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}
