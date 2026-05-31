export type AdminRole =
  | 'support_agent'
  | 'operations_agent'
  | 'billing_agent'
  | 'compliance_reviewer'
  | 'analyst'
  | 'super_admin';

export type AdminWorkItemType =
  | 'payment_pending'
  | 'paid_not_requested'
  | 'provider_failed'
  | 'provider_manual_review'
  | 'report_ready_for_review'
  | 'report_blocked'
  | 'invoice_pending'
  | 'refund_requested'
  | 'support_open'
  | 'incident_anomaly';

export type AdminWorkItemPriority = 'p0_critical' | 'p1_high' | 'p2_medium' | 'p3_low';
export type AdminWorkItemStatus = 'open' | 'in_progress' | 'waiting' | 'blocked' | 'resolved';

export type AdminActionRisk = 'safe' | 'reason_required' | 'blocked';

export type AdminReasonCategory =
  | 'customer_request'
  | 'provider_error'
  | 'billing_reconciliation'
  | 'compliance_review'
  | 'data_quality_issue'
  | 'manual_override'
  | 'security_incident'
  | 'other';

export type AdminPermission =
  | 'admin.queue.read'
  | 'admin.order.read'
  | 'admin.billing.read'
  | 'admin.billing.refund.request'
  | 'admin.billing.refund.approve'
  | 'admin.provider.read'
  | 'admin.provider.retry.safe'
  | 'admin.provider.raw.request_access'
  | 'admin.report.review'
  | 'admin.report.publish'
  | 'admin.report.block'
  | 'admin.support.reply'
  | 'admin.audit.read'
  | 'admin.audit.full_read'
  | 'admin.override.execute';

export type AdminAllowedAction = {
  code: string;
  label: string;
  risk: AdminActionRisk;
  requiredPermission: AdminPermission;
  requiresReason: boolean;
  requiresIdempotency: boolean;
  safeExplanation: string;
};

export type AdminBlockedAction = {
  code: string;
  label: string;
  blockedReason: string;
  requiredPermission?: AdminPermission;
};

export type AdminWorkItemListItem = {
  id: string;
  type: AdminWorkItemType;
  priority: AdminWorkItemPriority;
  status: AdminWorkItemStatus;
  orderCode?: string;
  serviceLabel: string;
  reason: string;
  impact: string;
  nextAction: string;
  ownerRole: AdminRole;
  assignedToLabel?: string;
  dueAt?: string;
  canOpen: boolean;
};

export type AdminAuditTimelineItem = {
  id: string;
  createdAt: string;
  actorLabel: string;
  actorRole: AdminRole;
  action: string;
  severity: 'info' | 'warning' | 'high' | 'critical';
  reason?: string;
  safeDescription: string;
};

export type AdminWorkItemDetail = {
  item: AdminWorkItemListItem;
  snapshots: Array<{
    kind: 'order' | 'payment' | 'provider' | 'report' | 'invoice' | 'support';
    title: string;
    status: string;
    summary: string;
    safeHref?: string;
  }>;
  allowedActions: AdminAllowedAction[];
  blockedActions: AdminBlockedAction[];
  auditTimeline: AdminAuditTimelineItem[];
};

export const ADMIN_OPERATIONS_DESIGN_VERSION = 'M8-P-0.24.0';
