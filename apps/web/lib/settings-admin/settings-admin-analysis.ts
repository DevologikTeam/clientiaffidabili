export const settingsAdminAnalysis = {
  title: 'Platform Settings, Bootstrap Admin & Operational Error Ledger',
  status: 'analysis_completed',
  primaryAdminQuestions: [
    'La piattaforma puo vendere in questo momento?',
    'Quali provider sono attivi o degradati?',
    'Quali errori richiedono rimborso, retry, fix o comunicazione cliente?',
    'Quali modifiche sensibili sono state fatte e per quale motivo?',
  ],
  requiredSections: [
    'Stato piattaforma',
    'Acquisti e checkout',
    'Pagamenti Stripe/PayPal',
    'Provider Openapi',
    'OpenAI settings',
    'Operational error ledger',
    'Buyer IP audit',
    'Audit settings',
  ],
  guardrails: [
    'Nessun segreto in chiaro nel frontend',
    'Kill switch acquisti sempre server-side',
    'Reason obbligatoria per modifiche sensibili',
    'Raw payload e stack trace sempre redatti',
    'IP completo visibile solo a ruoli autorizzati e con audit',
  ],
};

export type SettingsAdminAnalysis = typeof settingsAdminAnalysis;
