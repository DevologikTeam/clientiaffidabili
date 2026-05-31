export type CustomerFacingStatus =
  | 'draft_order'
  | 'payment_required'
  | 'payment_failed'
  | 'processing'
  | 'manual_review'
  | 'report_ready'
  | 'action_required'
  | 'refunded'
  | 'cancelled'
  | 'support_needed';

export type CustomerNextAction =
  | 'resume_checkout'
  | 'retry_payment'
  | 'wait_processing'
  | 'open_report'
  | 'complete_missing_data'
  | 'contact_support'
  | 'download_invoice'
  | 'none';

export interface CustomerDashboardModuleAnalysis {
  id: string;
  label: string;
  purpose: string;
  mvpPriority: 'high' | 'medium' | 'post_mvp';
  primaryRisks: string[];
  requiredDataSources: string[];
}

export const customerDashboardModules: CustomerDashboardModuleAnalysis[] = [
  {
    id: 'overview',
    label: 'Panoramica',
    purpose: 'Mostrare cosa è pronto, cosa è in lavorazione, cosa è bloccato e quale azione fare ora.',
    mvpPriority: 'high',
    primaryRisks: ['troppi indicatori', 'stati tecnici esposti', 'CTA generiche'],
    requiredDataSources: ['orders', 'payments', 'providerRequests', 'reports', 'invoices'],
  },
  {
    id: 'checks',
    label: 'Verifiche',
    purpose: 'Permettere al cliente di ritrovare ogni verifica richiesta e capirne lo stato.',
    mvpPriority: 'high',
    primaryRisks: ['filtri insufficienti', 'stato non comprensibile', 'dati soggetto troppo esposti'],
    requiredDataSources: ['orders', 'checks', 'providerRequests', 'reports'],
  },
  {
    id: 'reports',
    label: 'Report',
    purpose: 'Dare accesso ai report pubblicati con fonti, limiti e prossima azione prudente.',
    mvpPriority: 'high',
    primaryRisks: ['claim assoluti', 'accesso non autorizzato', 'download non tracciato'],
    requiredDataSources: ['reports', 'auditLogs'],
  },
  {
    id: 'billing',
    label: 'Ordini e fatture',
    purpose: 'Mostrare pagamenti, fatture e ricevute in modo separato dal contenuto dei report.',
    mvpPriority: 'medium',
    primaryRisks: ['confusione tra pagamento e fattura', 'dati fiscali incompleti'],
    requiredDataSources: ['orders', 'payments', 'invoices', 'billingProfiles'],
  },
  {
    id: 'support',
    label: 'Supporto',
    purpose: 'Consentire assistenza contestuale su ordine, pagamento o report.',
    mvpPriority: 'medium',
    primaryRisks: ['ticket duplicati', 'dati sensibili nelle email', 'assenza priorità'],
    requiredDataSources: ['orders', 'reports', 'supportTickets'],
  },
];

export const customerStatusCopy: Record<CustomerFacingStatus, { label: string; description: string; action: CustomerNextAction }> = {
  draft_order: {
    label: 'Ordine non completato',
    description: 'La verifica non è ancora stata avviata perché l\'ordine non è completo.',
    action: 'resume_checkout',
  },
  payment_required: {
    label: 'Pagamento richiesto',
    description: 'Completa il pagamento per avviare la verifica.',
    action: 'resume_checkout',
  },
  payment_failed: {
    label: 'Pagamento non riuscito',
    description: 'Il pagamento non è andato a buon fine. Puoi riprovare in sicurezza.',
    action: 'retry_payment',
  },
  processing: {
    label: 'Verifica in elaborazione',
    description: 'Stiamo recuperando e preparando le informazioni disponibili.',
    action: 'wait_processing',
  },
  manual_review: {
    label: 'Controllo qualità in corso',
    description: 'La verifica richiede un controllo interno prima della pubblicazione del report.',
    action: 'wait_processing',
  },
  report_ready: {
    label: 'Report pronto',
    description: 'Il report è disponibile con fonti, limiti e prossime azioni suggerite.',
    action: 'open_report',
  },
  action_required: {
    label: 'Azione richiesta',
    description: 'Servono informazioni o una conferma per proseguire.',
    action: 'complete_missing_data',
  },
  refunded: {
    label: 'Rimborsato',
    description: 'Il pagamento è stato rimborsato secondo lo stato dell\'ordine.',
    action: 'none',
  },
  cancelled: {
    label: 'Annullato',
    description: 'La verifica è stata annullata e non produrrà un report.',
    action: 'none',
  },
  support_needed: {
    label: 'Assistenza necessaria',
    description: 'La verifica richiede supporto operativo.',
    action: 'contact_support',
  },
};

export const m7aGuardrails = [
  'La dashboard cliente non espone payload provider grezzi.',
  'La dashboard cliente non mostra errori tecnici non spiegati.',
  'Ogni stato cliente deve avere motivo, impatto e prossima azione.',
  'I report sono visibili solo se pubblicati e autorizzati.',
  'Download e apertura report devono essere auditabili.',
  'Le email non devono contenere dati sensibili del report.',
];
