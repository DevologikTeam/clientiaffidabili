export type CustomerAccountRole = 'owner' | 'admin' | 'analyst' | 'billing' | 'viewer';

export const authExperienceRoutes = [
  { path: '/login', label: 'Accedi', purpose: 'Accesso area riservata' },
  { path: '/registrati', label: 'Crea area riservata', purpose: 'Creazione account aziendale' },
  { path: '/password-dimenticata', label: 'Recupera accesso', purpose: 'Richiesta link sicurezza' },
  { path: '/reset-password', label: 'Imposta nuova password', purpose: 'Reset sicuro' },
  { path: '/inviti/[token]', label: 'Accetta invito', purpose: 'Ingresso team aziendale' },
  { path: '/dashboard/account', label: 'Account azienda', purpose: 'Dati e stato account' },
  { path: '/dashboard/team', label: 'Team', purpose: 'Membri e ruoli' },
  { path: '/dashboard/sicurezza', label: 'Sicurezza', purpose: 'Password, sessioni, MFA futura' },
] as const;

export const customerRoleLabels: Record<CustomerAccountRole, { label: string; description: string }> = {
  owner: {
    label: 'Titolare account',
    description: 'Gestisce account, team, verifiche, report, fatture e abbonamento.',
  },
  admin: {
    label: 'Amministratore',
    description: 'Coordina verifiche, report, team operativo e supporto.',
  },
  analyst: {
    label: 'Analista',
    description: 'Acquista e consulta verifiche e report.',
  },
  billing: {
    label: 'Amministrazione',
    description: 'Gestisce fatture, profilo fiscale, abbonamenti e rimborsi.',
  },
  viewer: {
    label: 'Lettore',
    description: 'Consulta le informazioni autorizzate senza modificare dati.',
  },
};

export const authUiCopy = {
  loginHeadline: 'Accedi alla tua area riservata',
  loginSubcopy: 'Consulta verifiche, report, fatture e stato delle richieste in modo protetto.',
  registerHeadline: "Crea l'area riservata della tua azienda",
  registerSubcopy: 'Ti servirà per acquistare verifiche, ricevere report e gestire documenti fiscali.',
  forgotPasswordNeutral: "Se l'email è associata a un account, riceverai un link di sicurezza.",
  permissionDenied: "Non hai i permessi per questa azione. Puoi chiedere supporto a un amministratore dell'account.",
} as const;
