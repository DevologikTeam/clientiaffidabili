export type SecuritySeverity = 'p0' | 'p1' | 'p2' | 'p3';

export type SecurityControlStatus = 'planned' | 'implemented' | 'verified' | 'blocked';

export type CustomerRole =
  | 'customer_owner'
  | 'customer_admin'
  | 'customer_analyst'
  | 'customer_billing'
  | 'customer_viewer';

export type AdminRole =
  | 'support'
  | 'operations'
  | 'billing'
  | 'compliance'
  | 'analyst'
  | 'super_admin';

export type ProtectedResourceType =
  | 'order'
  | 'report'
  | 'invoice'
  | 'payment'
  | 'refund'
  | 'subscription'
  | 'provider_request'
  | 'support_ticket'
  | 'admin_work_item';

export interface SecurityControlBlueprint {
  code: string;
  title: string;
  severity: SecuritySeverity;
  status: SecurityControlStatus;
  owner: 'api' | 'web' | 'devops' | 'operations' | 'legal' | 'security';
  implementationTarget: string;
  qaEvidence: string[];
  blocksProduction: boolean;
}

export interface ObjectAuthorizationPolicy {
  resourceType: ProtectedResourceType;
  requiresAuth: boolean;
  customerRoles: CustomerRole[];
  adminRoles: AdminRole[];
  ownershipField: 'accountId' | 'customerId' | 'organizationId' | 'parentResource';
  auditOnRead: boolean;
  auditOnWrite: boolean;
  rawPayloadAllowed: false;
}

export interface DataRetentionPolicy {
  dataCategory: string;
  sensitivity: 'low' | 'medium' | 'high';
  retentionDays: number | 'fiscal_requirement' | 'legal_review_required';
  deletionMode: 'delete' | 'anonymize' | 'archive_restricted';
  customerVisible: boolean;
}

export interface ProductionGateCheck {
  code: string;
  title: string;
  severity: SecuritySeverity;
  commandOrEvidence: string;
  passCriteria: string;
  blocksProduction: boolean;
}
