# 01 — Platform Settings, Bootstrap Admin & Operational Error Ledger Roadmap Insert

## Nuovo modulo roadmap

Aggiungere dopo M15-S un modulo trasversale:

### M15B-A — Platform Settings, Bootstrap Admin & Operational Error Ledger Analysis
Analisi di settings admin, bootstrap admin, kill switch acquisti, configurazioni pagamenti/Openapi/OpenAI, error ledger, IP acquisto, audit e privacy.

### M15B-P — Platform Settings, Bootstrap Admin & Operational Error Ledger Design
Blueprint data model, API contract, UI admin, RBAC, secret handling, audit, error triage e handoff.

### M15B-S — Platform Settings, Bootstrap Admin & Operational Error Ledger Development
Implementazione runtime settings, admin bootstrap, purchase kill switch, settings providers, error ledger, admin UI, QA e migration/seed.

## Perché è prioritario

Senza questo modulo, ogni modifica a pagamenti/provider/API richiederebbe ENV/deploy. Il prodotto deve invece permettere al Super Admin di:

- disabilitare temporaneamente acquisti;
- configurare metodi di pagamento;
- configurare provider dati Openapi;
- configurare eventuali API OpenAI;
- leggere errori operativi;
- collegare errori a rimborsi/fix;
- tracciare IP e contesto antifrode degli acquisti.

## Guardrail

- Nessun segreto in chiaro nel frontend.
- Settings sensibili leggibili solo come stato/redacted.
- Modifiche settings con reason obbligatoria.
- Audit append-only.
- Feature flag e kill switch sempre server-side.
