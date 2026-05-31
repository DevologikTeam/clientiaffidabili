# Payment Provider Abstraction Blueprint

## Principio

Il dominio billing non deve dipendere direttamente da Stripe o PayPal. Deve parlare con un adapter normalizzato che espone azioni comuni e riceve eventi provider riconciliabili.

## Provider supportati

| Provider | Stato MVP | Uso |
|---|---|---|
| `mock` | attivo in dev/staging | QA, demo tecnica, sviluppo offline |
| `stripe` | primario da implementare | one-shot, subscription, customer portal futuro |
| `paypal` | feature-flagged | one-shot e subscription come alternativa conversione |

## Interfaccia concettuale

```ts
interface PaymentProviderAdapter {
  createOneShotCheckout(input): Promise<ProviderCheckoutSession>;
  createSubscriptionCheckout(input): Promise<ProviderCheckoutSession>;
  createRefund(input): Promise<ProviderRefundResult>;
  cancelSubscription(input): Promise<ProviderSubscriptionResult>;
  suspendSubscription?(input): Promise<ProviderSubscriptionResult>;
  resumeSubscription?(input): Promise<ProviderSubscriptionResult>;
  parseWebhook(rawBody, headers): Promise<ProviderWebhookEvent>;
}
```

## Regole

- Nessun dato carta passa dal frontend o dal backend applicativo.
- Provider secrets solo backend/Coolify secrets.
- Ogni chiamata provider deve avere idempotency key interna.
- Ogni provider event viene salvato raw/redacted e poi normalizzato.
- Il provider non e' source of truth per i crediti consumabili: lo e' il ledger interno.

## Stato normalizzato checkout

| Stato interno | Stripe | PayPal | Significato |
|---|---|---|---|
| `pending` | checkout created | order/subscription created | Utente non ha ancora completato |
| `requires_action` | action required | approval pending | Serve azione utente |
| `paid` | payment succeeded | capture completed | Pagamento valido |
| `failed` | payment failed | capture denied/failed | Pagamento non valido |
| `expired` | session expired | order expired | Sessione non piu' usabile |
| `refunded` | refund succeeded/full | capture refunded/full | Importo rimborsato totalmente |
| `partially_refunded` | partial refund | partial capture refund | Importo rimborsato parzialmente |
| `disputed` | dispute opened | dispute/claim | Contestazione aperta |

## Estensioni future

- Bonifico assistito.
- Nexi/Mollie come adapter locali.
- Stripe Customer Portal.
- PayPal advanced card payments se utile.
