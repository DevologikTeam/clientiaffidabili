# Auth entities implementation

Entita introdotte:

- `Account`: account aziendale cliente.
- `AccountMembership`: relazione utente-account con ruolo customer.
- `AccountInvitation`: invito team con token hashato, scadenza e stato.
- `AuthSession`: sessione opaca hashata.
- `PasswordResetToken`: token reset monouso hashato.
- `EmailVerificationToken`: token verifica email hashato.
- `AuthAuditEvent`: audit append-only per eventi auth/account/team.

## Stati importanti

- Membership: invited, active, disabled, transferred.
- Invitation: pending, accepted, expired, revoked.
- Session: active, revoked, expired.

## Regola owner

Non e' possibile degradare l'ultimo owner attivo. Il trasferimento ownership dovra' diventare flusso dedicato con step-up e audit.
