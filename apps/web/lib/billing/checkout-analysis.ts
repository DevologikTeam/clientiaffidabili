export type CheckoutProviderCode = 'stripe' | 'nexi' | 'paypal' | 'mollie' | 'manual_bank_transfer';

export type CheckoutProviderDecision = {
  code: CheckoutProviderCode;
  label: string;
  mvpRole: 'primary' | 'future-adapter' | 'assisted-only';
  strengths: string[];
  risks: string[];
};

export const checkoutProviderDecisions: CheckoutProviderDecision[] = [
  {
    code: 'stripe',
    label: 'Stripe Checkout hosted',
    mvpRole: 'primary',
    strengths: ['Hosted checkout', 'webhook maturi', 'pagamenti una tantum e ricorrenti', 'buona documentazione'],
    risks: ['commissione fissa pesante sui micro-ticket', 'fatturazione elettronica italiana da integrare separatamente'],
  },
  {
    code: 'nexi',
    label: 'Nexi XPay',
    mvpRole: 'future-adapter',
    strengths: ['presenza italiana', 'percezione locale'],
    risks: ['da verificare complessita integrazione e onboarding'],
  },
  {
    code: 'paypal',
    label: 'PayPal',
    mvpRole: 'future-adapter',
    strengths: ['wallet noto', 'fiducia PMI'],
    risks: ['dispute e riconciliazione da governare con attenzione'],
  },
  {
    code: 'mollie',
    label: 'Mollie',
    mvpRole: 'future-adapter',
    strengths: ['alternativa EU', 'metodi locali'],
    risks: ['fit Italia B2B da verificare'],
  },
  {
    code: 'manual_bank_transfer',
    label: 'Bonifico assistito',
    mvpRole: 'assisted-only',
    strengths: ['utile per contratti enterprise o PA'],
    risks: ['non immediato', 'alta gestione operativa'],
  },
];

export type OrderLifecycleState =
  | 'draft'
  | 'checkout_pending'
  | 'checkout_expired'
  | 'payment_processing'
  | 'paid'
  | 'provider_pending'
  | 'provider_running'
  | 'completed'
  | 'provider_failed'
  | 'refund_requested'
  | 'refunded'
  | 'disputed'
  | 'canceled';

export const checkoutOrderLifecycle: { state: OrderLifecycleState; label: string; customerMessage: string }[] = [
  { state: 'draft', label: 'Bozza', customerMessage: 'Completa i dati richiesti per continuare.' },
  { state: 'checkout_pending', label: 'Pagamento da completare', customerMessage: 'Completa il pagamento nella pagina sicura.' },
  { state: 'checkout_expired', label: 'Sessione scaduta', customerMessage: 'Ricrea il checkout per aggiornare prezzo e disponibilita.' },
  { state: 'payment_processing', label: 'Pagamento in verifica', customerMessage: 'Stiamo confermando il pagamento.' },
  { state: 'paid', label: 'Pagamento ricevuto', customerMessage: 'Il pagamento e confermato. Avviamo la verifica.' },
  { state: 'provider_pending', label: 'Verifica in coda', customerMessage: 'La richiesta e in coda operativa.' },
  { state: 'provider_running', label: 'Verifica in corso', customerMessage: 'Stiamo recuperando le fonti disponibili.' },
  { state: 'completed', label: 'Report pronto', customerMessage: 'Il report e disponibile nella tua area.' },
  { state: 'provider_failed', label: 'Verifica da recuperare', customerMessage: 'C e stato un problema tecnico. Il supporto puo intervenire.' },
  { state: 'refund_requested', label: 'Rimborso in revisione', customerMessage: 'La richiesta e in valutazione secondo le condizioni del servizio.' },
  { state: 'refunded', label: 'Rimborsato', customerMessage: 'Il rimborso e stato registrato.' },
  { state: 'disputed', label: 'Contestazione aperta', customerMessage: 'Il pagamento e in contestazione.' },
  { state: 'canceled', label: 'Annullato', customerMessage: 'L ordine e stato annullato prima dell esecuzione.' },
];

export const checkoutGuardrails = [
  'Nessuna chiamata provider dati prima di payment_succeeded verificato da webhook.',
  'Snapshot prezzo, IVA, prodotto e versione immutabile sull ordine.',
  'Nessun dato carta salvato nel database applicativo.',
  'Webhook firmati e idempotenti con providerEventId univoco.',
  'Conferma uso lecito obbligatoria prima del pagamento.',
  'Rimborso automatico solo se il provider dati non e ancora stato chiamato.',
  'Fatturazione separata dal pagamento con stato dedicato.',
];

export type EstimatedPaymentFeeInput = {
  netPriceCents: number;
  percentage: number;
  fixedCents: number;
};

export function estimatePaymentFeeCents(input: EstimatedPaymentFeeInput): number {
  return Math.round(input.netPriceCents * input.percentage + input.fixedCents);
}

export function estimateEffectiveMarginCents(input: {
  netPriceCents: number;
  dataProviderCostCents: number;
  paymentFeeCents: number;
  operationalCostCents?: number;
}): number {
  return input.netPriceCents - input.dataProviderCostCents - input.paymentFeeCents - (input.operationalCostCents ?? 0);
}
