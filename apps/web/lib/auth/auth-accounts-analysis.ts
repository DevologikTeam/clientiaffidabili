export const authAccountsAnalysisCards = [
  {
    title: 'Account aziendale',
    description: 'Ogni ordine, report, fattura e abbonamento appartiene a un account aziendale, non solo a un utente personale.',
    status: 'decisione MVP',
  },
  {
    title: 'Team e ruoli',
    description: 'Owner, admin, analyst, billing e viewer permettono di separare report, fatture e gestione team.',
    status: 'da progettare in M11-P',
  },
  {
    title: 'Sessioni sicure',
    description: 'Cookie HTTP-only, rotazione sessione, revoke e re-auth per azioni sensibili.',
    status: 'guardrail sicurezza',
  },
  {
    title: 'Admin separato',
    description: 'I ruoli cliente non devono mai sbloccare funzioni admin interne.',
    status: 'blocco produzione',
  },
];

export const authMvpRoutes = [
  '/login',
  '/registrati',
  '/recupera-password',
  '/reset-password',
  '/verifica-email',
  '/inviti/[token]',
  '/dashboard/account',
  '/dashboard/team',
];

export const authSafeCopy = {
  loginError: 'Email o password non corretti.',
  passwordResetRequested: 'Se l\'email è presente, riceverai le istruzioni per recuperare l\'accesso.',
  invitationExpired: 'Questo invito non è più valido. Chiedi a un amministratore di inviarne uno nuovo.',
  accessDenied: 'Non hai i permessi per completare questa azione.',
};
