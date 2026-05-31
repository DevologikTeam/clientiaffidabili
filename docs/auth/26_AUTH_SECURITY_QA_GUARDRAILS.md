# Auth security QA guardrails

## Obbligatori prima del go-live

- Build reale backend/frontend.
- Password hashing validato in ambiente reale.
- Rate limit su login, reset, inviti e accept invitation.
- Cookie reali `HttpOnly`, `Secure`, `SameSite`.
- MFA obbligatoria per admin/super admin.
- Test cross-account su report, fatture, ordini, subscription e support ticket.
- Revoca sessioni dopo reset password.
- Secret scan pulito.
- Audit auth consultabile da admin autorizzato.

## Casi QA minimi

1. Registrazione account crea user, account, membership owner e sessione.
2. Login genera sessione opaca hashata.
3. Reset password non rivela email inesistenti.
4. Reset password revoca sessioni attive.
5. Invito richiede reason.
6. Cambio ruolo richiede permesso e reason.
7. Ultimo owner non viene degradato.
8. Viewer non accede a billing management.
