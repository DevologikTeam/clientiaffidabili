# Provider request lifecycle blueprint

## Lifecycle end-to-end

1. Cliente sceglie prodotto.
2. Checkout crea ordine con price snapshot.
3. Pagamento confermato via webhook idempotente.
4. Order status diventa `paid`.
5. Worker post-payment crea `ProviderRequest` solo se non esiste già idempotency key.
6. Cost guard verifica costo massimo e margine residuo.
7. Provider request va in `queued`.
8. Adapter invia richiesta o usa mock controllato.
9. Risposta sync/callback/polling aggiorna stato.
10. Normalizer produce evidenze comuni.
11. Report composer M6 usa evidenze normalizzate.

## Idempotency key

Formato consigliato:

```text
provider:{providerName}:order:{orderId}:check:{checkId}:product:{productCode}:mapping:{mappingVersion}
```

La chiave deve essere persistita prima dell'invio. Se una richiesta viene rilanciata dopo timeout, il sistema deve recuperare la richiesta esistente invece di crearne una nuova.

## Worker post-payment

Il worker M5-S deve consumare un evento interno:

```json
{
  "type": "order.payment_confirmed",
  "orderId": "...",
  "paymentId": "...",
  "occurredAt": "..."
}
```

Prima azione del worker: lock transazionale su ordine/check per evitare doppio dispatch.

## Cost guard

Blocca l'invio se:

- mapping non abilitato in ambiente corrente;
- costo stimato supera `maxAcceptedCostCents`;
- margine ordine sotto soglia;
- prodotto richiede review prima della chiamata;
- input obbligatori mancanti o ambigui.

## Retry policy

| Policy | Uso | Regola |
|---|---|---|
| `never` | servizi paid/costosi | solo manual review. |
| `safe_once` | timeout senza provider id | 1 retry con stessa idempotency key. |
| `safe_exponential` | rate limit/503 non paid | massimo 3 tentativi. |
| `manual_only` | compliance/KYB | operatore decide. |

## Stati cliente

Il cliente non vede dettagli provider. Vede solo:

- pagamento ricevuto;
- verifica in preparazione;
- dati in elaborazione;
- report pronto;
- verifica richiede controllo operativo;
- impossibile completare, supporto attivato.
