export const salesCrmDesign = {
  adminRoutes: [
    '/admin/crm',
    '/admin/crm/inbox',
    '/admin/crm/leads',
    '/admin/crm/opportunities',
    '/admin/crm/tickets',
  ],
  publicForms: ['contact', 'demo-request', 'partner-request'],
  contactInboxRule: 'save-first-email-second',
  leadPipeline: ['new', 'qualified', 'contacted', 'demo_scheduled', 'proposal_sent', 'won', 'lost', 'disqualified'],
  ticketPriorities: ['P0', 'P1', 'P2', 'P3'],
  guardrails: [
    'No raw provider payload in CRM.',
    'No report contents in sales notes.',
    'Contact messages are persisted before email delivery.',
    'Email failures create operational error events.',
    'Sensitive admin actions require reason.',
  ],
} as const;
