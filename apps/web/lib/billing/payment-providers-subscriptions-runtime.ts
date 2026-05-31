export type PaymentProviderCode = 'stripe' | 'paypal' | 'mock';
export type SubscriptionPlanCode = 'starter' | 'pro' | 'agency';

export interface SubscriptionPlanRuntime {
  code: SubscriptionPlanCode;
  name: string;
  description: string;
  monthlyPriceCents: number;
  monthlyCredits: number;
  recommended?: boolean;
  guardrail: string;
}

export const subscriptionPlans: SubscriptionPlanRuntime[] = [
  { code: 'starter', name: 'Starter Affidabilità', description: 'Per aziende che fanno poche verifiche ma vogliono uno storico ordinato.', monthlyPriceCents: 2900, monthlyCredits: 3, guardrail: 'Crediti limitati, nessuna verifica illimitata.' },
  { code: 'pro', name: 'Pro Affidabilità', description: 'Per PMI e consulenti che verificano clienti e fornitori ogni mese.', monthlyPriceCents: 7900, monthlyCredits: 10, recommended: true, guardrail: 'Rinnovo mensile con crediti controllati e audit.' },
  { code: 'agency', name: 'Agency Affidabilità', description: 'Per agenzie, studi e team commerciali con più operatori.', monthlyPriceCents: 19900, monthlyCredits: 30, guardrail: 'Uso team con governance e limiti anti-abuso.' },
];

export interface CreditWalletRuntime {
  availableCredits: number;
  reservedCredits: number;
  expiresAt?: string;
  nextSafeAction: string;
}

export const demoWallet: CreditWalletRuntime = {
  availableCredits: 10,
  reservedCredits: 1,
  nextSafeAction: 'Usa un credito solo quando hai confermato base giuridica e finalità della verifica.',
};

export const paymentProviderCopy: Record<PaymentProviderCode, { label: string; description: string; status: string }> = {
  stripe: { label: 'Carta / Stripe', description: 'Consigliato per MVP, checkout hosted, abbonamenti e rimborsi gestibili da webhook.', status: 'provider primario' },
  paypal: { label: 'PayPal', description: 'Secondo provider per conversione e fiducia cliente, attivabile dopo sandbox e webhook QA.', status: 'feature-flag' },
  mock: { label: 'Mock interno', description: 'Solo sviluppo e demo controllata. Mai attivo in produzione reale.', status: 'sviluppo' },
};

export const refundPolicyRows = [
  ['Provider non chiamato', 'Rimborso consentito', 'Rimborso automatico se non ci sono costi sostenuti.'],
  ['Provider chiamato', 'Review manuale', 'Serve motivazione e verifica costi provider.'],
  ['Report pubblicato o scaricato', 'Normalmente bloccato', 'Eccezioni solo con reason, audit e approvazione.'],
  ['Crediti consumati', 'Parziale sul residuo', 'Non si rimborsa il valore già usato.'],
  ['Dispute aperta', 'Rimborso bloccato', 'Evita doppio rimborso e gestisci da console admin.'],
];

export function formatEuro(cents: number) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}
