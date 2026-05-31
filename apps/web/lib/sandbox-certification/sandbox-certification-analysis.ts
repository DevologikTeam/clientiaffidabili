export type SandboxCertificationCard = {
  key: string;
  title: string;
  priority: 'blocker' | 'high' | 'medium';
  summary: string;
  nextAction: string;
};

export const sandboxCertificationAnalysisCards: SandboxCertificationCard[] = [
  {
    key: 'stripe',
    title: 'Stripe sandbox',
    priority: 'blocker',
    summary: 'Certificare pagamento, fallimento, 3DS, webhook duplicati, rimborso e dispute.',
    nextAction: 'Disegnare matrice test M19-P e script M19-S.',
  },
  {
    key: 'openapi-provider',
    title: 'Provider dati / Openapi',
    priority: 'blocker',
    summary: 'Garantire provider call solo post-payment, idempotenza, cost snapshot e raw payload vault.',
    nextAction: 'Definire test mock/sandbox e criteri di disattivazione live.',
  },
  {
    key: 'email-pdf',
    title: 'Email e PDF sicuro',
    priority: 'high',
    summary: 'Verificare delivery ledger, retry, suppression, link PDF sicuro e fallback dashboard.',
    nextAction: 'Progettare provider adapter e webhook sandbox.',
  },
  {
    key: 'openai',
    title: 'OpenAI copilot',
    priority: 'medium',
    summary: 'OpenAI resta disabilitabile; se attivo deve passare redaction, budget, output guard e audit.',
    nextAction: 'Definire test budget/errori/output vietati.',
  },
];
