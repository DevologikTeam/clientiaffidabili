# M19-P — Sandbox Certification Design

## Obiettivo

M19-P trasforma l’analisi M19-A in un blueprint operativo eseguibile per certificare in sandbox i flussi critici prima della Release Candidate.

Lo sprint non dichiara il prodotto production-ready. Progetta invece il sistema di certificazione che M19-S dovrà implementare: casi test, fixture, runbook, pass/fail, evidenze, error ledger, rollback e sign-off.

## Perimetro

- Stripe sandbox: one-shot payment, 3DS/SCA, failed payment, refund full/parziale, dispute, webhook duplicati.
- PayPal sandbox: order, capture, cancel/fail, refund, subscription normalizzata o feature flag disabilitato.
- Openapi/provider: mock/sandbox/live guard, idempotenza, cost snapshot, raw payload vault, retry controllato.
- OpenAI copilot: disabled-by-default, budget, redaction, usage ledger, draft approval.
- Email/PDF: template, delivery ledger, secure link, retry, bounce/complaint, suppression.
- Customer/admin/partner journeys: auth, checkout, report, billing, support, partner API, CMS SEO/GEO.
- Docker/Coolify: build, healthcheck, smoke test, rollback, seed fixture.

## Decisione di prodotto

La RC può includere solo ciò che supera sandbox o è esplicitamente disabilitato da feature flag/settings admin. Non sono ammessi provider “mezzi attivi”, perché pagamenti, dati provider, PDF e notifiche hanno impatto economico e reputazionale.

## Output M19-P

- Blueprint certificazione sandbox.
- Matrice pass/fail.
- Runbook esecuzione.
- Fixture e seed policy.
- Error ledger/refund rollback workflow.
- Admin sandbox certification UI blueprint.
- API contract per registrare esiti test.
- Handoff M19-S.
