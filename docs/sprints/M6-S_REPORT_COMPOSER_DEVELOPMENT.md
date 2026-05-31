# Sprint M6-S — Report Composer Development

## Versione

`0.19.0`

## Obiettivo

Implementare il runtime iniziale del Report Composer: trasformare risultati provider normalizzati in snapshot report cliente, mantenendo copy prudente, evidenze tracciabili, fonti, limiti, auditabilità e coda review.

## Deliverable

- Entità `Report` estesa con status, template, score, snapshot hash e review metadata.
- `ReportScoreService` con scoring prudente e blocco claim vietati.
- `ReportComposerService` con composizione da `ProviderRequest`.
- API `POST /reports/compose`, `GET /reports/:id`, `GET /reports/admin/queue`, `POST /reports/:id/publish-after-review`.
- UI customer report con hero, sezioni, evidenze, limiti e prossime azioni.
- UI interna `/admin/reports` per coda report.
- Addendum pagamenti: valutazione Stripe + PayPal, one-shot e abbonamenti.
- QA script antiregressione M6-S.

## Guardrail implementati

1. Payload provider grezzi non esposti al cliente.
2. Report come supporto decisionale, non decisione automatica.
3. Copy vietato bloccato da `FORBIDDEN_REPORT_CLAIMS`.
4. Report snapshot hash per futura esportazione PDF.
5. Review manuale per dati insufficienti o compliance-sensitive.
6. Fonti e limiti sempre presenti.
7. Nessuna promessa assoluta su solvibilità o comportamento futuro.

## Nota pagamenti

La valutazione Stripe/PayPal viene inclusa in questo sprint come addendum architetturale, non come sviluppo completo. Lo sviluppo subscription dovrà avere modulo dedicato M4B-A/P/S.
