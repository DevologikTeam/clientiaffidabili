# M11-S — Authentication, Accounts & Team Management Development

Versione: 0.37.0  
Data: 2026-05-30  
Tipo sprint: Sviluppo

## Obiettivo

Implementare il primo runtime di autenticazione, account aziendale e team management per ClientiAffidabili.it, trasformando il blueprint M11-P in codice backend/frontend riutilizzabile.

## Ambito implementato

- Modulo NestJS `AuthModule`.
- Entità TypeORM per account, membership, inviti, sessioni, token reset, token verifica email e audit auth.
- Servizi password/token/sessioni.
- API register/login/logout/password reset/inviti/team/ruoli/me.
- Frontend login, registrazione, accettazione invito, account e team.
- Aggancio iniziale alla navigazione customer dashboard.
- QA statico dedicato.

## Guardrail mantenuti

- Account aziendale separato da identità utente.
- Sessioni con token hashato e modello cookie `HttpOnly + Secure + SameSite`.
- Token reset/invito/verifica salvati solo come `tokenHash`.
- Reason obbligatoria per inviti e cambio ruoli.
- Almeno un owner attivo obbligatorio.
- MFA admin resta blocker pre go-live.
- Object-level authorization resta requisito obbligatorio per ordini/report/fatture/subscription.

## Fuori ambito intenzionale

- Invio email reale.
- MFA reale.
- Provider OAuth/social login.
- Build reale con dipendenze installate.
- Test browser E2E reali.

## Esito

Sprint completato come runtime MVP/scaffold sviluppabile. Produzione ancora non pronta senza build reale, email provider, rate limit, MFA admin e test cross-account.
