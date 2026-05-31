export type SalesCrmSprint = 'M15-A';

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

export type SupportTicketStatus =
  | 'new'
  | 'triage'
  | 'waiting_customer'
  | 'waiting_internal'
  | 'escalated'
  | 'resolved'
  | 'closed'
  | 'blocked';

export type SalesCrmGuardrail = {
  code: string;
  label: string;
  reason: string;
};

export const salesCrmAnalysis = {
  sprint: 'M15-A' as SalesCrmSprint,
  version: '0.51.0',
  productDecision: 'Build a lightweight internal CRM and support operations console before external CRM integrations.',
  leadSources: [
    'public_contact_form',
    'demo_request',
    'seo_guide_cta',
    'pricing_cta',
    'service_detail_cta',
    'partner_api_request',
    'customer_support',
  ] satisfies LeadSourceType[],
  leadStatuses: [
    'new',
    'qualified',
    'contacted',
    'demo_scheduled',
    'proposal_sent',
    'won',
    'lost',
    'disqualified',
  ] satisfies LeadStatus[],
  supportTicketStatuses: [
    'new',
    'triage',
    'waiting_customer',
    'waiting_internal',
    'escalated',
    'resolved',
    'closed',
    'blocked',
  ] satisfies SupportTicketStatus[],
  guardrails: [
    {
      code: 'NO_REPORT_DATA_IN_CRM',
      label: 'No report/provider raw data in CRM',
      reason: 'Sales and support views must not expose raw provider payloads or sensitive report internals.',
    },
    {
      code: 'CONSENT_SNAPSHOT_REQUIRED',
      label: 'Consent snapshot required',
      reason: 'Every public lead form must store privacy/legal context and source.',
    },
    {
      code: 'ANTI_ABUSE_REQUIRED',
      label: 'Anti-abuse controls required',
      reason: 'Forms need honeypot/rate limit/manual review before launch.',
    },
    {
      code: 'NO_AUTOMATIC_DISCOUNTS',
      label: 'No automatic discounting',
      reason: 'Custom offers and discounts need margin guard and admin reason.',
    },
  ] satisfies SalesCrmGuardrail[],
  nextSprint: 'M15-P Sales CRM, Lead Management & Support Operations Design',
};
