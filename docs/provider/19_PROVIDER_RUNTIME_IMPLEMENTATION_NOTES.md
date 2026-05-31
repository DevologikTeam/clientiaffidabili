# Provider runtime — Implementation notes

## Runtime flow

```text
ordine pagato
  → POST /checks con orderId
  → ChecksService verifica stato ordine
  → ProviderRuntimeService.dispatchAfterPayment
  → mapping provider versionato
  → validazione input
  → costo stimato e ledger
  → idempotency key
  → OpenapiAdapterService
  → raw payload vault redatto
  → risultato normalizzato o review operativa
```

## Stato provider → stato check

| Provider status | Check status |
|---|---|
| completed | completed |
| requires_review | requires_review |
| failed | failed |
| waiting_provider / waiting_callback / polling | waiting_callback |
| altri stati validi | provider_requested |

## Sicurezza

- `OPENAPI_API_KEY` solo backend.
- `OPENAPI_CALLBACK_SECRET` solo backend.
- `ENABLE_PROVIDER_CALLS=false` di default.
- Raw payload redatto prima del salvataggio.
- Nessun raw payload nel frontend.
- Nessun dato carta nel runtime provider.

## Produzione

La produzione richiede prima:

1. documentazione partner aggiornata;
2. credenziali reali;
3. verifica endpoint/costi/addebiti;
4. test sandbox;
5. verifica legale su base d'uso;
6. aggiornamento mapping `enabledInProduction` per singolo servizio.
