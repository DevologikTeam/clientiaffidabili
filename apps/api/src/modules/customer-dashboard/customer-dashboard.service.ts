import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  CustomerDashboardCheckDetail,
  CustomerDashboardCheckItem,
  CustomerDashboardCheckStatus,
  CustomerDashboardInvoiceItem,
  CustomerDashboardNextAction,
  CustomerDashboardNotificationItem,
  CustomerDashboardSnapshot,
  CustomerDashboardSupportTicketItem,
} from '@clientiaffidabili/shared';
import { Invoice } from '../billing/entities/invoice.entity';
import { Check } from '../checks/check.entity';
import { Order } from '../orders/order.entity';
import { Report } from '../reports/report.entity';
import { CustomerNotification } from './entities/customer-notification.entity';
import { SupportTicket } from './entities/support-ticket.entity';

const DEFAULT_ORGANIZATION_ID = 'demo-org';
const DEFAULT_USER_ID = 'demo-user';

@Injectable()
export class CustomerDashboardService {
  constructor(
    @InjectRepository(Check) private readonly checks: Repository<Check>,
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    @InjectRepository(Report) private readonly reports: Repository<Report>,
    @InjectRepository(Invoice) private readonly invoices: Repository<Invoice>,
    @InjectRepository(CustomerNotification) private readonly notifications: Repository<CustomerNotification>,
    @InjectRepository(SupportTicket) private readonly tickets: Repository<SupportTicket>,
  ) {}

  async snapshot(organizationId = DEFAULT_ORGANIZATION_ID, userId = DEFAULT_USER_ID): Promise<CustomerDashboardSnapshot> {
    const checks = await this.listChecks(organizationId);
    const invoices = await this.listInvoices(organizationId);
    const notifications = await this.listNotifications(organizationId, userId);
    const supportTickets = await this.listSupportTickets(organizationId, userId);
    return {
      summary: this.summaryFrom(checks, notifications),
      checks,
      invoices,
      notifications,
      supportTickets,
    };
  }

  async listChecks(organizationId = DEFAULT_ORGANIZATION_ID): Promise<CustomerDashboardCheckItem[]> {
    const rows = await this.checks.find({ where: { organizationId }, order: { createdAt: 'DESC' }, take: 50 });
    if (rows.length === 0) return this.demoChecks();
    const reportRows = await this.reports.find({ order: { createdAt: 'DESC' }, take: 100 });
    const orderRows = await this.orders.find({ where: { organizationId }, order: { createdAt: 'DESC' }, take: 100 });
    return rows.map((check) => this.checkToCustomerItem(check, reportRows, orderRows));
  }

