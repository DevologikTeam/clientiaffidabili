import { calculateSnapshot, CatalogService } from '@/lib/catalog/catalog';

export type CheckoutStepId = 'service' | 'subject' | 'billing' | 'legal' | 'payment' | 'report';

export const checkoutSteps: Array<{ id: CheckoutStepId; label: string; description: string }> = [
  { id: 'service', label: 'Servizio', description: 'Prezzo e output sono bloccati nello snapshot.' },
  { id: 'subject', label: 'Dati verifica', description: 'Inserisci solo i dati necessari.' },
  { id: 'billing', label: 'Fatturazione', description: 'Profilo fiscale per ricevuta/fattura.' },
  { id: 'legal', label: 'Uso lecito', description: 'Conferma finalità professionale proporzionata.' },
  { id: 'payment', label: 'Pagamento', description: 'Checkout hosted, nessun dato carta salvato.' },
  { id: 'report', label: 'Report', description: 'Provider dati chiamato solo dopo conferma pagamento.' },
];

export const legalConfirmations = [
  'Uso il servizio per finalità professionali lecite e proporzionate.',
  'Ho titolo o interesse legittimo a richiedere la verifica indicata.',
  'Comprendo che il report non garantisce pagamento, solvibilità o assenza totale di rischio.',
  'Accetto che i dati carta siano gestiti dal provider di pagamento e non da ClientiAffidabili.it.',
];

export function buildCheckoutSummary(service: CatalogService) {
  const snapshot = calculateSnapshot(service);
  return {
    productCode: service.code,
    productName: service.name,
    delivery: service.delivery,
    status: service.status === 'assisted' ? 'assistito' : 'checkout diretto',
    net: snapshot.unitNet,
    vat: snapshot.vat,
    total: snapshot.total,
    legalNotice: 'Il provider dati viene chiamato solo dopo webhook di pagamento confermato.',
  };
}

export const billingOperationsSeed = [
  {
    order: 'ORD-demo-001',
    status: 'pending_payment',
    provider: 'mock',
    amount: '€30,38',
    nextAction: 'Attendi webhook o invia nuovo link checkout.',
  },
  {
    order: 'ORD-demo-002',
    status: 'paid',
    provider: 'stripe',
    amount: '€42,58',
    nextAction: 'Genera fattura pending e avvia report.',
  },
  {
    order: 'ORD-demo-003',
    status: 'webhook_failed',
    provider: 'stripe',
    amount: '€18,18',
    nextAction: 'Verifica firma/idempotenza prima di ritentare.',
  },
];
