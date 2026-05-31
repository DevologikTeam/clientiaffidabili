# 11 — Checkout API Contracts

## Convenzioni

- Tutte le API restituiscono errori leggibili e codici machine-readable.
- Le API pubbliche non espongono costi provider o margini interni.
- Gli endpoint admin richiedono ruolo interno/super admin.
- Le chiamate sensibili generano audit log.

## POST `/orders`

Crea ordine draft/pending con snapshot prezzo.

### Request

```json
{
  "productCode": "COMPANY_PRO",
  "subject": {
    "vatNumber": "01234567890",
    "legalName": "Rossi Srl"
  },
  "purpose": "Valutazione fornitore prima di apertura rapporto commerciale",
  "legalUseConfirmed": true,
  "reportLimitsAccepted": true,
  "termsAccepted": true
}
```

### Response

```json
{
  "orderId": "ord_...",
  "status": "pending_payment",
  "priceSnapshot": {
    "productCode": "COMPANY_PRO",
    "unitNetCents": 2490,
    "vatCents": 548,
    "totalGrossCents": 3038,
    "currency": "EUR"
  },
  "nextAction": "create_checkout_session"
}
```

### Errori

| Codice | Significato |
|---|---|
| `SERVICE_NOT_FOUND` | prodotto non trovato |
| `SERVICE_ASSISTED` | servizio non acquistabile self-service |
| `PRICE_GUARD_BLOCKED` | margine/prezzo sotto soglia |
| `LEGAL_CONFIRMATION_REQUIRED` | checkbox uso lecito mancante |
| `INVALID_SUBJECT_PAYLOAD` | dati soggetto insufficienti |

## POST `/billing/checkout-session`

Crea sessione hosted provider.

### Request

```json
{
  "orderId": "ord_...",
  "provider": "stripe",
  "billingProfile": {
    "legalName": "Rossi Srl",
    "vatNumber": "01234567890",
    "billingEmail": "amministrazione@rossi.it",
    "country": "IT",
    "addressLine1": "Via Roma 1",
    "postalCode": "00100",
    "city": "Roma",
    "province": "RM"
  },
  "successUrl": "https://clientiaffidabili.it/checkout/success?orderId=ord_...",
  "cancelUrl": "https://clientiaffidabili.it/checkout/cancel?orderId=ord_..."
}
```

### Response

```json
{
  "checkoutSessionId": "chk_...",
  "provider": "stripe",
  "checkoutUrl": "https://checkout.stripe.com/...",
  "expiresAt": "2026-05-29T22:00:00.000Z"
}
```

## GET `/orders/:id`

Restituisce stato cliente-safe dell'ordine.

Non restituisce:

- costi provider;
- raw payload provider;
- id interni di webhook;
- margini.

## POST `/billing/webhooks/:provider`

Endpoint server-to-server per eventi provider.

Regole:

- verificare firma prima di parsing operativo;
- calcolare `payloadHash`;
- bloccare duplicati tramite `providerEventId`;
- salvare evento anche se ignorato/fallito;
- processare solo eventi supportati.

Eventi MVP:

- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `charge.dispute.created`

## POST `/billing/refunds`

Richiede rimborso.

### Request

```json
{
  "orderId": "ord_...",
  "reason": "customer_request",
  "amountCents": 3038
}
```

Regola MVP: se il provider dati è già stato chiamato, stato `requires_manual_review`.

## GET `/admin/billing/queue`

Restituisce code operative:

- pagamenti pendenti;
- webhook falliti;
- rimborsi da approvare;
- dispute;
- fatture fallite;
- ordini pagati ma non processati.

## POST `/admin/billing/webhook-events/:id/retry`

Riesegue elaborazione evento fallito. Richiede audit obbligatorio.

## POST `/admin/billing/invoices/:id/mark-issued`

Marca fattura/ricevuta emessa manualmente finché SDI/gestionale contabile non è integrato.
