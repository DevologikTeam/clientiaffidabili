# Partner Public API Implementation

## Endpoint MVP
Base path: `/api/partner/v1`.

Endpoint implementati/scaffold:
- `POST /company-checks`
- `GET /company-checks/:checkId`
- `GET /reports/:reportId`
- `GET /usage`
- `POST /webhooks/test`

## Idempotenza
`POST /company-checks` richiede header `Idempotency-Key`. La stessa chiave protegge da doppio consumo. Lo scaffold salva/firma un record idempotenza.

## Error model
Gli errori sono customer/partner-facing e non contengono dettagli provider, stacktrace o raw payload.

## Provider guard
In sandbox non viene chiamato nessun provider. In live l'API resta bloccata finche' il partner non e' approvato e finche' il production gate M13 non viene validato.
