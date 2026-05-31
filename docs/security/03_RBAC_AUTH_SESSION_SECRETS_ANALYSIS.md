# RBAC, Auth, Session & Secrets Analysis

## Auth target

Per MVP e' accettabile usare un auth provider managed oppure un modulo interno solo se completato da test e controlli. La scelta consigliata per produzione e':

- email/password + magic link o OAuth opzionale;
- MFA obbligatoria per admin;
- sessioni httpOnly secure cookie;
- refresh/session rotation;
- password policy se password gestite internamente;
- account lock/rate limit login.

## Ruoli customer

| Ruolo | Accesso |
|---|---|
| owner | tutto l'account, billing, utenti, report |
| admin | verifiche/report/supporto, no pagamenti critici se non autorizzato |
| analyst | avvia/verifica report, legge report autorizzati |
| billing | fatture, abbonamento, rimborsi richiesti |
| viewer | sola lettura report consentiti |

## Ruoli interni

| Ruolo | Accesso |
|---|---|
| support | ticket e stato ordine redatto |
| operations | code operative, retry consentiti |
| billing | pagamenti, fatture, rimborsi |
| compliance | report review, blocco report, privacy review |
| analyst | verifica qualitativa report |
| super_admin | configurazione e override controllati |

## Regole RBAC

- Il frontend puo' nascondere azioni, ma il backend decide sempre.
- Ogni endpoint admin richiede role e permission specifica.
- Ogni action critica richiede `reason` non vuota.
- Ogni azione che modifica stato produce audit event.
- Le viste lista devono essere redatte: no raw payload, no segreti, no token.

## Segreti

| Segreto | Dove vive | Dove non deve vivere |
|---|---|---|
| OPENAPI_API_KEY | Coolify secret/backend env | repo, frontend, log |
| STRIPE_SECRET_KEY | Coolify secret/backend env | frontend, log |
| STRIPE_WEBHOOK_SECRET | Coolify secret/backend env | repo, frontend |
| PAYPAL_CLIENT_SECRET | Coolify secret/backend env | frontend, log |
| DATABASE_URL | Coolify secret/backend env | public repo |
| JWT/SESSION_SECRET | Coolify secret/backend env | repo |

## Env governance

- `.env.example` deve contenere solo placeholder.
- Variabili `NEXT_PUBLIC_*` solo per valori non segreti.
- Inventory env con owner, scopo, rotazione, ambiente e fallback.
- Rotazione chiavi documentata per Openapi, Stripe, PayPal, session secret.
