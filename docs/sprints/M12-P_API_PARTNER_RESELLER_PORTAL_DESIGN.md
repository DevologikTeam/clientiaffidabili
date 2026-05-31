# M12-P — API Partner & Reseller Portal Design

## Obiettivo sprint
Trasformare l'analisi M12-A in un blueprint operativo pronto per lo sviluppo del portale partner/reseller e delle API pubbliche controllate di ClientiAffidabili.it.

Il portale partner non deve essere una copia tecnica del marketplace provider: deve essere una superficie commerciale e operativa sicura, progettata per partner selezionati, software house, consulenti, agenzie e reseller che vogliono integrare verifiche di affidabilita nei propri flussi.

## Decisione prodotto
Il modello scelto e' **partner portal controllato, sandbox-first, produzione solo su approvazione**.

Non si abilita la produzione automaticamente dopo la registrazione. Ogni partner deve completare onboarding, profilo aziendale, use case, accettazioni legali, configurazione webhook/IP allowlist e verifica operativa prima di ottenere API key live.

## Principi bloccanti
- API key sempre hashate a riposo.
- Ambiente sandbox separato dall'ambiente live.
- Scope granulari per servizio e azione.
- Rate limit per account, API key, endpoint e servizio.
- `Idempotency-Key` obbligatoria per richieste costose o provider-backed.
- Credit wallet/entitlement verificato prima di consumare provider.
- Usage ledger append-only.
- Webhook partner firmati.
- Nessun raw payload provider esposto.
- Produzione live solo dopo review interna.
- Reseller margin guard obbligatorio.

## Esperienza progettata
1. Partner richiede accesso.
2. Compila profilo aziendale e use case.
3. Accede alla sandbox.
4. Genera API key sandbox con scope limitati.
5. Consulta documentazione e prova endpoint.
6. Configura webhook firmati.
7. Chiede abilitazione live.
8. Operations approva o richiede integrazioni/correzioni.
9. Partner usa API live con crediti/abbonamento/rate limit.
10. Partner monitora usage, errori, costi e ledger.

## Output sprint
- Blueprint UX portale partner.
- Blueprint API key sandbox/live.
- Contratti API partner.
- Modello usage ledger/credit billing.
- Rate limit, idempotenza e webhook design.
- Reseller pricing e revenue share policy.
- Developer docs/OpenAPI blueprint.
- Admin operations partner.
- Handoff sviluppo M12-S.

## Definition of Done
- Ogni flusso partner ha stato, prossimo passo e motivazione.
- Ogni azione rischiosa ha guardrail e audit.
- API live e sandbox sono separate.
- Il blueprint non espone segreti, raw payload o dettagli provider non necessari.
- QA statico M12-P passa.
