export type ContactMessageSourceType = 'contact' | 'demo' | 'partner' | 'support' | 'guide_cta';
export type ContactMessageStatus = 'new' | 'triage' | 'linked_to_lead' | 'linked_to_ticket' | 'spam' | 'archived';
export type EmailDeliveryStatus = 'pending' | 'sent' | 'failed' | 'skipped';

export type LeadStatus = 'new' | 'qualified' | 'contacted' | 'demo_scheduled' | 'proposal_sent' | 'won' | 'lost' | 'disqualified';
export type LeadTemperature = 'cold' | 'warm' | 'hot';
export type OpportunityStage = 'qualified' | 'discovery' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type TicketStatus = 'new' | 'triage' | 'waiting_customer' | 'waiting_internal' | 'escalated' | 'resolved' | 'closed' | 'blocked';
export type TicketPriority = 'P0' | 'P1' | 'P2' | 'P3';
export type TicketTopic = 'general' | 'billing' | 'payment' | 'report' | 'provider' | 'refund' | 'partner_api' | 'legal';

export interface ContactMessageBlueprint {
  sourceType: ContactMessageSourceType;
  sourcePath: string;
  ctaId?: string;
  name: string;
  email: string;
  companyName?: string;
  phone?: string;
  message: string;
  consentSnapshot: Record<string, unknown>;
  status: ContactMessageStatus;
  emailDeliveryStatus: EmailDeliveryStatus;
  ipAddressHash?: string;
  userAgent?: string;
}

export interface SalesCrmSummary {
  newMessages: number;
  openLeads: number;
  openTickets: number;
  failedEmailDeliveries: number;
  nextActions: Array<{ id: string; label: string; href: string; priority: TicketPriority | 'sales' }>;
}

export interface ContactMessageResponse {
  id: string;
  sourceType: ContactMessageSourceType;
  sourcePath: string;
  name: string;
  email: string;
  companyName?: string;
  messagePreview: string;
  status: ContactMessageStatus;
  emailDeliveryStatus: EmailDeliveryStatus;
  createdAt: string;
}

export interface SalesLeadResponse {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  status: LeadStatus;
  temperature: LeadTemperature;
  nextAction?: string;
  createdAt: string;
}

export interface CrmTicketResponse {
  id: string;
  subject: string;
  topic: TicketTopic;
  status: TicketStatus;
  priority: TicketPriority;
  relatedType?: string;
  relatedId?: string;
  nextAction?: string;
  createdAt: string;
}

export const contactMessageRequiredFields = ['name', 'email', 'message', 'consentSnapshot'] as const;
