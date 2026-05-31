# Report API Contracts

## Customer API

### `GET /reports/:id`

Restituisce report pubblicabile per il cliente autenticato.

Response MVP:

```json
{
  "id": "rep_123",
  "orderId": "ord_123",
  "status": "ready",
  "templateCode": "company_reliability_pro_v1",
  "subject": {
    "name": "ACME SRL",
    "vatNumber": "IT00000000000"
  },
  "attentionLevel": "medium_attention",
  "summary": "Sono presenti elementi da verificare prima di aumentare l'esposizione commerciale.",
  "sections": [],
  "sources": [],
  "limits": [],
  "generatedAt": "2026-05-29T00:00:00.000Z"
}
```

### `GET /reports/:id/download`

Preparato per export PDF futuro. In MVP può restituire `501 not implemented` oppure un placeholder controllato.

## Internal composer API

### `POST /internal/reports/compose`

Chiamato dopo provider completed/manual review.

Input:

- order id;
- check id;
- provider request ids;
- template code;
- composer version.

Output:

- report id;
- status;
- review requirement;
- warning list.

## Admin API

### `GET /admin/reports/review-queue`

Restituisce report in review.

### `POST /admin/reports/:id/approve`

Approva pubblicazione.

### `POST /admin/reports/:id/reject`

Blocca pubblicazione con motivo.

### `POST /admin/reports/:id/request-changes`

Richiede rigenerazione o intervento.

## Security

- Customer API tenant scoped.
- Admin API protetta da ruolo interno.
- Download tracciato con audit log.
- Nessun raw payload nel response cliente.
- Nessuna chiave provider nel frontend.
