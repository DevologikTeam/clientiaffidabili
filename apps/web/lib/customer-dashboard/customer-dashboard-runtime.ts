import type {
  CustomerDashboardCheckDetail,
  CustomerDashboardCheckItem,
  CustomerDashboardInvoiceItem,
  CustomerDashboardNotificationItem,
  CustomerDashboardSnapshot,
  CustomerDashboardSupportTicketItem,
} from '@clientiaffidabili/shared';

const now = new Date('2026-05-30T09:30:00.000Z');
const iso = (hoursAgo: number) => new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();

export function formatEuro(cents?: number) {
  if (typeof cents !== 'number') return '—';
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

export const customerDashboardChecks: CustomerDashboardCheckItem[] = [
  {
    id: 'demo-check-ready',
    orderId: 'demo-order-001',
    reportId: 'demo-report-ready',
    productCode: 'COMPANY_PRO',
    serviceName: 'Check Affidabilità Pro',
    subjectName: 'ACME Italia S.p.A.',
    subjectIdentifier: 'IT00000000000',
    status: 'report_ready',
    statusLabel: 'Report pronto',
    statusDescription: 'Il report è disponibile per la consultazione.',
    requestedAt: iso(30),
    updatedAt: iso(3),
    reportReadyAt: iso(3),
    amountGrossCents: 3038,
    currency: 'EUR',
    nextAction: { type: 'open_report', title: 'Report pronto da consultare', description: 'Apri il report pubblicato e valuta le azioni consigliate.', href: '/reports/demo-report-ready', ctaLabel: 'Apri report', priority: 'high' },
  },
  {
    id: 'demo-check-review',
    orderId: 'demo-order-002',
    productCode: 'KYB_COMPLIANCE',
    serviceName: 'KYB Compliance',
    subjectName: 'Beta Forniture S.r.l.',
    subjectIdentifier: 'IT11111111111',
    status: 'internal_review',
    statusLabel: 'Controllo interno',
    statusDescription: 'Stiamo verificando alcuni elementi prima di pubblicare il report.',
    requestedAt: iso(2),
    updatedAt: iso(0.5),
    amountGrossCents: 6088,
    currency: 'EUR',
    nextAction: { type: 'start_new_check', title: 'Controllo interno in corso', description: 'Non serve fare nulla: ti avviseremo appena il report sarà disponibile.', href: '/dashboard/verifiche/demo-check-review', ctaLabel: 'Vedi stato', priority: 'medium' },
  },
  {
    id: 'demo-check-processing',
    orderId: 'demo-order-003',
    productCode: 'IBAN_CHECK',
    serviceName: 'Verifica IBAN',
    subjectName: 'IBAN fornitore estero',
    subjectIdentifier: '**** 2381',
    status: 'processing',
    statusLabel: 'Verifica in corso',
    statusDescription: 'I dati sono in lavorazione.',
    requestedAt: iso(0.25),
    updatedAt: iso(0.08),
    amountGrossCents: 598,
    currency: 'EUR',
  },
];

export const customerDashboardInvoices: CustomerDashboardInvoiceItem[] = [
  { id: 'demo-invoice-001', orderId: 'demo-order-001', label: 'Documento fiscale in preparazione', taxableAmountCents: 2490, vatAmountCents: 548, totalAmountCents: 3038, currency: 'EUR', status: 'preparing', nextActionLabel: 'In preparazione' },
  { id: 'demo-invoice-002', orderId: 'demo-order-000', label: 'Fattura FA-2026-0001', taxableAmountCents: 1490, vatAmountCents: 328, totalAmountCents: 1818, currency: 'EUR', status: 'issued', issuedAt: iso(72), downloadUrl: '#', nextActionLabel: 'Scarica documento' },
];

export const customerDashboardNotifications: CustomerDashboardNotificationItem[] = [
  { id: 'demo-notification-001', title: 'Report pronto', body: 'Il report ACME Italia S.p.A. è disponibile nella tua area cliente.', tone: 'success', href: '/reports/demo-report-ready', status: 'unread', createdAt: iso(3) },
  { id: 'demo-notification-002', title: 'Controllo interno in corso', body: 'Una verifica KYB richiede un controllo qualità prima della pubblicazione.', tone: 'warning', href: '/dashboard/verifiche/demo-check-review', status: 'read', createdAt: iso(0.5) },
];

export const customerDashboardTickets: CustomerDashboardSupportTicketItem[] = [
  { id: 'demo-ticket-001', subject: 'Chiarimento su una fattura', category: 'billing', status: 'in_review', priority: 'high', relatedType: 'invoice', relatedId: 'demo-invoice-001', createdAt: iso(18), updatedAt: iso(4) },
];

export const customerDashboardSnapshot: CustomerDashboardSnapshot = {
  summary: {
    readyReports: customerDashboardChecks.filter((item) => item.status === 'report_ready').length,
    pendingChecks: customerDashboardChecks.filter((item) => ['payment_received', 'processing', 'internal_review'].includes(item.status)).length,
    actionRequired: customerDashboardChecks.filter((item) => ['action_required', 'support_required'].includes(item.status)).length,
    unreadNotifications: customerDashboardNotifications.filter((item) => item.status === 'unread').length,
    totalChecks: customerDashboardChecks.length,
    nextBestAction: customerDashboardChecks[0].nextAction!,
  },
  checks: customerDashboardChecks,
  invoices: customerDashboardInvoices,
  notifications: customerDashboardNotifications,
  supportTickets: customerDashboardTickets,
};

export function getCustomerCheckDetail(id: string): CustomerDashboardCheckDetail {
  const item = customerDashboardChecks.find((check) => check.id === id) ?? customerDashboardChecks[0];
  const completed = item.status === 'report_ready';
  return {
    ...item,
    timeline: [
      { key: 'payment', label: 'Pagamento ricevuto', description: 'Ordine registrato e pagamento confermato.', completed: true, occurredAt: item.requestedAt },
      { key: 'data', label: 'Dati acquisiti', description: 'La richiesta contiene i dati necessari alla verifica.', completed: true, occurredAt: item.requestedAt },
      { key: 'processing', label: 'Verifica in corso', description: 'Stiamo raccogliendo e normalizzando le informazioni disponibili.', completed: completed || item.status === 'internal_review' || item.status === 'processing', current: item.status === 'processing', occurredAt: item.updatedAt },
      { key: 'review', label: 'Controllo interno', description: 'Controllo qualità prima della pubblicazione, se necessario.', completed, current: item.status === 'internal_review', occurredAt: item.status === 'internal_review' ? item.updatedAt : undefined },
      { key: 'report', label: 'Report disponibile', description: 'Il report è pronto per la consultazione.', completed, current: false, occurredAt: item.reportReadyAt },
    ],
    reportAccess: item.reportId ? { reportId: item.reportId, status: completed ? 'ready' : 'review_required', href: `/reports/${item.reportId}`, downloadable: completed, downloadStatusLabel: completed ? 'Report consultabile. Download PDF previsto nello sprint export.' : 'Report non ancora pubblicato.' } : undefined,
    supportContext: { suggestedSubject: `Supporto per ${item.subjectName}`, relatedType: 'check', relatedId: item.id },
  };
}

export function statusTone(status: CustomerDashboardCheckItem['status']): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  if (status === 'report_ready') return 'success';
  if (status === 'internal_review' || status === 'action_required') return 'warning';
  if (status === 'support_required') return 'danger';
  if (status === 'refunded' || status === 'archived') return 'neutral';
  return 'info';
}
