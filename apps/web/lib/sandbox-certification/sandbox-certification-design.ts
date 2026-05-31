export type SandboxCertificationCard = {
  area: string;
  label: string;
  description: string;
  blockerForRc: boolean;
  nextAction: string;
};

export const sandboxCertificationCards: SandboxCertificationCard[] = [
  {
    area: 'payments.stripe',
    label: 'Stripe sandbox',
    description: 'Pagamenti, webhook, rimborsi, dispute e subscription in modalità test.',
    blockerForRc: true,
    nextAction: 'Eseguire scenari pagamento riuscito/fallito e rimborso.',
  },
  {
    area: 'provider.openapi',
    label: 'Openapi provider',
    description: 'Chiamate dati solo dopo pagamento o credito riservato, con cost snapshot e idempotenza.',
    blockerForRc: true,
    nextAction: 'Certificare mock/sandbox e blocco pre-payment.',
  },
  {
    area: 'email.delivery',
    label: 'Email e PDF',
    description: 'Delivery ledger, retry, suppression, link PDF sicuro e fallback dashboard.',
    blockerForRc: true,
    nextAction: 'Eseguire invio documento pronto e recupero password.',
  },
  {
    area: 'ai.openai',
    label: 'OpenAI copilot',
    description: 'Copilot interno disabilitabile, redaction, budget, draft approval e usage ledger.',
    blockerForRc: false,
    nextAction: 'Lasciare disabilitato se non certificato.',
  },
];

export const sandboxCertificationDesignVersion = '0.67.0';
