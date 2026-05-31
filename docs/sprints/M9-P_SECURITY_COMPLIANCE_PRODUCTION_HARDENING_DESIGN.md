# M9-P — Security, Compliance & Production Hardening Design

## Obiettivo sprint

Trasformare l'analisi M9-A in un blueprint operativo per portare ClientiAffidabili.it verso staging/production con controlli misurabili, non solo checklist teoriche.

Lo sprint non attiva la produzione: definisce cosa deve essere implementato in M9-S e quali gate devono bloccare il go-live se non superati.

## Principi di progetto

1. **Secure by default**: ogni route customer/admin deve avere autenticazione, RBAC e object-level authorization.
2. **Zero trust interno**: non basta essere loggati; ogni accesso a ordine, report, fattura, ticket, pagamento e richiesta provider deve verificare ownership o ruolo.
3. **Data minimization**: raccogliere solo dati necessari alla verifica acquistata.
4. **Secrets backend-only**: chiavi Stripe, PayPal, Openapi, JWT, DB e storage solo in backend/Coolify secrets.
5. **Audit append-only**: azioni critiche mai sovrascritte; ogni override richiede reason.
6. **No raw payload exposure**: raw payload provider mai visibile al cliente, mai nelle liste admin e mai nei log applicativi.
7. **Provider/payment safety**: webhook firmati, idempotenti, riconciliabili; provider call solo post-payment o credito riservato.
8. **Production gate vincolante**: build, test, backup/restore, secret scan, object-level authorization e runbook incident/data breach sono blocchi di release.

## Scope M9-P

Incluso:

- blueprint RBAC e object-level authorization;
- matrice protezione dati e retention;
- secrets e Coolify hardening;
- webhook/payment/provider security;
- backup/restore e disaster recovery;
- incident response e data breach runbook;
- observability, log redaction e audit;
- security QA e production gate;
- handoff tecnico M9-S.

Escluso:

- implementazione effettiva middleware/guard: M9-S;
- audit legale finale GDPR/NIS2: M10/legal review;
- pentest esterno: fase pre-produzione;
- certificazioni formali: roadmap successiva.

## Deliverable

- Documentazione security blueprint in `docs/security/11-20_*`.
- Contratti TypeScript security in `apps/api/src/modules/security`.
- Blueprint runtime frontend in `apps/web/lib/security`.
- QA script `qa-security-compliance-hardening-design.js`.
- Roadmap/release/changelog aggiornati.

## Gate verso M9-S

M9-S puo' iniziare solo se questi output restano coerenti:

- ogni superficie dati ha owner model;
- ogni azione critica ha audit event;
- ogni webhook ha firma, deduplica e reconciliation target;
- ogni secret ha source of truth e non appare in frontend;
- backup/restore ha RPO/RTO e prova obbligatoria;
- incident/data breach ha owner e tempi massimi;
- production gate ha criteri pass/fail.
