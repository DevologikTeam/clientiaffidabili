# M9-S — Security, Compliance & Production Hardening Development

## Obiettivo

Implementare i primi controlli runtime e statici che impediscono un go-live non sicuro di ClientiAffidabili.it.

Lo sprint non dichiara il prodotto production-ready: crea invece i blocchi minimi per arrivarci con evidenze verificabili.

## Scope implementato

- Modulo NestJS `SecurityModule`.
- Endpoint interni per controlli, production gate, redaction preview, webhook signature preview e object access preview.
- Servizi runtime per RBAC/object authorization, redaction, webhook security e production readiness.
- Guard scaffold per RBAC e object-level authorization.
- Security headers base in `main.ts`.
- Script statici `security-secret-scan.js` e `security-production-gate.js`.
- Pagina interna `/admin/security` per visualizzare controlli e gate.
- Runbook backup/restore/incident e QA gate.

## Decisioni

1. Il sistema resta bloccato per produzione finché i gate P0 non hanno evidenze reali.
2. I controlli implementati sono scaffold applicativi: vanno collegati agli endpoint reali con auth/sessioni nel modulo M11.
3. Le chiavi Stripe, PayPal, Openapi e JWT non devono mai entrare in repository.
4. I raw payload provider devono essere redatti prima di log, UI o audit customer-facing.
5. I webhook devono essere firmati, idempotenti e dentro finestra temporale.

## Non incluso

- Login reale e session management completo.
- MFA.
- Test e2e browser reali.
- Restore drill eseguito su database reale.
- Pentest o vulnerability assessment professionale.
- Verifica legale definitiva GDPR/NIS2.

## Esito

Sprint completato come hardening development scaffold. Produzione ancora bloccata fino a M9 production gate reale e M11 auth/account management.
