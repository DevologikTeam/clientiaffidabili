export type BillingPortalSection =
  | 'payments'
  | 'invoices'
  | 'subscription'
  | 'credits'
  | 'refunds';

export const paymentProviderSubscriptionDesign = {
  version: '0.27.0',
  sprint: 'M4B-P Payment Providers & Subscriptions Design',
  providers: [
    {
      code: 'stripe',
      priority: 1,
      enabledByDefault: false,
      publicLabel: 'Carta e metodi supportati',
      supports: ['one-shot checkout', 'subscription checkout', 'refund full', 'refund partial', 'customer portal future'],
      guardrails: ['hosted checkout first', 'webhook signature required', 'no card data stored'],
    },
    {
      code: 'paypal',
      priority: 2,
      enabledByDefault: false,
      publicLabel: 'PayPal',
      supports: ['orders', 'capture refund', 'subscriptions'],
      guardrails: ['feature flagged', 'sandbox required before public exposure', 'same internal entitlement rules'],
    },
  ],
  customerRoutes: [
    '/dashboard/fatture',
    '/dashboard/abbonamento',
    '/dashboard/crediti',
    '/dashboard/rimborsi',
  ],
  adminQueues: [
    'refund_review',
    'refund_failed',
    'dispute_open',
    'subscription_payment_failed',
    'credit_mismatch',
    'invoice_pending',
    'webhook_unprocessed',
  ],
  refundCustomerStatuses: [
    { status: 'requested', label: 'Richiesta ricevuta' },
    { status: 'policy_review', label: 'Stiamo verificando la richiesta' },
    { status: 'approved', label: 'Rimborso approvato' },
    { status: 'provider_pending', label: 'Rimborso inviato al gestore pagamento' },
    { status: 'succeeded', label: 'Rimborso avviato/confermato' },
    { status: 'failed', label: 'Serve assistenza' },
    { status: 'rejected', label: 'Rimborso non disponibile' },
  ],
  mandatoryGuards: [
    'no_unlimited_provider_cost_services',
    'no_provider_call_without_payment_or_reserved_credit',
    'refund_policy_before_provider_refund',
    'dispute_blocks_duplicate_refund',
    'ledger_append_only',
    'reason_required_for_sensitive_admin_actions',
  ],
} as const;
