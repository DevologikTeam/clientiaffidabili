export type DashboardDataSource =
  | 'orders'
  | 'payments'
  | 'checkoutSessions'
  | 'providerRequests'
  | 'reports'
  | 'invoices'
  | 'auditLogs'
  | 'supportTickets';

export interface DashboardStateMappingCandidate {
  technicalSignals: string[];
  customerStatus: string;
  customerCopy: string;
  nextAction: string;
}

export const dashboardStateMappingCandidates: DashboardStateMappingCandidate[] = [
  {
    technicalSignals: ['order.status=draft'],
    customerStatus: 'draft_order',
    customerCopy: 'Ordine non completato',
    nextAction: 'resume_checkout',
  },
  {
    technicalSignals: ['payment.status=failed'],
    customerStatus: 'payment_failed',
    customerCopy: 'Pagamento non riuscito',
    nextAction: 'retry_payment',
  },
  {
    technicalSignals: ['payment.status=confirmed', 'providerRequest.status=pending'],
    customerStatus: 'processing',
    customerCopy: 'Verifica in elaborazione',
    nextAction: 'wait_processing',
  },
  {
    technicalSignals: ['providerRequest.status=completed', 'report.status=review_required'],
    customerStatus: 'manual_review',
    customerCopy: 'Controllo qualità in corso',
    nextAction: 'wait_processing',
  },
  {
    technicalSignals: ['report.status=published'],
    customerStatus: 'report_ready',
    customerCopy: 'Report pronto',
    nextAction: 'open_report',
  },
];

export const customerDashboardAnalysisDataSources: DashboardDataSource[] = [
  'orders',
  'payments',
  'checkoutSessions',
  'providerRequests',
  'reports',
  'invoices',
  'auditLogs',
  'supportTickets',
];

export const customerDashboardSecurityNotes = [
  'Ogni query customer deve essere workspace-scoped.',
  'Il raw provider payload resta nel vault e non viene serializzato nei DTO customer.',
  'Apertura report e download futuro generano audit log.',
  'Le notifiche email non includono contenuto del report.',
];
