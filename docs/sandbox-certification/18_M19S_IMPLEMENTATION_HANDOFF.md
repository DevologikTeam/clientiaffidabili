# M19-S Implementation Handoff

## Da implementare in M19-S

### Backend

- `SandboxCertificationModule`.
- Entità `SandboxScenario`, `SandboxCertificationRun`, `SandboxScenarioResult`, `SandboxEvidence`, `SandboxWaiver`.
- Registry scenario.
- Runner mock-first.
- Adapter per Stripe/PayPal/Openapi/OpenAI/email/PDF.
- Collegamento Operational Error Ledger.
- Export evidenze.

### Frontend

- `/admin/launch-readiness/sandbox-certification`.
- Lista scenari.
- Dettaglio run.
- Evidenze.
- Blocker panel.
- Waiver modal.

### Script QA

- `scripts/qa-sandbox-certification-development.js`.
- `scripts/sandbox-certification-static-gate.js`.
- `scripts/sandbox-certification-runner.js`.

## Definition of Done

- QA statico passa.
- Source syntax smoke passa.
- Nessuna secret live hardcoded.
- Registry scenari presente.
- Admin UI scaffoldata.
- Error ledger integrato.
- ZIP validato.

## Non incluso in M19-S se non esplicitamente testabile

- Provider sandbox live reali.
- Invio email reale.
- Build Docker/Coolify reale.
- Playwright reale.

M19-S deve però predisporre i comandi e i punti di integrazione per eseguire questi test nel tuo ambiente.
