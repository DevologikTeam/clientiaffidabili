# M5-P — Provider Integration Design

## Obiettivo sprint

Trasformare l'analisi M5-A in un blueprint tecnico-operativo pronto per lo sviluppo M5-S. Il modulo deve consentire a ClientiAffidabili.it di invocare servizi dati esterni in modo controllato, misurabile, idempotente e compatibile con il modello di business basato su checkout prima della richiesta provider.

La direzione resta **Openapi-first**, ma non hard-coded su un singolo fornitore: il dominio pubblico vende verifiche e report, non endpoint grezzi. Il backend traduce il prodotto acquistato in una o più chiamate provider, normalizza le risposte e produce evidenze leggibili.

## Decisioni di design

1. **Provider call solo post-payment**: lo sviluppo M5-S dovrà avviare la richiesta provider solo dopo ordine pagato e webhook di pagamento idempotente.
2. **Adapter contract-first**: ogni provider implementa `ProviderAdapter`, mentre business logic, order state e report non dipendono da Openapi direttamente.
3. **Mapping versionato**: il prodotto pubblico usa `productCode`; il provider usa `providerServiceCode`; il collegamento è nel registry versionato.
4. **Cost snapshot obbligatorio**: prima della chiamata viene congelato il costo stimato/massimo per proteggere margine e audit.
5. **Raw payload protetto**: le risposte complete provider non sono mai esposte al cliente, ma possono essere conservate in vault cifrato/accessibile solo internamente.
6. **Normalizzazione prima del report**: l'output cliente usa DTO normalizzati con fonte, data, limiti e sensibilità dato.
7. **Retry conservativo**: retry automatico solo per errori tecnici safe/idempotenti; errori pagati o ambigui vanno in manual review.
8. **Admin provider queue**: ogni richiesta bloccata deve avere motivo, impatto, azione sicura e stato operativo.

## Scope incluso

- Blueprint `ProviderAdapter`.
- Blueprint entità `ProviderRequest`, `ProviderRequestEvent`, `ProviderCostLedger`, `ProviderRawPayloadVault`.
- Blueprint registry mapping servizi MVP.
- Blueprint lifecycle richiesta provider.
- Blueprint callback/polling.
- Blueprint normalizzazione DTO/evidenze.
- Blueprint security, secrets, raw payload vault e audit.
- Blueprint admin operations.
- Handoff tecnico M5-S.

## Scope escluso

- Chiamate reali a Openapi.
- Credential setup produzione.
- Report composer finale, che resta in M6.
- Automazioni di rimborso avanzate.
- Contratti commerciali provider.

## Gate per considerare M5-P completato

- [x] Adapter contract progettato.
- [x] Data model provider progettato.
- [x] Mapping registry MVP progettato.
- [x] Request lifecycle disegnato end-to-end.
- [x] Callback/polling disegnati con idempotenza.
- [x] DTO/evidence model normalizzato progettato.
- [x] Admin operations provider progettate.
- [x] Raw payload vault e security blueprint definiti.
- [x] QA statico M5-P eseguito.

## Handoff M5-S

Lo sviluppo M5-S dovrà implementare prima mock/provider adapter e queue locale, poi integrare la modalità Openapi-ready dietro feature flag. Nessuna modalità produzione deve essere abilitata senza credenziali, ambiente, endpoint e policy di addebito verificati.
