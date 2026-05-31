export const partnerPortalAnalysis = {
  sprint: 'M12-A',
  version: '0.38.0',
  publicPositioning: 'Programma partner controllato per integrare e rivendere verifiche affidabilità aziendale.',
  primaryCta: 'Richiedi accesso partner',
  secondaryCta: 'Guarda la sandbox API',
  dashboardSections: [
    'Panoramica partner',
    'Crediti e consumi',
    'API key',
    'Documentazione',
    'Webhook',
    'Log richieste',
    'Richiesta produzione',
    'Supporto tecnico',
  ],
  customerFacingStates: [
    'Accesso richiesto',
    'Sandbox attiva',
    'Produzione in revisione',
    'Produzione attiva',
    'Crediti quasi esauriti',
    'Chiave sospesa',
  ],
  copyRules: [
    'Non promettere API illimitate',
    'Spiegare quando una chiamata genera costo',
    'Usare parole come ambiente di test e produzione separata',
    'Mostrare limiti e prossima azione',
    'Non esporre dettagli provider o payload grezzi',
  ],
} as const;

export type PartnerPortalState = (typeof partnerPortalAnalysis.customerFacingStates)[number];
