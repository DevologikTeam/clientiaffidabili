# M11-A Source Notes — Authentication Security

## Fonti principali

- OWASP Authentication Cheat Sheet: usata per password policy moderna, re-authentication, errori sicuri, protezione contro automated attacks, MFA, logging e monitoring.
- OWASP Session Management Cheat Sheet: usata per principi su cookie, session ID, scadenza, rotazione e invalidazione.
- NIST SP 800-63B: usato come baseline prudente per autenticazione, authenticator management, password length, blocklist e lifecycle.

## Applicazione a ClientiAffidabili.it

Le raccomandazioni non vengono copiate come regole astratte: diventano guardrail prodotto.

- Report e fatture richiedono object-level authorization.
- Admin richiede MFA/step-up prima del go-live.
- Sessioni e token devono essere revocabili.
- Password e reset token non devono mai apparire nei log.
- Email e reset flow non devono permettere enumeration.
- Inviti team devono essere monouso, scaduti e auditabili.

## Nota

La documentazione legale e di sicurezza deve essere rivista prima del go-live con test reali e decisione finale su auth provider/password hashing/MFA.
