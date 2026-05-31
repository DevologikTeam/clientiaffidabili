import { ContactMessageSourceType, LeadStatus, TicketPriority, TicketStatus } from './sales-crm.types';

export const contactMessageSources: ContactMessageSourceType[] = ['contact', 'demo', 'partner', 'support', 'guide_cta'];
export const leadStatuses: LeadStatus[] = ['new', 'qualified', 'contacted', 'demo_scheduled', 'proposal_sent', 'won', 'lost', 'disqualified'];
export const ticketStatuses: TicketStatus[] = ['new', 'triage', 'waiting_customer', 'waiting_internal', 'escalated', 'resolved', 'closed', 'blocked'];
export const ticketPriorities: TicketPriority[] = ['P0', 'P1', 'P2', 'P3'];

export const salesCrmDesignRegistry = {
  persistBeforeEmail: true,
  createOperationalErrorOnEmailFailure: true,
  forbiddenDataInCrm: ['rawProviderPayload', 'cardData', 'fullReportContent', 'secrets'],
  adminRoutes: ['/admin/crm', '/admin/crm/inbox', '/admin/crm/leads', '/admin/crm/tickets'],
} as const;
