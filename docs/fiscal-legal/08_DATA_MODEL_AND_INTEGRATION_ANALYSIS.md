# 08 — Data Model and Integration Analysis

## Moduli coinvolti

- Billing;
- Orders;
- Customer Dashboard;
- Admin Operations;
- Security/Audit;
- Reports;
- Provider Runtime;
- futuro Auth/Accounts;
- futuro Legal/Fiscal module.

## Nuovo modulo consigliato

`FiscalLegalModule`

Responsabilita:

- customer tax profile;
- fiscal documents;
- fiscal adjustments;
- legal documents;
- legal acceptances;
- export queue;
- fiscal/legal work items.

## Entita preliminari

### CustomerTaxProfile

Dati fiscali cliente versionabili.

### TaxProfileSnapshot

Snapshot immutabile usato in fatture/documenti.

### FiscalDocument

Fattura, ricevuta, nota credito, nota debito, proforma.

### FiscalDocumentLineItem

Righe documento con prodotto, descrizione, imponibile, IVA, totale.

### FiscalAdjustment

Collega refund, nota credito, dispute e motivo.

### LegalDocumentVersion

Versioni policy pubbliche.

### LegalAcceptance

Accettazioni cliente collegate a checkout/report/login/API.

### FiscalExportBatch

Export per commercialista/provider esterno.

## Eventi di integrazione

| Evento | Origine | Consumatore |
|---|---|---|
| `payment.confirmed` | Billing | FiscalLegal |
| `refund.requested` | Billing | FiscalLegal/AdminOps |
| `refund.completed` | Billing | FiscalLegal |
| `subscription.renewed` | Billing | FiscalLegal |
| `report.published` | Reports | FiscalLegal/CustomerDashboard |
| `legal.document.published` | FiscalLegal | Web/Checkout |
| `tax.profile.completed` | FiscalLegal | Checkout/Billing |

## API future

Customer:

- `GET /me/tax-profile`
- `PUT /me/tax-profile`
- `GET /me/fiscal-documents`
- `GET /legal/documents/current`
- `POST /legal/acceptances`

Admin:

- `GET /admin/fiscal/documents`
- `POST /admin/fiscal/documents/:id/mark-issued`
- `POST /admin/fiscal/adjustments/:id/approve`
- `GET /admin/legal/documents`
- `POST /admin/legal/documents/:id/publish`

## Integrazione checkout

Prima di creare sessione pagamento:

1. verifica servizio selezionato;
2. calcola prezzo e margine;
3. acquisisci/legal acceptance obbligatorie;
4. acquisisci profilo fiscale minimo;
5. crea ordine e payment session.

Dopo pagamento confermato:

1. payment ledger;
2. fiscal document queued;
3. provider call/credit reservation;
4. report generation;
5. dashboard customer.

## Data retention

Da validare legalmente/fiscalmente. Baseline tecnica:

- documenti fiscali: retention lunga secondo obblighi fiscali;
- legal acceptances: retention almeno per durata rapporto e difesa diritti;
- raw provider payload: retention minima necessaria;
- report snapshot: retention definita nei termini;
- audit admin: append-only.
