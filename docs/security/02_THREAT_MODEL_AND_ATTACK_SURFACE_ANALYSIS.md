# Threat Model & Attack Surface Analysis

## Attori di minaccia

- Utente anonimo che tenta abuso del funnel o API pubbliche.
- Cliente autenticato che tenta accesso a report/altri ordini non suoi.
- Account compromesso.
- Operatore admin negligente o malevolo.
- Attaccante che tenta webhook spoofing.
- Attaccante che tenta cost exhaustion sulle API provider.
- Supply-chain attacker tramite dipendenze npm/docker.
- Errore operativo durante deploy, backup o restore.

## Asset critici

| Asset | Criticita' |
|---|---:|
| Report cliente pubblicati | Alta |
| Raw payload provider | Molto alta |
| Chiavi Openapi/Stripe/PayPal | Critica |
| Payment ledger/refund/dispute | Alta |
| Billing profile/fatture | Alta |
| Admin audit log | Alta |
| Credit wallet/entitlement | Alta |
| Database PostgreSQL | Critica |

## Scenari prioritari

### BOLA/IDOR su report

Un cliente modifica un ID nella URL `/dashboard/verifiche/[id]` o `/reports/[id]`. Il backend non deve fidarsi del frontend: ogni endpoint deve verificare `accountId`, ownership, ruolo e stato del report.

### Provider cost exhaustion

Un bug o abuso ripete chiamate provider a pagamento. Mitigazioni: idempotency key, request state machine, cost ledger, retry safe-only, rate limit per account e blocco admin per anomalie.

### Webhook spoofing o replay

Un attaccante invia eventi finti di pagamento riuscito. Mitigazioni: verifica firma Stripe/PayPal, idempotenza su event ID, reconciliation con provider e nessun cambio stato se provider non verificato.

### Admin action abuse

Operatore prova a pubblicare report, rimborsare, ritentare provider o modificare billing senza autorizzazione. Mitigazioni: RBAC backend, reason obbligatoria, audit append-only, alert su azioni critiche.

### Secret leakage

Chiavi provider finiscono in repository, log o frontend env. Mitigazioni: secret scanning, Coolify secrets, allowlist env frontend, redaction log, rotazione.

## Analisi OWASP applicabile

La baseline deve coprire OWASP Top 10 2025 per web application e OWASP API Security Top 10 2023 per le API. Per il progetto, i rischi piu' rilevanti sono broken access control/BOLA, security misconfiguration, supply chain, authentication failures, logging/alerting failures, unrestricted resource consumption e unsafe consumption of APIs.

## Controlli richiesti

- Test automatici su ownership e RBAC.
- Endpoint admin separati e protetti.
- DTO validation per ogni input.
- Rate limit differenziato: pubblico, cliente, admin, provider trigger.
- Helmet/security headers.
- CORS restrittivo.
- Sanitizzazione output report/copy.
- Log strutturati senza PII e senza token.
- Alert su P0 operational queue.
