# 27 — Payment webhook and reconciliation analysis

## Problema

Il redirect di checkout non e' sufficiente per considerare un pagamento valido. La piattaforma deve attendere webhook verificati, registrarli in modo idempotente e riconciliare ogni evento con ordine, subscription, invoice e wallet.

## Eventi minimi

### Stripe

- checkout session completed;
- payment succeeded/failed;
- invoice paid/payment_failed;
- subscription created/updated/deleted;
- charge refunded/dispute created.

### PayPal

- order approved/captured;
- payment capture completed/refunded/denied;
- subscription activated/suspended/cancelled/payment failed.

## Pipeline consigliata

1. ricezione webhook raw;
2. verifica firma provider;
3. salvataggio `PaymentWebhookEvent` con id provider;
4. idempotency check;
5. parsing evento normalizzato;
6. applicazione su ledger interno;
7. aggiornamento ordine/subscription/wallet;
8. eventuale creazione work item admin;
9. audit.

## Reconciliation queue

La coda admin deve mostrare:

- webhook non riconosciuti;
- eventi duplicati;
- pagamento confermato ma ordine non aggiornato;
- subscription attiva provider ma non interna;
- credito assegnato senza ledger completo;
- refund/dispute da gestire.

## Guardrail

- Webhook non verificato = nessun effetto economico.
- Evento duplicato = no-op auditato.
- Stato economico importante = ledger append-only.
- Correzione manuale = reason obbligatoria.
- Nessuna chiamata provider dati finche' entitlement non e' confermato internamente.
