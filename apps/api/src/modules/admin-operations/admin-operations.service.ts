import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ADMIN_ACTION_CATALOG,
  ADMIN_OPERATION_ERROR_CODES,
  ADMIN_ROLE_PERMISSIONS,
  type AdminActionRequestBody,
  type AdminOperationsSummaryContract,
  type AdminWorkItemsResponseContract,
} from './admin-operations-contracts';
import type {
  AdminAllowedAction,
  AdminAuditTimelineItem,
  AdminBlockedAction,
  AdminRole,
  AdminWorkItemDetail,
  AdminWorkItemListItem,
  AdminWorkItemPriority,
  AdminWorkItemStatus,
  AdminWorkItemType,
} from './admin-operations.types';
import { AdminActionAudit } from './entities/admin-action-audit.entity';
import { AdminWorkItem } from './entities/admin-work-item.entity';

const DEFAULT_ADMIN_ROLE: AdminRole = 'super_admin';
const DEFAULT_ADMIN_USER = 'system-admin';

@Injectable()
export class AdminOperationsService {
  constructor(
    @InjectRepository(AdminWorkItem) private readonly workItemRepo: Repository<AdminWorkItem>,
    @InjectRepository(AdminActionAudit) private readonly audits: Repository<AdminActionAudit>,
  ) {}

  async summary(): Promise<AdminOperationsSummaryContract> {
    const items = await this.listWorkItemsInternal();
    return {
      criticalCount: items.filter((item) => item.priority === 'p0_critical').length,
      blockedRevenueCount: items.filter((item) => ['paid_not_requested', 'provider_failed', 'report_blocked'].includes(item.type)).length,
      reviewCount: items.filter((item) => ['provider_manual_review', 'report_ready_for_review'].includes(item.type)).length,
      billingCount: items.filter((item) => ['invoice_pending', 'refund_requested', 'payment_pending'].includes(item.type)).length,
      openSupportCount: items.filter((item) => item.type === 'support_open').length,
      slaBreachedCount: items.filter((item) => item.dueAt && new Date(item.dueAt).getTime() < Date.now()).length,
      updatedAt: new Date().toISOString(),
    };
  }

  async workItems(filters: { status?: AdminWorkItemStatus; type?: AdminWorkItemType; priority?: AdminWorkItemPriority } = {}): Promise<AdminWorkItemsResponseContract> {
    const all = await this.listWorkItemsInternal();
    const filtered = all.filter((item) => {
      if (filters.status && item.status !== filters.status) return false;
      if (filters.type && item.type !== filters.type) return false;
      if (filters.priority && item.priority !== filters.priority) return false;
      return true;
    });
    return { items: filtered, total: filtered.length, filtersApplied: filters };
  }

  async detail(id: string, actorRole: AdminRole = DEFAULT_ADMIN_ROLE): Promise<AdminWorkItemDetail> {
    const items = await this.listWorkItemsInternal();
    const item = items.find((row) => row.id === id) ?? items[0];
    if (!item) throw new NotFoundException('Work item non trovato.');
    const entity = await this.workItemRepo.findOne({ where: { id: item.id } });
    const audits = await this.auditTimeline(item.id);
    return {
      item,
      snapshots: entity?.snapshots?.length ? entity.snapshots as AdminWorkItemDetail['snapshots'] : this.demoSnapshotsFor(item),
      allowedActions: this.allowedActionsFor(item, actorRole),
      blockedActions: this.blockedActionsFor(item, actorRole),
      auditTimeline: audits.length ? audits : this.demoAuditFor(item),
    };
  }

  async executeAction(id: string, actionCode: string, body: AdminActionRequestBody & { actorUserId?: string; actorLabel?: string; actorRole?: AdminRole }) {
    const actorRole = body.actorRole ?? DEFAULT_ADMIN_ROLE;
    const action = ADMIN_ACTION_CATALOG.find((entry) => entry.code === actionCode);
    if (!action) throw new NotFoundException(`Azione admin non trovata: ${actionCode}`);
    const permissions = ADMIN_ROLE_PERMISSIONS[actorRole] ?? [];
    if (!permissions.includes(action.requiredPermission)) {
      throw new ForbiddenException({ code: ADMIN_OPERATION_ERROR_CODES[0], message: 'Permesso insufficiente per questa azione.' });
    }
    if (action.requiresReason && (!body.reason || body.reason.trim().length < 8)) {
      throw new BadRequestException({ code: ADMIN_OPERATION_ERROR_CODES[1], message: 'Motivazione obbligatoria e significativa.' });
    }
    if (action.requiresIdempotency && !body.idempotencyKey) {
      throw new BadRequestException({ code: ADMIN_OPERATION_ERROR_CODES[4], message: 'Idempotency key obbligatoria per azioni ripetibili o sensibili.' });
    }
    if (action.risk === 'reason_required' && !body.confirmGuardrail) {
      throw new BadRequestException({ code: ADMIN_OPERATION_ERROR_CODES[2], message: 'Conferma guardrail obbligatoria.' });
    }

    const detail = await this.detail(id, actorRole);
    const updatedStatus = this.statusAfter(action.code, detail.item.status);
    await this.upsertWorkItemStatus(detail.item, updatedStatus);
    const audit = await this.audits.save(this.audits.create({
      workItemId: detail.item.id,
      actorUserId: body.actorUserId ?? DEFAULT_ADMIN_USER,
      actorLabel: body.actorLabel ?? 'Admin operativo',
      actorRole,
      actionCode,
      safeDescription: action.safeExplanation,
      reason: body.reason,
      reasonCategory: body.reasonCategory,
      idempotencyKey: body.idempotencyKey,
      severity: action.code.includes('refund') || action.code.includes('block') ? 'high' : 'warning',
      redactedContext: { itemType: detail.item.type, orderCode: detail.item.orderCode, rawPayload: 'redacted' },
    }));

    return {
      ok: true,
      actionCode,
      newStatus: updatedStatus,
      auditId: audit.id,
      nextAction: this.nextActionAfter(action.code),
    };
  }

