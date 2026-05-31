import { RefundPolicyDecision, RefundPolicyInput } from './payment-providers-subscriptions.types';

const euro = (cents: number) => `€${(cents / 100).toFixed(2)}`;

export function evaluateRefundPolicy(input: RefundPolicyInput): RefundPolicyDecision {
  const residualPaid = input.paidAmountCents - input.alreadyRefundedAmountCents;

  if (input.hasOpenDispute) {
    return {
      outcome: 'blocked',
      reasonCode: 'DISPUTE_OPEN',
      maxRefundableAmountCents: 0,
      customerMessage: 'La richiesta non puo\' essere gestita come rimborso ordinario perche\' risulta una contestazione aperta sul pagamento.',
      adminMessage: 'Dispute aperta: evitare doppio rimborso e gestire dal flusso contestazioni.',
      requiresReason: true,
      requiresAdminApproval: true,
    };
  }

  if (input.requestedAmountCents > residualPaid) {
    return {
      outcome: 'blocked',
      reasonCode: 'OVER_REFUND_ATTEMPT',
      maxRefundableAmountCents: Math.max(0, residualPaid),
      customerMessage: 'L\'importo richiesto supera l\'importo ancora rimborsabile.',
      adminMessage: `Tentativo over-refund. Residuo massimo ${euro(Math.max(0, residualPaid))}.`,
      requiresReason: true,
      requiresAdminApproval: true,
    };
  }

  if (input.reportPublished || input.reportDownloaded) {
    return {
      outcome: 'manual_review_required',
      reasonCode: 'REPORT_DELIVERED',
      maxRefundableAmountCents: 0,
      customerMessage: 'Il report risulta gia\' prodotto o consultato: la richiesta richiede una verifica interna.',
      adminMessage: 'Valore consegnato: autorizzare rimborso solo come eccezione tracciata.',
      requiresReason: true,
      requiresAdminApproval: true,
    };
  }

  if (input.providerCostIncurredCents > 0) {
    const maxRefundable = Math.max(0, residualPaid - input.providerCostIncurredCents - input.creditsConsumedValueCents);
    return {
      outcome: 'manual_review_required',
      reasonCode: 'PROVIDER_COST_INCURRED',
      maxRefundableAmountCents: maxRefundable,
      customerMessage: 'La verifica e\' gia\' stata avviata: il rimborso richiede controllo interno.',
      adminMessage: `Costo provider sostenuto. Massimo consigliato: ${euro(maxRefundable)}.`,
      requiresReason: true,
      requiresAdminApproval: true,
    };
  }

  if (input.creditsConsumedValueCents > 0) {
    const maxRefundable = Math.max(0, residualPaid - input.creditsConsumedValueCents);
    return {
      outcome: 'manual_review_required',
      reasonCode: 'CREDITS_PARTIALLY_USED',
      maxRefundableAmountCents: maxRefundable,
      customerMessage: 'Alcuni crediti risultano gia\' utilizzati: calcoliamo il residuo rimborsabile.',
      adminMessage: `Crediti consumati: ${euro(input.creditsConsumedValueCents)}.`,
      requiresReason: true,
      requiresAdminApproval: true,
    };
  }

  if (input.subscriptionRenewalUnused) {
    return {
      outcome: 'eligible',
      reasonCode: 'SUBSCRIPTION_UNUSED_RENEWAL',
      maxRefundableAmountCents: residualPaid,
      customerMessage: 'Il rinnovo non risulta ancora utilizzato: il rimborso puo\' essere gestito.',
      adminMessage: 'Rinnovo non utilizzato: procedere se non ci sono anomalie fiscali/contabili.',
      requiresReason: true,
      requiresAdminApproval: false,
    };
  }

  return {
    outcome: 'eligible',
    reasonCode: 'NO_PROVIDER_COST',
    maxRefundableAmountCents: residualPaid,
    customerMessage: 'La richiesta e\' rimborsabile perche\' il servizio non risulta ancora avviato.',
    adminMessage: 'Nessun costo provider sostenuto: rimborso consentito.',
    requiresReason: true,
    requiresAdminApproval: false,
  };
}

export const REFUND_POLICY_GUARDS = [
  'block_dispute_duplicate_refund',
  'block_over_refund',
  'manual_review_after_provider_cost',
  'manual_review_after_report_delivery',
  'ledger_append_only',
  'reason_required_for_admin_refund',
] as const;
