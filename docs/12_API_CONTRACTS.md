# API contracts interni

Base URL locale: `http://localhost:3001`

## Health

`GET /health`

Risposta:

```json
{"status":"ok","service":"clientiaffidabili-api"}
```

## Prodotti

`GET /products`

Ritorna catalogo pubblico attivo.

## Ordini

`POST /orders`

```json
{
  "productCode": "COMPANY_PRO",
  "subject": {
    "type": "company",
    "vatNumber": "01234567890",
    "name": "Example Srl"
  }
}
```

## Checkout

`POST /billing/checkout-session`

```json
{
  "orderId": "uuid"
}
```

Risposta:

```json
{
  "checkoutUrl": "https://checkout.stripe.com/..."
}
```

## Verifiche

`POST /checks`

Crea una verifica solo se l’ordine è pagato o se l’utente ha crediti/piano attivo.

## Callback provider

`POST /provider/openapi/callback`

Richiede firma tramite header dedicato. Deve essere idempotente.

## Report

`GET /reports/:checkId`

Ritorna report normalizzato per dashboard.

## Error format

```json
{
  "code": "CHECK_PROVIDER_TIMEOUT",
  "message": "La verifica richiede più tempo del previsto.",
  "action": "Ti avviseremo appena il report sarà disponibile."
}
```
