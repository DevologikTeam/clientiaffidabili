export type LeadSourceType =
  | 'public_contact_form'
  | 'demo_request'
  | 'seo_guide_cta'
  | 'pricing_cta'
  | 'service_detail_cta'
  | 'partner_api_request'
  | 'customer_support';

export type LeadStatus =
  | 'new'
  | 'qualified'
  | 'contacted'
  | 'demo_scheduled'
  | 'proposal_sent'
  | 'won'
  | 'lost'
  | 'disqualified';

export type OpportunityStage =
  | 'discovery'
  | 'qualified'
  | 'demo'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

export type SupportTicketCategory =
  | 'account_access'
  | 'checkout_payment'
  | 'invoice_refund'
  | 'report'
  | 'provider_api'
  | 'partner_api'
  | 'compliance';

export const salesCrmAnalysis = {
  sprint: 'M15-A',
  version: '0.51.0',
  entities: ['Lead', 'Contact', 'SalesOpportunity', 'SupportTicket', 'CrmActivity'],
  leadStatuses: ['new', 'qualified', 'contacted', 'demo_scheduled', 'proposal_sent', 'won', 'lost', 'disqualified'] satisfies LeadStatus[],
  opportunityStages: ['discovery', 'qualified', 'demo', 'proposal', 'negotiation', 'won', 'lost'] satisfies OpportunityStage[],
  ticketCategories: ['account_access', 'checkout_payment', 'invoice_refund', 'report', 'provider_api', 'partner_api', 'compliance'] satisfies SupportTicketCategory[],
  requiredGuards: [
    'consent_snapshot',
    'rate_limit',
    'honeypot',
    'rbac',
    'object_authorization',
    'audit',
    'redaction',
  ],
};
