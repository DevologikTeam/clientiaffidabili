# M19-S — Sandbox Certification Development

## Obiettivo

Trasformare il blueprint M19-P in un runtime certificabile mock-first per preparare la Release Candidate senza eseguire chiamate provider reali dentro lo sprint.

## Implementato

### Backend

- `SandboxCertificationModule` registrato in `AppModule`.
- Entita TypeORM:
  - `SandboxScenario`;
  - `SandboxCertificationRun`;
  - `SandboxScenarioResult`;
  - `SandboxEvidence`;
  - `SandboxWaiver`.
- Controller admin `admin/sandbox-certification` con endpoint per summary, scenari, run, retry, waiver ed evidenze.
- Service runtime con seed registry, run execution, retry, waiver auditato, evidence ledger e collegamento `OperationalErrorEvent`.
- Adapter `MockSandboxCertificationAdapter` per eseguire scenari senza provider reali, sempre con payload redatti.
- Registry scenari esteso per Stripe, PayPal, Openapi, OpenAI, email, PDF, auth, dashboard, partner API, CMS, Docker/Coolify e security audit.

### Frontend

- Route `/admin/launch-readiness/sandbox-certification`.
- Route `/admin/launch-readiness/sandbox-certification/scenarios`.
- Route `/admin/launch-readiness/sandbox-certification/[runId]`.
- Componenti admin:
  - `CertificationSummaryCards`;
  - `CertificationScenarioTable`;
  - `CertificationRunTimeline`;
  - `CertificationEvidenceList`;
  - `CertificationBlockerPanel`;
  - `CertificationWaiverModal`;
  - `CertificationRunbookCard`.
- Collegamento dalla pagina launch readiness esistente.

### QA e comandi

- `scripts/qa-sandbox-certification-development.js`.
- `scripts/sandbox-certification-static-gate.js`.
- `scripts/sandbox-certification-runner.js`.
- Script package:
  - `qa:sandbox-certification-development`;
  - `sandbox:certification:static-gate`;
  - `sandbox:certification:runner`;
  - `release:sandbox-certification-development-check`.

## Guardrail rispettati

- Nessuna chiamata Stripe, PayPal, Openapi, OpenAI o email reale.
- Nessuna secret live hardcoded.
- Nessuna evidenza con payload grezzo esposto.
- Waiver valido solo con feature flag/settings disabilitati.
- Ogni scenario fallito o bloccato puo produrre `OperationalErrorEvent`.
- Docker/Coolify e provider sandbox reali restano gate da eseguire nell'ambiente del progetto prima della RC.

## Stato

Sprint completato come runtime MVP mock-first. Non dichiara il prodotto production-ready.

## Handoff M20-A

Il prossimo sprint deve analizzare UX, SEO, performance e accessibilita partendo da superfici reali gia presenti, con attenzione a:

- chiarezza del funnel pubblico;
- leggibilita catalogo/prezzi;
- dashboard cliente;
- admin interno;
- performance Next.js;
- accessibilita WCAG AA;
- microcopy e trust;
- eliminazione claim rischiosi.