  async auditTimeline(workItemId?: string): Promise<AdminAuditTimelineItem[]> {
    const rows = await this.audits.find({ where: workItemId ? { workItemId } : {}, order: { createdAt: 'DESC' }, take: 40 });
    return rows.map((row) => ({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      actorLabel: row.actorLabel,
      actorRole: row.actorRole,
      action: row.actionCode,
      severity: row.severity,
      reason: row.reason,
      safeDescription: row.safeDescription,
    }));
  }

  private async listWorkItemsInternal(): Promise<AdminWorkItemListItem[]> {
    const rows = await this.workItemRepo.find({ order: { createdAt: 'DESC' }, take: 100 });
    if (rows.length === 0) return this.demoWorkItems();
    return rows.map((row) => this.toListItem(row));
  }

  private toListItem(row: AdminWorkItem): AdminWorkItemListItem {
    return {
      id: row.id,
      type: row.type,
      priority: row.priority,
      status: row.status,
      orderCode: row.orderCode,
      serviceLabel: row.serviceLabel,
      reason: row.reason,
      impact: row.impact,
      nextAction: row.nextAction,
      ownerRole: row.ownerRole,
      assignedToLabel: row.assignedToLabel,
      dueAt: row.dueAt?.toISOString(),
      canOpen: true,
    };
  }

  private allowedActionsFor(item: AdminWorkItemListItem, role: AdminRole): AdminAllowedAction[] {
    const permissions = ADMIN_ROLE_PERMISSIONS[role] ?? [];
    return ADMIN_ACTION_CATALOG.filter((action) => permissions.includes(action.requiredPermission))
      .filter((action) => {
        if (action.code === 'safe_provider_retry') return item.type === 'provider_failed';
        if (action.code === 'publish_report' || action.code === 'block_report') return ['report_ready_for_review', 'report_blocked'].includes(item.type);
        if (action.code === 'request_refund' || action.code === 'approve_refund') return item.type === 'refund_requested';
        return action.code === 'assign_item';
      });
  }

  private blockedActionsFor(item: AdminWorkItemListItem, role: AdminRole): AdminBlockedAction[] {
    const permissions = ADMIN_ROLE_PERMISSIONS[role] ?? [];
    const blocked: AdminBlockedAction[] = [];
    if (item.type !== 'provider_failed') blocked.push({ code: 'safe_provider_retry', label: 'Retry provider', blockedReason: 'Disponibile solo per errori provider classificati retry-safe.' });
    if (!permissions.includes('admin.override.execute')) blocked.push({ code: 'force_override', label: 'Override manuale', blockedReason: 'Riservato al super admin con motivazione e audit completo.', requiredPermission: 'admin.override.execute' });
    blocked.push({ code: 'view_raw_payload', label: 'Vedi raw payload', blockedReason: 'Non disponibile in lista operativa. Serve richiesta esplicita e vault redatto.', requiredPermission: 'admin.provider.raw.request_access' });
    return blocked;
  }

  private async upsertWorkItemStatus(item: AdminWorkItemListItem, status: AdminWorkItemStatus) {
    const existing = await this.workItemRepo.findOne({ where: { id: item.id } });
    if (!existing) return;
    existing.status = status;
    existing.nextAction = this.nextActionForStatus(status, item.type);
    await this.workItemRepo.save(existing);
  }

  private statusAfter(actionCode: string, current: AdminWorkItemStatus): AdminWorkItemStatus {
    if (actionCode === 'assign_item') return current === 'open' ? 'in_progress' : current;
    if (['publish_report', 'approve_refund'].includes(actionCode)) return 'resolved';
    if (['block_report', 'request_refund'].includes(actionCode)) return 'waiting';
    if (actionCode === 'safe_provider_retry') return 'in_progress';
    return current;
  }

