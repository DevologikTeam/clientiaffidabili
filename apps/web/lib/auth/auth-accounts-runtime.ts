export type CustomerRole = 'owner' | 'admin' | 'analyst' | 'billing' | 'viewer';

export const authRuntimeSnapshot = {
  account: {
    id: 'acc_demo_001',
    legalName: 'Studio Demo Srl',
    status: 'active',
    plan: 'Starter',
    owner: 'Davide La Maestra',
  },
  session: {
    cookieMode: 'HttpOnly + Secure + SameSite=Lax',
    expiresIn: '14 giorni',
    stepUpRequiredFor: ['inviti team', 'cambio ruoli', 'rimborsi', 'API key', 'download massivo'],
  },
  members: [
    { id: 'm_01', name: 'Davide La Maestra', email: 'owner@clientiaffidabili.it', role: 'owner' as CustomerRole, status: 'Attivo', lastAccess: 'Oggi' },
    { id: 'm_02', name: 'Area amministrazione', email: 'billing@example.it', role: 'billing' as CustomerRole, status: 'Attivo', lastAccess: 'Ieri' },
    { id: 'm_03', name: 'Analista rischio', email: 'analyst@example.it', role: 'analyst' as CustomerRole, status: 'Invito da completare', lastAccess: 'Mai' },
  ],
  permissions: {
    owner: ['Tutto il perimetro account', 'Team', 'Billing', 'Report', 'Supporto'],
    admin: ['Verifiche', 'Report', 'Team senza owner', 'Supporto'],
    analyst: ['Creazione verifiche', 'Lettura report', 'Download report'],
    billing: ['Fatture', 'Abbonamenti', 'Rimborsi', 'Profilo fiscale'],
    viewer: ['Consultazione report e verifiche autorizzate'],
  },
  audit: [
    { event: 'member_invited', severity: 'info', label: 'Invito inviato con reason obbligatoria' },
    { event: 'member_role_changed', severity: 'critical', label: 'Cambio ruolo con audit e step-up' },
    { event: 'password_reset_completed', severity: 'critical', label: 'Reset password con revoca sessioni attive' },
  ],
} as const;

export const authFormsCopy = {
  loginTitle: 'Accedi alla tua area verifiche',
  loginSubtitle: 'Usa l’account aziendale per consultare report, fatture, abbonamenti e team autorizzati.',
  registerTitle: 'Crea l’account aziendale',
  registerSubtitle: 'Dopo la registrazione potrai acquistare verifiche, invitare il team e gestire documenti fiscali.',
  inviteTitle: 'Completa invito team',
};
