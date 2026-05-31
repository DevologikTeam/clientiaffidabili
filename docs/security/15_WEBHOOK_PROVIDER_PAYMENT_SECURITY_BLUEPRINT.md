# Webhook, Provider & Payment Security Blueprint

## Obiettivo

Proteggere flussi economici e provider: pagamenti, rimborsi, subscription, wallet crediti e chiamate Openapi/provider.

## Webhook standard

Ogni webhook Stripe/PayPal deve avere:

- endpoint dedicato per provider;
- verifica firma prima del parsing business;
- salvataggio evento raw redatto/hashato;
- idempotency key/event id unique;
- stato `received`, `verified`, `processed`, `ignored`, `failed`, `replayed`;
- retry sicuro senza doppio credito/rimborso;
- reconciliation job se stato provider e stato interno divergono.

## Provider call guard

Una richiesta provider parte solo se:

1. ordine pagato o credito riservato;
2. prezzo/costo/margine snapshot presente;
3. uso lecito confermato;
4. idempotency key generata;
5. mapping servizio provider versionato;
6. feature flag provider attivo;
7. nessun blocco compliance sull'ordine.

## Refund/dispute safety

- rimborso automatico solo se provider non chiamato;
- rimborso dopo provider call richiede review manuale;
- report pubblicato/downloaded blocca rimborso automatico;
- dispute blocca rimborsi manuali paralleli;
- ogni rettifica economica aggiorna ledger append-only;
- wallet credits con reserve/consume/release/refund entries.

## Failure modes

| Caso | Comportamento |
|---|---|
| webhook firma non valida | 400, log redatto, no state change |
| webhook duplicato | 200 idempotente, no doppio effetto |
| payment paid ma provider failed | work item operations |
| refund provider ok ma internal failed | reconciliation queue P0 |
| provider timeout | retry solo se endpoint idempotente |
| provider cost changed | blocco/manual review se margine sotto soglia |
