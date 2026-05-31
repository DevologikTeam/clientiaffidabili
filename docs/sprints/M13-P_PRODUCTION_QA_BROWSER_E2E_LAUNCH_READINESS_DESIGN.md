# M13-P — Production QA, Browser E2E & Launch Readiness Design

## Tipo sprint
Progettazione tecnica/QA/Release.

## Obiettivo
Trasformare l'analisi M13-A in un blueprint operativo pronto per lo sviluppo M13-S: test browser, build gate, smoke test, workflow CI, rollback, seed dati, test payment/pagamento/provider/report e checklist go-live.

## Decisione prodotto
ClientiAffidabili.it non deve essere pubblicato come servizio transazionale finche' non esiste una prova ripetibile end-to-end. Il design M13-P definisce quindi un gate in tre livelli:

1. **Local gate**: installazione dipendenze, typecheck, lint, build, QA script.
2. **Container gate**: Docker Compose pulito, healthcheck, smoke API/Web, seed controllati.
3. **Launch gate**: Playwright E2E, webhook sandbox, provider sandbox/mock controllato, backup/restore, rollback plan e sign-off.

## Scope incluso
- Blueprint Playwright.
- Matrice percorsi critici.
- Workflow CI proposto.
- Smoke test Docker/Coolify.
- Test data e seed policy.
- Payment/provider/report E2E blueprint.
- Release checklist e rollback.
- Handoff M13-S.

## Scope escluso
- Esecuzione reale Playwright.
- Installazione browser.
- Build reale con dipendenze.
- Deploy Coolify reale.
- Test sandbox Stripe/PayPal/Openapi reali.

## Principio UX/QA
I test devono comportarsi come un cliente reale e un operatore reale, non come una verifica tecnica isolata. Ogni scenario deve concludersi con una prova osservabile: pagina visibile, stato coerente, audit scritto, ledger coerente o blocco esplicito.

## Gate bloccanti prima del go-live
- Build/typecheck/lint non passati.
- Playwright critico non passato.
- Webhook non firmati.
- Report accessibile da account sbagliato.
- Provider chiamato prima di pagamento/credito.
- Rimborso possibile su report gia' consegnato senza override auditato.
- API key partner live senza approval.
- Backup non ripristinato in staging.
- Legal/fiscal pack non revisionato professionalmente.
