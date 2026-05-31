export type CustomerCheckStatus =
  | 'payment_received'
  | 'processing'
  | 'internal_review'
  | 'report_ready'
  | 'action_required'
  | 'support_required'
  | 'refunded'
  | 'archived';

export type CustomerDashboardRoute = {
  label: string;
  href: string;
  description: string;
  mvp: boolean;
};

export const customerDashboardRoutes: CustomerDashboardRoute[] = [
  {
    label: 'Panoramica',
    href: '/dashboard',
    description: 'Stato operativo, prossima azione, report pronti e verifiche recenti.',
    mvp: true,
  },
  {
    label: 'Verifiche',
    href: '/dashboard/verifiche',
    description: 'Storico richieste, stati cliente, dettaglio verifica e accesso report.',
    mvp: true,
  },
  {
    label: 'Report',
    href: '/dashboard/report',
    description: 'Archivio dei report pubblicati e autorizzati.',
    mvp: false,
  },
  {
    label: 'Fatture',
    href: '/dashboard/fatture',
    description: 'Ordini, pagamenti e fatture disponibili.',
    mvp: true,
  },
  {
    label: 'Supporto',
    href: '/dashboard/supporto',
    description: 'Richieste di supporto collegate a verifica, report, ordine o fattura.',
    mvp: true,
  },
];

export const customerStatusCopy: Record<CustomerCheckStatus, { label: string; description: string; tone: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
  payment_received: {
    label: 'Pagamento ricevuto',
    description: 'Stiamo preparando la verifica.',
    tone: 'info',
  },
  processing: {
    label: 'Verifica in corso',
    description: 'I dati sono in elaborazione.',
    tone: 'info',
  },
  internal_review: {
    label: 'Controllo interno',
    description: 'Stiamo verificando alcuni dati prima di pubblicare il report.',
    tone: 'warning',
  },
  report_ready: {
    label: 'Report pronto',
    description: 'Il report è disponibile per la consultazione.',
    tone: 'success',
  },
  action_required: {
    label: 'Serve un tuo dato',
    description: 'Completa le informazioni richieste per proseguire.',
    tone: 'warning',
  },
  support_required: {
    label: 'Serve assistenza',
    description: 'La richiesta richiede un controllo operativo.',
    tone: 'danger',
  },
  refunded: {
    label: 'Rimborso registrato',
    description: 'Il pagamento è stato rimborsato.',
    tone: 'neutral',
  },
  archived: {
    label: 'Archiviata',
    description: 'La verifica è archiviata e resta consultabile se autorizzata.',
    tone: 'neutral',
  },
};

export const customerDashboardComponents = [
  'CustomerShell',
  'DashboardStatusHero',
  'NextBestActionCard',
  'CheckListItem',
  'CheckTimeline',
  'ReportAccessCard',
  'InvoiceListItem',
  'NotificationItem',
  'SupportEntryCard',
] as const;

export const customerDashboardForbiddenCopy = [
  'webhook',
  'raw payload',
  'provider retry',
  'idempotency',
  'queue interna',
  'vault',
  'claim assoluti di affidabilita',
] as const;

export const nextBestActionPriority = [
  'action_required',
  'report_ready_unread',
  'invoice_available',
  'profile_incomplete',
  'start_new_check',
] as const;
