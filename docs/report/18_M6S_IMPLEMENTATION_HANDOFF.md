# M6-S Implementation Handoff

## Obiettivo sviluppo M6-S

Implementare la prima versione runtime del Report Composer:

- data model report/section/evidence/review;
- service composer con template registry;
- report web page cliente;
- admin review queue;
- snapshot immutabile;
- API customer/admin;
- QA antiregressione.

## File attesi M6-S

Backend:

- `apps/api/src/modules/reports/entities/report.entity.ts`
- `apps/api/src/modules/reports/entities/report-section.entity.ts`
- `apps/api/src/modules/reports/entities/report-evidence.entity.ts`
- `apps/api/src/modules/reports/entities/report-review.entity.ts`
- `apps/api/src/modules/reports/report-composer.service.ts`
- `apps/api/src/modules/reports/report-template.registry.ts`
- `apps/api/src/modules/reports/report-admin.controller.ts`

Frontend:

- `apps/web/components/reports/ReportHero.tsx`
- `apps/web/components/reports/AttentionBadge.tsx`
- `apps/web/components/reports/EvidenceCard.tsx`
- `apps/web/components/reports/SourceAndLimitsPanel.tsx`
- `apps/web/app/reports/[id]/page.tsx`
- `apps/web/app/admin/reports/page.tsx`

QA:

- `scripts/qa-report-composer-development.js`

## Guardrail M6-S

- No esporre raw payload provider al cliente.
- Non generare report prima di pagamento/provider completed.
- Non usare claim assoluti.
- Ogni score deve avere motivazione ed evidence.
- Ogni report ready deve avere fonti e limiti.
- Ogni review admin deve avere audit.
- Export PDF reale può restare placeholder.

## Acceptance criteria

- Utente può aprire report demo/stub in UI reale.
- Admin può vedere report in review queue.
- Report ready mostra summary, score, evidence, fonti, limiti.
- Report non ready mostra timeline stato.
- QA script blocca assenza di guardrail principali.