  async getCheckDetail(id: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<CustomerDashboardCheckDetail> {
    const checks = await this.listChecks(organizationId);
    const found = checks.find((item) => item.id === id) ?? checks[0];
    if (!found) throw new NotFoundException('Verifica non trovata.');
    return {
      ...found,
      timeline: this.timelineFor(found),
      reportAccess: found.reportId
        ? {
            reportId: found.reportId,
            status: found.status === 'report_ready' ? 'ready' : 'review_required',
            href: `/reports/${found.reportId}`,
            downloadable: found.status === 'report_ready',
            downloadStatusLabel: found.status === 'report_ready' ? 'Download PDF disponibile dopo pubblicazione export' : 'Download non ancora disponibile',
          }
        : undefined,
      supportContext: {
        suggestedSubject: `Richiesta supporto per ${found.subjectName}`,
        relatedType: 'check',
        relatedId: found.id,
      },
    };
  }

  async listInvoices(_organizationId = DEFAULT_ORGANIZATION_ID): Promise<CustomerDashboardInvoiceItem[]> {
    const rows = await this.invoices.find({ order: { createdAt: 'DESC' }, take: 50 });
    if (rows.length === 0) return this.demoInvoices();
    return rows.map((row) => ({
      id: row.id,
      orderId: row.orderId,
      label: row.invoiceNumber ? `Fattura ${row.invoiceNumber}` : `Documento in preparazione per ordine ${row.orderId.slice(0, 8)}`,
      taxableAmountCents: row.amountNetCents,
      vatAmountCents: row.vatCents,
      totalAmountCents: row.totalCents,
      currency: 'EUR',
      status: row.status === 'pending' ? 'preparing' : row.status === 'issued' ? 'issued' : row.status === 'cancelled' ? 'void' : 'preparing',
      issuedAt: row.issuedAt?.toISOString(),
      downloadUrl: row.status === 'issued' ? `/dashboard/fatture/${row.id}/download` : undefined,
      nextActionLabel: row.status === 'issued' ? 'Scarica documento' : 'Documento in preparazione',
    }));
  }

  async listNotifications(organizationId = DEFAULT_ORGANIZATION_ID, userId = DEFAULT_USER_ID): Promise<CustomerDashboardNotificationItem[]> {
    const rows = await this.notifications.find({ where: { organizationId, userId }, order: { createdAt: 'DESC' }, take: 20 });
    if (rows.length === 0) return this.demoNotifications();
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      body: row.body,
      tone: row.tone,
      href: row.href,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    }));
  }

  async listSupportTickets(organizationId = DEFAULT_ORGANIZATION_ID, userId = DEFAULT_USER_ID): Promise<CustomerDashboardSupportTicketItem[]> {
    const rows = await this.tickets.find({ where: { organizationId, userId }, order: { createdAt: 'DESC' }, take: 20 });
    if (rows.length === 0) return this.demoTickets();
    return rows.map((row) => ({
      id: row.id,
      subject: row.subject,
      category: row.category,
      status: row.status,
      priority: row.priority,
      relatedType: row.relatedType,
      relatedId: row.relatedId,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));
  }

  async createSupportTicket(input: {
    organizationId?: string;
    userId?: string;
    subject: string;
    message: string;
    category?: CustomerDashboardSupportTicketItem['category'];
    relatedType?: CustomerDashboardSupportTicketItem['relatedType'];
    relatedId?: string;
  }): Promise<CustomerDashboardSupportTicketItem> {
    const ticket = await this.tickets.save(this.tickets.create({
      organizationId: input.organizationId ?? DEFAULT_ORGANIZATION_ID,
      userId: input.userId ?? DEFAULT_USER_ID,
      subject: input.subject,
      message: input.message,
      category: input.category ?? 'other',
      relatedType: input.relatedType,
      relatedId: input.relatedId,
      status: 'open',
      priority: input.category === 'billing' ? 'high' : 'normal',
    }));
    return {
      id: ticket.id,
      subject: ticket.subject,
      category: ticket.category,
      status: ticket.status,
      priority: ticket.priority,
      relatedType: ticket.relatedType,
      relatedId: ticket.relatedId,
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
    };
  }

  private checkToCustomerItem(check: Check, reports: Report[], orders: Order[]): CustomerDashboardCheckItem {
    const report = reports.find((item) => item.checkId === check.id || item.orderId === check.orderId);
    const order = orders.find((item) => item.id === check.orderId);
    const status = this.mapCheckStatus(check, report, order);
    const subjectName = String(check.subjectPayload.businessName ?? check.subjectPayload.name ?? check.subjectPayload.vatNumber ?? 'Soggetto verificato');
    return {
      id: check.id,
      orderId: check.orderId,
      reportId: report?.id,
      productCode: check.productCode,
      serviceName: this.productLabel(check.productCode),
      subjectName,
      subjectIdentifier: String(check.subjectPayload.vatNumber ?? check.subjectPayload.taxId ?? ''),
      status,
      statusLabel: this.statusLabel(status),
      statusDescription: this.statusDescription(status),
      requestedAt: check.createdAt.toISOString(),
      updatedAt: check.updatedAt.toISOString(),
      reportReadyAt: report?.publishedAt?.toISOString(),
      amountGrossCents: order?.totalCents,
      currency: 'EUR',
      nextAction: this.nextActionForStatus(status, report?.id, check.id),
    };
  }

  private mapCheckStatus(check: Check, report?: Report, order?: Order): CustomerDashboardCheckStatus {
    if (order?.status === 'refunded') return 'refunded';
    if (report?.status === 'ready') return 'report_ready';
    if (report?.status === 'review_required' || check.status === 'requires_review') return 'internal_review';
    if (check.status === 'failed') return 'support_required';
    if (order?.status === 'paid' && check.status === 'queued') return 'payment_received';
    if (['provider_requested', 'waiting_callback', 'processing_result', 'completed'].includes(check.status)) return 'processing';
    return 'processing';
  }

  private summaryFrom(checks: CustomerDashboardCheckItem[], notifications: CustomerDashboardNotificationItem[]) {
    const ready = checks.filter((check) => check.status === 'report_ready').length;
    const actionRequired = checks.filter((check) => check.status === 'action_required' || check.status === 'support_required').length;
    const pending = checks.filter((check) => ['payment_received', 'processing', 'internal_review'].includes(check.status)).length;
    return {
      readyReports: ready,
      pendingChecks: pending,
      actionRequired,
      unreadNotifications: notifications.filter((item) => item.status === 'unread').length,
      totalChecks: checks.length,
      nextBestAction: checks.find((check) => check.nextAction)?.nextAction ?? this.defaultNextAction(),
    };
  }

  private nextActionForStatus(status: CustomerDashboardCheckStatus, reportId?: string, checkId?: string): CustomerDashboardNextAction | undefined {
    if (status === 'report_ready' && reportId) {
      return { type: 'open_report', title: 'Report pronto da consultare', description: 'Apri il report pubblicato e valuta le prossime azioni consigliate.', href: `/reports/${reportId}`, ctaLabel: 'Apri report', priority: 'high' };
    }
    if (status === 'support_required') {
      return { type: 'contact_support', title: 'Serve assistenza', description: 'Apri una richiesta collegata alla verifica per ricevere supporto operativo.', href: `/dashboard/supporto?check=${checkId ?? ''}`, ctaLabel: 'Contatta supporto', priority: 'high' };
    }
    if (status === 'internal_review') {
      return { type: 'start_new_check', title: 'Controllo interno in corso', description: 'Non serve fare nulla: pubblicheremo il report appena completata la verifica.', href: `/dashboard/verifiche/${checkId ?? ''}`, ctaLabel: 'Vedi stato', priority: 'medium' };
    }
    return undefined;
  }

  private defaultNextAction(): CustomerDashboardNextAction {
    return { type: 'start_new_check', title: 'Avvia una nuova verifica', description: 'Scegli un servizio e verifica un cliente, fornitore o partner prima di procedere.', href: '/servizi', ctaLabel: 'Nuova verifica', priority: 'low' };
  }

  private timelineFor(item: CustomerDashboardCheckItem) {
    const statuses: Array<{ key: string; label: string; description: string; applies: boolean }> = [
      { key: 'payment', label: 'Pagamento ricevuto', description: 'Ordine registrato e pagamento confermato.', applies: true },
      { key: 'data', label: 'Dati acquisiti', description: 'La richiesta contiene i dati necessari alla verifica.', applies: true },
      { key: 'processing', label: 'Verifica in corso', description: 'Stiamo raccogliendo e normalizzando le informazioni disponibili.', applies: true },
      { key: 'review', label: 'Controllo interno', description: 'Controllo qualità prima della pubblicazione se necessario.', applies: ['internal_review', 'report_ready'].includes(item.status) },
      { key: 'report', label: 'Report disponibile', description: 'Il report è pronto per la consultazione.', applies: item.status === 'report_ready' },
    ];
    let currentAssigned = false;
    return statuses.map((step) => {
      const completed = step.applies && (item.status === 'report_ready' || step.key !== 'report');
      const current = !currentAssigned && !completed;
      if (current) currentAssigned = true;
      return { ...step, completed, current, occurredAt: completed ? item.updatedAt : undefined };
    });
  }

  private productLabel(productCode: string) {
    const labels: Record<string, string> = {
      COMPANY_START: 'Verifica azienda essenziale',
      COMPANY_PRO: 'Check Affidabilità Pro',
      COMPANY_BALANCE: 'Affidabilità Pro + Bilancio',
      KYB_COMPLIANCE: 'KYB Compliance',
      IBAN_CHECK: 'Verifica IBAN',
      CONTACT_CHECK: 'Verifica email e telefono',
    };
    return labels[productCode] ?? 'Verifica ClientiAffidabili';
  }

  private statusLabel(status: CustomerDashboardCheckStatus) {
    return {
      payment_received: 'Pagamento ricevuto',
      processing: 'Verifica in corso',
      internal_review: 'Controllo interno',
      report_ready: 'Report pronto',
      action_required: 'Serve un dato',
      support_required: 'Serve assistenza',
      refunded: 'Rimborso registrato',
      archived: 'Archiviata',
    }[status];
  }

  private statusDescription(status: CustomerDashboardCheckStatus) {
    return {
      payment_received: 'Stiamo preparando la richiesta.',
      processing: 'I dati sono in lavorazione.',
      internal_review: 'Stiamo verificando alcuni elementi prima di pubblicare.',
      report_ready: 'Il report è disponibile.',
      action_required: 'Completa le informazioni richieste.',
      support_required: 'Serve un controllo operativo del team.',
      refunded: 'Il pagamento è stato rimborsato.',
      archived: 'La verifica resta consultabile se autorizzata.',
    }[status];
  }

  private demoChecks(): CustomerDashboardCheckItem[] {
    const now = new Date();
    const readyAt = new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString();
    const yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 27).toISOString();
    return [
      {
        id: 'demo-check-ready', orderId: 'demo-order-001', reportId: 'demo-report-ready', productCode: 'COMPANY_PRO', serviceName: 'Check Affidabilità Pro', subjectName: 'ACME Italia S.p.A.', subjectIdentifier: 'IT00000000000', status: 'report_ready', statusLabel: 'Report pronto', statusDescription: 'Il report è disponibile.', requestedAt: yesterday, updatedAt: readyAt, reportReadyAt: readyAt, amountGrossCents: 3038, currency: 'EUR', nextAction: { type: 'open_report', title: 'Report pronto da consultare', description: 'Apri il report e valuta le prossime azioni consigliate.', href: '/reports/demo-report-ready', ctaLabel: 'Apri report', priority: 'high' },
      },
      {
        id: 'demo-check-review', orderId: 'demo-order-002', productCode: 'KYB_COMPLIANCE', serviceName: 'KYB Compliance', subjectName: 'Beta Forniture S.r.l.', subjectIdentifier: 'IT11111111111', status: 'internal_review', statusLabel: 'Controllo interno', statusDescription: 'Stiamo verificando alcuni elementi prima di pubblicare.', requestedAt: new Date(now.getTime() - 1000 * 60 * 80).toISOString(), updatedAt: new Date(now.getTime() - 1000 * 60 * 20).toISOString(), amountGrossCents: 6088, currency: 'EUR', nextAction: { type: 'start_new_check', title: 'Controllo interno in corso', description: 'Non serve fare nulla: ti avviseremo appena il report sarà disponibile.', href: '/dashboard/verifiche/demo-check-review', ctaLabel: 'Vedi stato', priority: 'medium' },
      },
      {
        id: 'demo-check-processing', orderId: 'demo-order-003', productCode: 'IBAN_CHECK', serviceName: 'Verifica IBAN', subjectName: 'IBAN fornitore estero', subjectIdentifier: '**** 2381', status: 'processing', statusLabel: 'Verifica in corso', statusDescription: 'I dati sono in lavorazione.', requestedAt: new Date(now.getTime() - 1000 * 60 * 15).toISOString(), updatedAt: new Date(now.getTime() - 1000 * 60 * 5).toISOString(), amountGrossCents: 598, currency: 'EUR', nextAction: undefined,
      },
    ];
  }

  private demoInvoices(): CustomerDashboardInvoiceItem[] {
    return [
      { id: 'demo-invoice-001', orderId: 'demo-order-001', label: 'Documento fiscale in preparazione', taxableAmountCents: 2490, vatAmountCents: 548, totalAmountCents: 3038, currency: 'EUR', status: 'preparing', nextActionLabel: 'In preparazione' },
      { id: 'demo-invoice-002', orderId: 'demo-order-000', label: 'Fattura FA-2026-0001', taxableAmountCents: 1490, vatAmountCents: 328, totalAmountCents: 1818, currency: 'EUR', status: 'issued', issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), downloadUrl: '#', nextActionLabel: 'Scarica documento' },
    ];
  }

  private demoNotifications(): CustomerDashboardNotificationItem[] {
    return [
      { id: 'demo-notification-001', title: 'Report pronto', body: 'Il report ACME Italia S.p.A. è disponibile nella tua area cliente.', tone: 'success', href: '/reports/demo-report-ready', status: 'unread', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
      { id: 'demo-notification-002', title: 'Controllo interno in corso', body: 'Una verifica KYB richiede un controllo qualità prima della pubblicazione.', tone: 'warning', href: '/dashboard/verifiche/demo-check-review', status: 'read', createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
    ];
  }

  private demoTickets(): CustomerDashboardSupportTicketItem[] {
    return [
      { id: 'demo-ticket-001', subject: 'Chiarimento su una fattura', category: 'billing', status: 'in_review', priority: 'high', relatedType: 'invoice', relatedId: 'demo-invoice-001', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
    ];
  }
}
