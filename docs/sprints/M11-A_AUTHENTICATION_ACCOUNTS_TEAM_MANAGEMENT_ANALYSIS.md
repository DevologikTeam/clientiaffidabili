# M11-A — Authentication, Accounts & Team Management Analysis

## Stato sprint

- Versione: `0.35.0`
- Tipo sprint: Analisi
- Modulo: `M11 Authentication, Accounts & Team Management`
- Stato: completato
- Output: analisi prodotto, security baseline, data model, rischi, readiness checklist per M11-P/M11-S.

## Obiettivo

Definire il perimetro di autenticazione e gestione account per ClientiAffidabili.it prima di progettare o sviluppare il modulo. L'area auth deve sostenere:

1. acquisto singolo da cliente non ancora registrato;
2. creazione account post-checkout;
3. login sicuro;
4. account aziendale con team;
5. ruoli e permessi coerenti con dashboard cliente, fatturazione, report, API e admin;
6. inviti utenti;
7. recupero accesso;
8. MFA futura;
9. audit e sicurezza contro credential stuffing, IDOR/BOLA e session hijacking.

## Decisione MVP

Per MVP si adotta un modello **account aziendale + utenti**, non un semplice account personale. Ogni ordine, report, fattura, wallet, abbonamento e ticket deve appartenere a un `Account`/`Organization`, con utenti associati tramite membership.

Il login iniziale resta email/password con password hashing robusto e sessione HTTP-only; OIDC/Google login resta post-MVP. La MFA non è obbligatoria nel primo rilascio customer, ma è obbligatoria o feature-gated per ruoli admin/super admin prima del go-live pubblico.

## Decisioni principali

| Area | Decisione |
|---|---|
| Identità | `User` separato da `Account/Organization` |
| Team | `AccountMembership` come fonte di ruoli customer |
| Admin | Ruoli admin separati dai ruoli customer |
| Checkout | checkout guest consentito, ma account richiesto per accedere a report/storico |
| Sessioni | cookie HTTP-only, Secure, SameSite, rotazione dopo login/reauth |
| Password | policy moderna: lunghezza, breach/common-password check, nessuna rotazione arbitraria |
| Recupero password | token monouso, scadenza breve, no user enumeration |
| Inviti | token monouso, ruolo predefinito, scadenza, revoca, audit |
| MFA | roadmap: TOTP/WebAuthn; obbligatoria per admin prima del go-live |
| Audit | login, logout, reset, inviti, cambio ruolo, cambio email, MFA, session revoke |

## Guardrail auth obbligatori

- Nessun accesso a report/fatture/ordini usando solo ID URL senza verifica account.
- Nessuna credenziale o token in log, audit leggibili, querystring o frontend.
- Nessun messaggio di errore che confermi l'esistenza di un account.
- Nessuna modifica email/password/ruolo senza re-auth o conferma forte.
- Nessun invito team senza ruolo esplicito e account target.
- Nessuna sessione admin senza controlli MFA/step-up prima del go-live.
- Nessuna azione sensibile senza audit.
- object-level authorization obbligatoria per report, fatture, ordini, abbonamenti e team membership.

## Handoff a M11-P

M11-P deve progettare:

- modello account/team definitivo;
- flow registrazione/login/forgot/reset/invito;
- API contract auth/customer/admin;
- componenti UI auth;
- RBAC matrix customer/admin;
- session state e security state;
- copy errori sicuri;
- onboarding account post-checkout;
- matrice QA anti-regressione.
