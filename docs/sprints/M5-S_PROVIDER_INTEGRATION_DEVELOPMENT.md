# M5-S — Provider Integration Development

## Obiettivo

Implementare il primo runtime provider **Openapi-first / mock-safe**, collegato al ciclo ordine → pagamento → check → richiesta provider. Lo sprint sviluppa la base tecnica per eseguire richieste solo dopo pagamento confermato, registrare costi, normalizzare risposte e mettere in coda le review operative.

## Ambito sviluppato

- Entity TypeORM runtime per `ProviderRequest`, `ProviderRequestEvent`, `ProviderCostLedgerEntry`, `ProviderRawPayloadVault`.
- Adapter `OpenapiAdapterService` con modalità mock, sandbox-ready e produzione bloccata per mapping non certificati.
- `ProviderRuntimeService` per dispatch post-payment, validazione input, cost guard, idempotenza e normalizzazione.
- Callback controller idempotency-ready con firma `OPENAPI_CALLBACK_SECRET`.
- Admin provider queue lato API e pagina interna `/admin/provider` lato web.
- Integrazione `ChecksService`: una verifica può partire solo dopo ordine pagato.
- QA antiregressione dedicato.

## Decisioni senior architect

1. **Nessuna chiamata provider prima del pagamento**: `ChecksService` blocca ordini non pagati e `ProviderRuntimeService` richiede `paymentConfirmedAt`.
2. **Idempotenza obbligatoria**: chiave stabile `provider:{provider}:order:{orderId}:check:{checkId}:product:{productCode}:mapping:{version}`.
3. **Costo congelato**: il costo stimato del mapping viene salvato in `providerCostSnapshotCents` e nel ledger.
4. **Raw payload non cliente**: payload ricevuti/simulati finiscono in vault redatto, mai nel report pubblico.
5. **Produzione disabilitata**: `enabledInProduction` resta `false` nei mapping MVP fino a verifica contrattuale e tecnica.
6. **Review per servizi sensibili**: KYB, bilanci e servizi ad alta variabilità possono restare `requires_review` anche dopo risposta provider.

## Esclusioni

- Chiamate reali a Openapi non abilitate.
- Polling job schedulato non ancora implementato.
- Report composer finale non ancora implementato: sarà M6.
- Cifratura applicativa del vault non ancora implementata; per ora vault redatto + DB security baseline.

## Esito

Sprint completato come runtime foundation. Pronto per M6-A Report Composer Analysis.
