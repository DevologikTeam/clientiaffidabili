export const adminOperationsNavigationAnalysis = [
  {
    href: '/admin/operations',
    label: 'Operations',
    purpose: 'Cabina di regia interna queue-first',
  },
  {
    href: '/admin/orders',
    label: 'Ordini',
    purpose: 'Ordini, stati operativi e prossime azioni',
  },
  {
    href: '/admin/billing',
    label: 'Pagamenti e fatture',
    purpose: 'Ledger, fatture, rimborsi e dispute',
  },
  {
    href: '/admin/provider',
    label: 'Provider',
    purpose: 'Richieste provider, retry sicuri e manual review',
  },
  {
    href: '/admin/reports',
    label: 'Report',
    purpose: 'Revisione, blocco e pubblicazione report',
  },
  {
    href: '/admin/support',
    label: 'Supporto',
    purpose: 'Ticket collegati a ordini, report e fatture',
  },
  {
    href: '/admin/audit',
    label: 'Audit',
    purpose: 'Eventi critici e tracciabilità interna',
  },
] as const;

export const adminOperationsUiRules = [
  'Mostrare sempre stato, motivo, impatto e prossima azione.',
  'Nascondere dettagli sensibili nelle liste aggregate.',
  'Evitare CTA generiche come Gestisci quando non spiegano l azione.',
  'Disabilitare azioni non implementate con spiegazione chiara.',
  'Richiedere motivazione per override, refund e pubblicazione report bloccati.',
  'Non mostrare dati tecnici al cliente; l admin può vederli solo se utili e autorizzati.',
] as const;

export const adminOperationsReadiness = {
  nextSprint: 'M8-P Admin Operations Design',
  designNeeds: [
    'Operations home queue-first',
    'Work item list and detail',
    'Admin action panel',
    'Audit timeline component',
    'RBAC visibility matrix',
    'Support and escalation flow',
  ],
};
