export type SettingsNamespaceState = 'ok' | 'warning' | 'error' | 'disabled';
export type SettingsAdminPageStatus = 'active' | 'disabled' | 'requires_review' | 'error';

export interface SettingsAdminNamespaceCard {
  namespace: string;
  label: string;
  description: string;
  state: SettingsNamespaceState;
  issueCount: number;
  primaryAction: string;
}

export interface SettingsAdminSettingRow {
  namespace: string;
  key: string;
  label: string;
  description: string;
  state: SettingsAdminPageStatus;
  displayValue: string;
  sensitivity: 'public_admin' | 'restricted_admin' | 'secret_write_only';
  reasonRequired: boolean;
  goLiveBlocker: boolean;
}

export interface OperationalErrorRow {
  id: string;
  category: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  status: string;
  safeMessage: string;
  linkedObject: string;
  nextAction: string;
  refundRelevant: boolean;
}

export const settingsAdminRuntime = {
  summary: {
    purchasesEnabled: false,
    criticalErrors: 2,
    settingsRequiringReview: 5,
    openErrors: 8,
    launchStatus: 'Non pronto al go-live finche secret, webhook e provider non sono verificati.',
  },
  namespaces: [
    {
      namespace: 'commerce',
      label: 'Acquisti e checkout',
      description: 'Kill switch server-side, messaggio cliente e continuita ordini gia pagati.',
      state: 'warning',
      issueCount: 1,
      primaryAction: 'Verifica stato acquisti',
    },
    {
      namespace: 'payments',
      label: 'Stripe e PayPal',
      description: 'Secret write-only, webhook, sandbox/live e abbonamenti.',
      state: 'warning',
      issueCount: 2,
      primaryAction: 'Configura provider',
    },
    {
      namespace: 'provider_openapi',
      label: 'Openapi provider',
      description: 'Abilitazione chiamate, API key e regole di costo/margine.',
      state: 'warning',
      issueCount: 1,
      primaryAction: 'Verifica provider',
    },
    {
      namespace: 'openai',
      label: 'OpenAI e funzioni AI',
      description: 'Use case abilitati, API key, budget, redaction e error ledger.',
      state: 'disabled',
      issueCount: 1,
      primaryAction: 'Configura AI interna',
    },
  ] satisfies SettingsAdminNamespaceCard[],
  settings: [
    {
      namespace: 'commerce',
      key: 'purchases.enabled',
      label: 'Acquisti attivi',
      description: 'Blocca o abilita nuove sessioni checkout senza fermare ordini gia pagati.',
      state: 'disabled',
      displayValue: 'false',
      sensitivity: 'restricted_admin',
      reasonRequired: true,
      goLiveBlocker: true,
    },
    {
      namespace: 'payments',
      key: 'stripe.secretKey',
      label: 'Stripe Secret Key',
      description: 'Valore write-only: la UI mostra solo stato e secret reference redatta.',
      state: 'requires_review',
      displayValue: 'sk_...7A9x',
      sensitivity: 'secret_write_only',
      reasonRequired: true,
      goLiveBlocker: true,
    },
    {
      namespace: 'provider_openapi',
      key: 'openapi.apiKey',
      label: 'Openapi API Key',
      description: 'Secret backend-only per chiamate provider dati.',
      state: 'requires_review',
      displayValue: '********',
      sensitivity: 'secret_write_only',
      reasonRequired: true,
      goLiveBlocker: true,
    },
    {
      namespace: 'openai',
      key: 'openai.monthlyBudgetCents',
      label: 'Budget mensile OpenAI',
      description: 'Limite interno per evitare costi imprevisti e uso non controllato.',
      state: 'active',
      displayValue: '50,00 €',
      sensitivity: 'restricted_admin',
      reasonRequired: true,
      goLiveBlocker: false,
    },
  ] satisfies SettingsAdminSettingRow[],
  errors: [
    {
      id: 'err_pay_001',
      category: 'payment',
      severity: 'critical',
      status: 'new',
      safeMessage: 'Webhook pagamento non riconciliato.',
      linkedObject: 'order_demo_001',
      nextAction: 'Verifica provider, poi retry o rimborso.',
      refundRelevant: true,
    },
    {
      id: 'err_openapi_001',
      category: 'openapi_provider',
      severity: 'error',
      status: 'investigating',
      safeMessage: 'Provider dati non ha restituito una risposta valida.',
      linkedObject: 'check_demo_002',
      nextAction: 'Rivedi request, apri ticket provider o rimborso manuale.',
      refundRelevant: true,
    },
    {
      id: 'err_openai_001',
      category: 'openai_api',
      severity: 'warning',
      status: 'fix_pending',
      safeMessage: 'Funzione AI interna ha superato il budget giornaliero.',
      linkedObject: 'seo_page_draft',
      nextAction: 'Abbassa usage o aumenta budget con reason.',
      refundRelevant: false,
    },
  ] satisfies OperationalErrorRow[],
};
