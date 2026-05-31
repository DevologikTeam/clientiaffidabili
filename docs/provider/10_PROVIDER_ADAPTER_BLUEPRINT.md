# Provider adapter blueprint

## Finalità

Il provider adapter isola Openapi e futuri provider dal dominio ClientiAffidabili.it. Il resto dell'applicazione non deve conoscere endpoint, payload o autenticazione provider.

## Interfaccia concettuale

```ts
interface ProviderAdapter {
  readonly providerName: ProviderName;
  validateInput(mapping, subject): ProviderValidationResult;
  estimateCost(mapping, subject): ProviderCostEstimate;
  createRequest(context): Promise<ProviderDispatchResult>;
  pollStatus?(request): Promise<ProviderPollResult>;
  parseCallback?(payload, headers): ProviderCallbackResult;
  normalize(response, mapping): ProviderNormalizedResult;
}
```

## Responsabilità adapter

- Tradurre input interno in payload provider.
- Applicare autenticazione server-side.
- Allegare idempotency key quando supportata dal provider o mantenerla internamente.
- Restituire `providerRequestId` e stato iniziale.
- Normalizzare errori tecnici e funzionali.
- Non decidere prezzo pubblico, margine o rimborsi.
- Non produrre copy cliente finale.

## Adapter Openapi-first

`OpenapiAdapterService` in M5-S dovrà passare da mock generico a implementazione composta da:

- `OpenapiAuthClient` per token/API key.
- `OpenapiPayloadBuilder` per mapping prodotto → payload provider.
- `OpenapiDispatchClient` per invio.
- `OpenapiStatusClient` per polling dove disponibile.
- `OpenapiCallbackVerifier` per callback firmate.
- `OpenapiNormalizer` per trasformare payload in DTO comuni.

## Feature flag obbligatori

| Flag | Default | Uso |
|---|---:|---|
| `ENABLE_PROVIDER_CALLS` | `false` | Abilita chiamate esterne. |
| `OPENAPI_ENVIRONMENT` | `sandbox` | Seleziona base URL e credenziali. |
| `OPENAPI_PRODUCTION_UNLOCKED` | `false` | Blocco esplicito produzione. |
| `PROVIDER_RAW_PAYLOAD_VAULT_ENABLED` | `true` | Conservazione raw payload protetta. |
| `PROVIDER_AUTO_RETRY_ENABLED` | `false` | Retry automatico solo dopo QA. |

## Guardrail

- Nessuna chiave provider in `NEXT_PUBLIC_*`.
- Nessun raw payload nel browser.
- Nessuna richiesta provider se ordine non `paid`.
- Nessuna richiesta provider se il price guard o cost guard è `blocked`.
- Nessuna modalità production senza approvazione Super Admin futura.
