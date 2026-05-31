export type CheckoutStepStatus = 'done' | 'current' | 'blocked' | 'pending';

export type CheckoutStepBlueprint = {
  key: string;
  label: string;
  purpose: string;
  requiredBeforeNext: string[];
  customerCopy: string;
};

export const checkoutStepBlueprint: CheckoutStepBlueprint[] = [
  {
    key: 'service',
    label: 'Servizio',
    purpose: 'Confermare servizio, prezzo, tempi, output e limiti prima di raccogliere altri dati.',
    requiredBeforeNext: ['service is published or assisted', 'price snapshot preview visible', 'report limits visible'],
    customerCopy: 'Controlla servizio, prezzo e tempi prima di continuare.',
  },
  {
    key: 'subject',
    label: 'Dati',
    purpose: 'Raccogliere solo i dati necessari alla verifica selezionata.',
    requiredBeforeNext: ['subject payload valid', 'purpose provided for high-risk services'],
    customerCopy: 'Inserisci solo i dati necessari alla verifica.',
  },
  {
    key: 'billing',
    label: 'Fatturazione',
    purpose: 'Preparare pagamento e documento fiscale senza duplicare profili inutili.',
    requiredBeforeNext: ['billing email valid', 'country selected', 'legal name provided'],
    customerCopy: 'Indica i dati amministrativi per ricevuta e fatturazione.',
  },
  {
    key: 'confirmations',
    label: 'Conferme',
    purpose: 'Acquisire uso lecito, accettazione limiti report e termini.',
    requiredBeforeNext: ['legal use confirmed', 'report limits accepted', 'terms accepted'],
    customerCopy: 'Conferma finalità lecita, limiti del report e condizioni.',
  },
  {
    key: 'payment',
    label: 'Pagamento',
    purpose: 'Creare sessione hosted provider e attendere webhook sicuro.',
    requiredBeforeNext: ['checkout session created', 'provider redirect completed', 'webhook confirmed'],
    customerCopy: 'Procedi al pagamento sicuro. La verifica parte solo dopo conferma.',
  },
];

export const orderStateBlueprint = {
  draft: 'Ordine in compilazione, senza sessione pagamento attiva.',
  pending_payment: 'Ordine pronto, pagamento da completare.',
  payment_processing: 'Pagamento avviato, conferma webhook non ancora ricevuta.',
  paid: 'Pagamento confermato, richiesta pronta per la lavorazione.',
  provider_queued: 'Richiesta in coda provider, con pagamento verificato.',
  processing: 'Verifica in lavorazione.',
  completed: 'Report disponibile.',
  requires_assistance: 'Serve controllo manuale prima di proseguire.',
  refunded: 'Ordine rimborsato.',
  cancelled: 'Ordine annullato.',
  failed: 'Ordine non completato per errore o pagamento fallito.',
} as const;

export const billingEntityBlueprint = [
  'Order',
  'CheckoutSession',
  'Payment',
  'PaymentLedgerEntry',
  'BillingProfile',
  'Invoice',
  'PaymentWebhookEvent',
] as const;

export const checkoutApiBlueprint = [
  {
    method: 'POST',
    path: '/orders',
    purpose: 'Create order with immutable price snapshot and legal confirmations.',
  },
  {
    method: 'POST',
    path: '/billing/checkout-session',
    purpose: 'Create hosted checkout session without exposing provider secrets.',
  },
  {
    method: 'POST',
    path: '/billing/webhooks/:provider',
    purpose: 'Receive signed provider events and apply idempotent state transitions.',
  },
  {
    method: 'GET',
    path: '/orders/:id',
    purpose: 'Return customer-safe order status.',
  },
  {
    method: 'GET',
    path: '/admin/billing/queue',
    purpose: 'Return operational queues for internal billing support.',
  },
] as const;

export const webhookIdempotencyBlueprint = {
  primaryKey: 'provider + providerEventId',
  ledgerKey: 'paymentId + type + providerEventId + amountCents',
  providerExecutionKey: 'orderId + productCode + subjectHash',
  hardRule: 'Frontend redirect never confirms payment; only a signed webhook can mark an order as paid.',
};

export const adminBillingQueues = [
  {
    key: 'pending-payments',
    label: 'Pagamenti pendenti',
    action: 'Verificare sessioni scadute o inviare promemoria.',
  },
  {
    key: 'failed-webhooks',
    label: 'Webhook falliti',
    action: 'Rieseguire elaborazione o aprire ticket tecnico.',
  },
  {
    key: 'invoice-pending',
    label: 'Fatture da emettere',
    action: 'Completare dati fiscali o marcare documento emesso.',
  },
  {
    key: 'refund-review',
    label: 'Rimborsi da approvare',
    action: 'Verificare se il provider dati è già stato eseguito.',
  },
  {
    key: 'disputes',
    label: 'Dispute',
    action: 'Raccogliere evidenze e rispondere entro scadenza provider.',
  },
] as const;

export const checkoutCustomerCopy = {
  hero: 'Conferma i dati e procedi al pagamento sicuro.',
  description:
    'Prima del pagamento puoi controllare servizio, prezzo, tempi, dati richiesti e limiti del report. La verifica viene avviata solo dopo conferma del pagamento.',
  legalUse:
    'Confermo di richiedere questa verifica per una finalità professionale lecita, proporzionata e collegata alla mia attività.',
  limits:
    'Il report aiuta a valutare segnali disponibili da fonti informative, ma non garantisce pagamenti futuri, solvibilità assoluta o assenza di rischio.',
  paymentPending:
    'Stiamo attendendo conferma sicura dal circuito di pagamento. La verifica non partirà finché il pagamento non sarà confermato.',
  paymentFailed: 'Il pagamento non è stato completato. Puoi riprovare senza perdere il riepilogo dell ordine.',
} as const;
