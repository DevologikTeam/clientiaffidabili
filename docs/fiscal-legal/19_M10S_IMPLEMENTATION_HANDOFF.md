# M10-S Implementation Handoff

## Obiettivo M10-S

Implementare il modulo fiscal/legal MVP senza automazione SDI: entita, servizi, controller, pagine cliente, pagine legal, admin queue e QA.

## Backend da implementare

- `FiscalLegalModule`
- Entita:
  - `CustomerTaxProfile`
  - `FiscalDocument`
  - `LegalDocument`
  - `LegalAcceptance`
  - `RefundFiscalDecision`
- Service:
  - `CustomerTaxProfileService`
  - `FiscalDocumentService`
  - `LegalDocumentService`
  - `LegalAcceptanceService`
  - `FiscalLegalAdminService`
- Controller customer/admin/checkout.

## Frontend da implementare

- `/dashboard/profilo-fiscale`
- `/dashboard/documenti-fiscali`
- `/dashboard/consensi`
- `/dashboard/rimborsi`
- `/admin/fiscal-legal`
- pagine legal:
  - `/legal/termini`
  - `/legal/privacy`
  - `/legal/cookie`
  - `/legal/rimborsi`
  - `/legal/uso-accettabile`
  - `/legal/disclaimer-report`

## Componenti UI

- `TaxProfileCard`
- `FiscalDocumentTable`
- `LegalAcceptanceList`
- `RefundStatusCard`
- `LegalDocumentViewer`
- `FiscalLegalQueueTable`
- `FiscalDecisionPanel`

## Guardrail implementativi

- Nessun documento legale `published` senza `contentHash`.
- Nessun checkout se legal pack obbligatorio non pubblicato.
- Nessun documento fiscale senza tax profile snapshot.
- Nessuna modifica di snapshot dopo emissione.
- Reason obbligatoria per azioni admin sensibili.
- Audit append-only.
- Template legali marcati come “da validare” in non-production.

## QA M10-S

Lo script deve verificare:

- presenza entita e controller;
- route customer/admin/legal;
- legal pack obbligatorio;
- reason obbligatoria;
- contentHash/legal versioning;
- refund fiscal gate;
- assenza parole vietate: “garantiamo solvibilita”, “rischio zero”, “pagamento sicuro al 100%”.
