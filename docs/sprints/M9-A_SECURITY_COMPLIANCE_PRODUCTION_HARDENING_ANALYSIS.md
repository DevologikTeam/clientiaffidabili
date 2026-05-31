# M9-A — Security, Compliance & Production Hardening Analysis

Versione: `0.29.0`  
Data: `2026-05-30`  
Tipo sprint: **Analisi**  
Modulo: **Security, Compliance & Production Hardening**

## Obiettivo

Portare ClientiAffidabili.it da piattaforma scaffold/MVP a prodotto preparabile per staging e successivamente produzione, con una baseline di sicurezza, privacy, deploy, backup, audit, incident response e compliance proporzionata al modello di business: rivendita di servizi informativi/API, checkout, pagamenti, abbonamenti, report e dati potenzialmente sensibili.

Lo sprint non implementa ancora l'hardening runtime: definisce rischi, requisiti, priorita', gate e backlog tecnico per M9-P e M9-S.

## Perimetro analizzato

- Next.js public/customer/admin frontend.
- NestJS API backend.
- PostgreSQL e TypeORM.
- Docker Compose e deploy Coolify.
- Integrazione provider dati Openapi-first.
- Stripe/PayPal e subscription/credit wallet/refund runtime.
- Report composer e dashboard cliente.
- Admin operations e audit.
- Log, metriche, incident response e backup/restore.
- GDPR, data breach, sicurezza applicativa, API security e NIS2 readiness prudente.

## Decisione di sicurezza prodotto

ClientiAffidabili.it deve essere progettato come piattaforma **security-first, audit-first, provider-safe e privacy-by-design**. La sicurezza non deve essere percepita dal cliente come complessita' tecnica, ma deve tradursi in: dati protetti, accesso chiaro, pagamenti sicuri, report tracciabili, processi rimborsi controllati, assistenza responsabile e comunicazioni trasparenti.

## Rischi principali emersi

| Area | Rischio | Priorita' | Mitigazione proposta |
|---|---|---:|---|
| Access control | Cliente vede report/verifiche di altri account | P0 | RBAC backend, object-level authorization, test BOLA/IDOR |
| Admin | Operatore compie retry/rimborso/pubblicazione non autorizzata | P0 | RBAC, reason obbligatoria, audit append-only, dual control futuro |
| Provider | Chiamate Openapi duplicate/costose | P0 | idempotency, provider cost ledger, retry safe-only |
| Pagamenti | Webhook falsi o doppi | P0 | firma webhook, idempotenza, reconciliation ledger |
| Privacy | Raw payload esposto o conservato troppo | P0 | raw vault redatto, retention, minimizzazione, accesso ristretto |
| Logging | PII/segreti nei log | P0 | log redaction, structured logging, secret scanner |
| Supply chain | dipendenze vulnerabili | P1 | lockfile, audit, SCA, build pinned |
| Backup | impossibile ripristinare ordini/report/fatture | P0 | backup cifrati, restore drill, RPO/RTO definiti |
| Incident | data breach non gestito entro tempi | P0 | runbook, severity matrix, registro incidenti, escalation |
| Deploy | segreti nel repository o env non governati | P0 | Coolify secrets, env inventory, no secret in frontend |

## Gate produzione proposto

Prima di produzione reale:

1. Build reale `pnpm install && pnpm build` completata.
2. Typecheck backend/frontend completato.
3. Test unit/integration minimi su auth, RBAC, checkout, webhook, provider, report access.
4. Security headers e cookie flags definiti.
5. Rate limit API e cost protection provider.
6. Webhook signature verification attiva per Stripe/PayPal.
7. Provider call disattivate di default in staging non autorizzato.
8. Backup PostgreSQL schedulato e restore test documentato.
9. Registro trattamenti/DPIA-light preparati.
10. Incident/data breach runbook operativo.
11. Log redaction verificata.
12. Nessun secret nel repository.
13. Admin operations protetta da RBAC backend.
14. Report access object-level tested.
15. Policy rimborsi/customer legal allineate con M10.

## Output sprint

- Threat model iniziale.
- Analisi privacy e data protection.
- Analisi RBAC/sessioni/segreti.
- Analisi API/provider/payment security.
- Analisi Coolify/deploy/backup/restore.
- Analisi logging/audit/observability.
- Matrice QA security/production gate.
- Checklist readiness M9-P/M9-S.

## Esito

M9-A e' completato quando il progetto dispone di un quadro chiaro di rischi, controlli, gate e priorita' per rendere il prodotto production-ready senza esporre dati, segreti, report, pagamenti o chiamate provider a rischi evitabili.
