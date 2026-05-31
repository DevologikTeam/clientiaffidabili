# Partner API Contracts Blueprint

## Convenzioni
Base path futuro: `/api/partner/v1`.

Header obbligatori:
- `Authorization: Bearer <api_key>`
- `Idempotency-Key: <uuid>` per operazioni di creazione/costo
- `Content-Type: application/json`
- `X-Client-Request-Id` opzionale per tracciamento partner

## Endpoint MVP

### Crea verifica azienda
`POST /api/partner/v1/company-checks`

Payload:
```json
{
  "serviceCode": "company_reliability_pro",
  "subject": {
    "vatNumber": "IT00000000000",
    "companyName": "Esempio Srl"
  },
  "metadata": {
    "externalCustomerId": "crm-123",
    "externalOrderId": "ord-456"
  }
}
```

Risposta:
```json
{
  "checkId": "chk_123",
  "status": "queued",
  "environment": "sandbox",
  "estimatedCompletion": "in pochi minuti",
  "links": {
    "status": "/api/partner/v1/company-checks/chk_123",
    "report": null
  }
}
```

### Stato verifica
`GET /api/partner/v1/company-checks/{checkId}`

### Report disponibile
`GET /api/partner/v1/reports/{reportId}`

### Usage
`GET /api/partner/v1/usage?from=YYYY-MM-DD&to=YYYY-MM-DD`

### Webhook test
`POST /api/partner/v1/webhooks/test`

## Error model
Risposte standardizzate:
```json
{
  "error": {
    "code": "insufficient_credits",
    "message": "Crediti insufficienti per completare la richiesta.",
    "nextAction": "Ricarica il wallet o passa a un piano superiore.",
    "requestId": "req_123"
  }
}
```

## Stati check partner-facing
- `queued`
- `processing`
- `requires_manual_review`
- `completed`
- `failed_retryable`
- `failed_final`
- `refunded_or_reversed`

## Privacy
La risposta partner non deve includere raw payload provider, token, dati non richiesti, note interne admin o dettagli di costo provider non previsti dal contratto.
