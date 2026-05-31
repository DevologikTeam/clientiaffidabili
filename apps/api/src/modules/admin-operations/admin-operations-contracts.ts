import type {
  AdminAllowedAction,
  AdminPermission,
  AdminReasonCategory,
  AdminRole,
  AdminWorkItemListItem,
} from './admin-operations.types';

export const ADMIN_ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  support_agent: ['admin.queue.read', 'admin.order.read', 'admin.support.reply', 'admin.audit.read'],
  operations_agent: [
    'admin.queue.read',
    'admin.order.read',
    'admin.provider.read',
    'admin.provider.retry.safe',
    'admin.audit.read',
  ],
  billing_agent: [
    'admin.queue.read',
    'admin.order.read',
    'admin.billing.read',
    'admin.billing.refund.request',
    'admin.audit.read',
  ],
  compliance_reviewer: [
    'admin.queue.read',
    'admin.order.read',
    'admin.provider.read',
    'admin.provider.retry.safe',
    'admin.report.review',
    'admin.report.publish',
    'admin.report.block',
    'admin.audit.read',
  ],
  analyst: ['admin.queue.read', 'admin.order.read', 'admin.report.review', 'admin.audit.read'],
  super_admin: [
    'admin.queue.read',
    'admin.order.read',
    'admin.billing.read',
    'admin.billing.refund.request',
    'admin.billing.refund.approve',
    'admin.provider.read',
    'admin.provider.retry.safe',
    'admin.provider.raw.request_access',
    'admin.report.review',
    'admin.report.publish',
    'admin.report.block',
    'admin.support.reply',
    'admin.audit.read',
    'admin.audit.full_read',
    'admin.override.execute',
  ],
};

export const ADMIN_ACTION_CATALOG: AdminAllowedAction[] = [
  {
    code: 'assign_item',
    label: 'Assegna item',
    risk: 'safe',
    requiredPermission: 'admin.queue.read',
    requiresReason: false,
    requiresIdempotency: false,
    safeExplanation: 'Assegna il lavoro a un operatore autorizzato.',
  },
  {
    code: 'safe_provider_retry',
    label: 'Valuta retry sicuro',
    risk: 'reason_required',
    requiredPermission: 'admin.provider.retry.safe',
    requiresReason: true,
    requiresIdempotency: true,
    safeExplanation: 'Ripete una richiesta provider solo se classificata come idempotente o senza doppio costo.',
  },
  {
    code: 'publish_report',
    label: 'Pubblica report al cliente',
    risk: 'reason_required',
    requiredPermission: 'admin.report.publish',
    requiresReason: true,
    requiresIdempotency: true,
    safeExplanation: 'Rende visibile il report al cliente autorizzato dopo review.',
  },
  {
    code: 'block_report',
    label: 'Blocca report',
    risk: 'reason_required',
    requiredPermission: 'admin.report.block',
    requiresReason: true,
    requiresIdempotency: false,
    safeExplanation: 'Impedisce la pubblicazione del report e registra il motivo.',
  },
  {
    code: 'request_refund',
    label: 'Proponi rimborso',
    risk: 'reason_required',
    requiredPermission: 'admin.billing.refund.request',
    requiresReason: true,
    requiresIdempotency: true,
    safeExplanation: 'Apre una richiesta di rimborso da approvare.',
  },
  {
    code: 'approve_refund',
    label: 'Approva rimborso',
    risk: 'reason_required',
    requiredPermission: 'admin.billing.refund.approve',
    requiresReason: true,
    requiresIdempotency: true,
    safeExplanation: 'Approva un rimborso manuale dopo verifica costi provider e stato report.',
  },
];

export type AdminActionRequestBody = {
  reason?: string;
  reasonCategory?: AdminReasonCategory;
  idempotencyKey?: string;
  confirmGuardrail?: boolean;
};

export type AdminOperationsSummaryContract = {
  criticalCount: number;
  blockedRevenueCount: number;
  reviewCount: number;
  billingCount: number;
  openSupportCount: number;
  slaBreachedCount: number;
  updatedAt: string;
};

export type AdminWorkItemsResponseContract = {
  items: AdminWorkItemListItem[];
  total: number;
  filtersApplied: Record<string, string | undefined>;
};

export const ADMIN_OPERATION_ERROR_CODES = [
  'ADMIN_PERMISSION_DENIED',
  'ADMIN_REASON_REQUIRED',
  'ADMIN_GUARDRAIL_BLOCKED',
  'ADMIN_INVALID_STATE',
  'ADMIN_IDEMPOTENCY_REQUIRED',
  'ADMIN_SENSITIVE_DATA_REDACTED',
] as const;