  private nextActionAfter(actionCode: string) {
    if (actionCode === 'publish_report') return 'Report pubblicato: monitora eventuali richieste cliente.';
    if (actionCode === 'safe_provider_retry') return 'Retry registrato: attendi esito provider o nuova review.';
    if (actionCode === 'approve_refund') return 'Rimborso approvato: riconcilia pagamento e fattura.';
    return 'Azione registrata: continua dalla coda operativa.';
  }

  private nextActionForStatus(status: AdminWorkItemStatus, type: AdminWorkItemType) {
    if (status === 'resolved') return 'Nessuna azione richiesta.';
    if (type === 'provider_failed') return 'Valuta retry sicuro o escalation manuale.';
    if (type === 'report_ready_for_review') return 'Revisiona evidenze, limiti e copy prima della pubblicazione.';
    if (type === 'refund_requested') return 'Verifica stato provider/report prima di approvare.';
    return 'Apri dettaglio e segui azione consigliata.';
  }

  private demoWorkItems(): AdminWorkItemListItem[] {
    return [
      {
        id: 'op_demo_provider_failed',
        type: 'provider_failed',
        priority: 'p1_high',
        status: 'open',
        orderCode: 'CA-2026-0008',
        serviceLabel: 'Check Affidabilità Pro',
        reason: 'Provider non disponibile dopo pagamento confermato.',
        impact: 'Il cliente non riceve il report nei tempi promessi e il costo non deve essere duplicato.',
        nextAction: 'Valuta retry sicuro con idempotency key o escalation manuale.',
        ownerRole: 'operations_agent',
        assignedToLabel: 'Operations',
        dueAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        canOpen: true,
      },
      {
        id: 'op_demo_report_review',
        type: 'report_ready_for_review',
        priority: 'p2_medium',
        status: 'in_progress',
        orderCode: 'CA-2026-0009',
        serviceLabel: 'KYB Compliance',
        reason: 'Il report contiene evidenze compliance-sensitive da validare.',
        impact: 'Il report non deve essere pubblicato senza revisione umana.',
        nextAction: 'Controlla fonti, limiti e linguaggio prima della pubblicazione.',
        ownerRole: 'compliance_reviewer',
        assignedToLabel: 'Compliance',
        dueAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        canOpen: true,
      },
      {
        id: 'op_demo_refund',
        type: 'refund_requested',
        priority: 'p1_high',
        status: 'waiting',
        orderCode: 'CA-2026-0010',
        serviceLabel: 'Verifica IBAN',
        reason: 'Cliente richiede rimborso prima della chiamata provider.',
        impact: 'Possibile rimborso a margine pieno se nessun costo provider è stato sostenuto.',
        nextAction: 'Verifica ledger costi e approva o respingi il rimborso.',
        ownerRole: 'billing_agent',
        assignedToLabel: 'Billing',
        dueAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        canOpen: true,
      },
      {
        id: 'op_demo_support',
        type: 'support_open',
        priority: 'p3_low',
        status: 'open',
        orderCode: 'CA-2026-0011',
        serviceLabel: 'Verifica azienda essenziale',
        reason: 'Richiesta cliente su lettura report.',
        impact: 'Serve risposta chiara senza interpretazioni legali o promesse assolute.',
        nextAction: 'Rispondi con spiegazione dei limiti e link al report.',
        ownerRole: 'support_agent',
        assignedToLabel: 'Supporto',
        canOpen: true,
      },
    ];
  }

  private demoSnapshotsFor(item: AdminWorkItemListItem): AdminWorkItemDetail['snapshots'] {
    return [
      { kind: 'order', title: 'Ordine', status: item.orderCode ?? 'demo', summary: 'Pagamento confermato prima di ogni chiamata provider.', safeHref: '/admin/billing' },
      { kind: 'provider', title: 'Provider', status: item.type === 'provider_failed' ? 'failed' : 'not_required', summary: 'Payload grezzo non esposto. Consultare solo evidenze normalizzate.', safeHref: '/admin/provider' },
      { kind: 'report', title: 'Report', status: item.type === 'report_ready_for_review' ? 'review_required' : 'not_ready', summary: 'Pubblicazione solo dopo reason e audit.', safeHref: '/admin/reports' },
    ];
  }

  private demoAuditFor(item: AdminWorkItemListItem): AdminAuditTimelineItem[] {
    return [
      {
        id: `${item.id}_audit_created`,
        createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        actorLabel: 'Sistema',
        actorRole: 'super_admin',
        action: 'work_item_created',
        severity: item.priority === 'p0_critical' ? 'critical' : 'info',
        safeDescription: 'Item creato da evento operativo con dati sensibili redatti.',
      },
    ];
  }
}
