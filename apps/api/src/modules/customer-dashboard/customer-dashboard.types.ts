export type CustomerFacingCheckStatus =
  | 'payment_received'
  | 'processing'
  | 'internal_review'
  | 'report_ready'
  | 'action_required'
  | 'support_required'
  | 'refunded'
  | 'archived';

export type CustomerDashboardSummary = {
  readyReports: number;
  pendingChecks: number;
  actionRequired: number;
  unreadNotifications: number;
  nextBestAction?: CustomerNextBestAction;
};

export type CustomerNextBestAction = {
  type:
    | 'open_report'
    | 'complete_request_data'
    | 'download_invoice'
    | 'complete_billing_profile'
    | 'start_new_check'
    | 'contact_support';
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

export type CustomerCheckListItem = {
  id: string;
  subjectName: string;
  serviceName: string;
  status: CustomerFacingCheckStatus;
  customerStatusLabel: string;
  requestedAt: string;
  reportId?: string;
  orderId: string;
};

export type CustomerCheckTimelineStep = {
  key: string;
  label: string;
  description: string;
  completed: boolean;
  current?: boolean;
  occurredAt?: string;
};

export type CustomerInvoiceListItem = {
  id: string;
  orderId: string;
  label: string;
  taxableAmountCents: number;
  vatAmountCents: number;
  totalAmountCents: number;
  status: 'preparing' | 'issued' | 'sent' | 'void';
  issuedAt?: string;
  downloadUrl?: string;
};

export const CUSTOMER_DASHBOARD_TECHNICAL_TERMS_FORBIDDEN = [
  'raw payload',
  'provider retry',
  'webhook',
  'idempotency',
  'vault',
  'internal queue',
  'stack trace',
];
