export type ContactInboxStatus = 'new' | 'triage' | 'linked_to_lead' | 'linked_to_ticket' | 'spam' | 'archived';
export type LeadStatus = 'new' | 'qualified' | 'contacted' | 'demo_scheduled' | 'proposal_sent' | 'won' | 'lost' | 'disqualified';
export type TicketStatus = 'new' | 'triage' | 'waiting_customer' | 'waiting_internal' | 'escalated' | 'resolved' | 'closed' | 'blocked';

export const salesCrmRuntime = {
  summary: {
    newMessages: 7,
    openLeads: 4,
    openTickets: 3,
    failedEmailDeliveries: 1,
  },
  contactSources: [
    { label: 'Contatti sito', value: 4 },
    { label: 'Guide SEO/GEO', value: 2 },
    { label: 'Partner/API', value: 1 },
  ],
  inbox: [
    {
      id: 'msg_demo_001',
      name: 'Mario Rossi',
      email: 'mario.rossi@example.com',
      companyName: 'Rossi Impianti SRL',
      sourcePath: '/guide/cliente-non-paga-come-prevenire',
      messagePreview: 'Vorrei capire quale report usare prima di concedere pagamento a 60 giorni.',
      status: 'new' as ContactInboxStatus,
      emailDeliveryStatus: 'sent',
      createdAt: '2026-05-30T09:15:00.000Z',
    },
    {
      id: 'msg_demo_002',
      name: 'Laura Bianchi',
      email: 'laura.bianchi@example.com',
      companyName: 'Bianchi Retail',
      sourcePath: '/contatti',
      messagePreview: 'Richiedo una demo per verifiche fornitori e gestione abbonamento.',
      status: 'triage' as ContactInboxStatus,
      emailDeliveryStatus: 'skipped',
      createdAt: '2026-05-30T10:30:00.000Z',
    },
  ],
  leads: [
    { id: 'lead_001', name: 'Rossi Impianti SRL', status: 'qualified' as LeadStatus, temperature: 'hot', nextAction: 'Inviare proposta piano Pro.' },
    { id: 'lead_002', name: 'Bianchi Retail', status: 'contacted' as LeadStatus, temperature: 'warm', nextAction: 'Fissare demo 30 minuti.' },
  ],
  tickets: [
    { id: 'ticket_001', subject: 'Richiesta chiarimento rimborso', topic: 'refund', status: 'triage' as TicketStatus, priority: 'P1', nextAction: 'Verificare se provider e report sono gia stati consumati.' },
    { id: 'ticket_002', subject: 'Errore email contatto', topic: 'general', status: 'waiting_internal' as TicketStatus, priority: 'P2', nextAction: 'Controllare configurazione email transazionale.' },
  ],
  guardrails: [
    'Il messaggio viene salvato in admin prima del tentativo email.',
    'I contenuti report e raw payload provider non entrano nel CRM commerciale.',
    'Gli errori email generano elementi operativi analizzabili.',
    'IP e user agent sono gestiti come dato tecnico/audit con minimizzazione.',
  ],
} as const;
