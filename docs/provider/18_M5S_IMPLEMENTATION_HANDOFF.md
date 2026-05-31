# M5-S implementation handoff

## Priorità sviluppo

1. Implementare tipi e interfaccia `ProviderAdapter`.
2. Implementare entity TypeORM provider request/event/cost ledger.
3. Implementare registry mapping MVP statico.
4. Implementare worker post-payment mock-safe.
5. Collegare provider request a order/check.
6. Implementare idempotency key unique.
7. Implementare callback endpoint idempotente.
8. Implementare polling scheduler placeholder.
9. Implementare normalizer MVP.
10. Implementare admin provider queue read-only.

## Sequenza consigliata

### Step 1 — infrastruttura sicura

- Entities.
- Migration/schema sync in dev.
- Service `ProviderRequestService`.
- Event ledger append-only.
- QA statico.

### Step 2 — mock provider controllato

- Mock adapter con mapping registry.
- Nessuna chiamata esterna.
- Simulazione success/failure/requires_review.
- Collegamento a check/order.

### Step 3 — Openapi-ready

- Config service e base URL.
- Client HTTP isolato.
- Payload builder per 1 servizio pilota.
- Feature flag sempre off in default.

### Step 4 — operations

- Admin provider queue.
- Retry manuale safe.
- Event timeline.
- Cost ledger view.

## Definition of done M5-S

- QA provider development passed.
- Nessuna chiamata provider se flag off.
- Nessuna credenziale nel frontend.
- Idempotency test statico presente.
- Admin queue mostra stato e azione sicura.
- Provider request non parte senza pagamento `paid`.
- Raw payload non raggiungibile da API pubblica.
- Changelog, release notes e roadmap aggiornati.

## Rischi residui

- Endpoint ufficiali e payload Openapi devono essere verificati prima di produzione.
- Costi reali possono variare rispetto a listino pubblico/abbonamento.
- Alcuni servizi possono essere asincroni/manuali più di quanto il sito pubblico lasci intendere.
- KYB/AML richiede policy legale e copy molto prudente.
