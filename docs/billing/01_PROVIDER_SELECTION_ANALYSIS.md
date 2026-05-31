# Provider checkout — analisi e decisione

## Obiettivo

Scegliere il provider iniziale per incassare acquisti singoli e preparare il terreno per monitoraggi ricorrenti.

## Candidati

| Provider | Pro | Contro | Decisione |
|---|---|---|---|
| Stripe Checkout | Hosted checkout maturo, webhooks, pagamento singolo/ricorrente, ottima documentazione, supporto metodi dinamici | Commissioni non trascurabili sui ticket bassi; fatturazione italiana da integrare a parte | **MVP first** |
| Nexi XPay | Forte presenza italiana, percezione locale | Maggiore complessità di onboarding/integrazione; meno flessibile per iterazione SaaS | Adapter futuro |
| PayPal | Fiducia consumer/PMI, wallet noto | Non deve diventare checkout primario B2B; riconciliazione e dispute da gestire | Add-on futuro |
| Mollie | Buona alternativa EU, metodi locali | Verificare fit Italia/B2B e fiscalità | Adapter futuro |
| Bonifico manuale | Utile per clienti enterprise/PA | Non immediato, alta gestione operativa | Solo assistito |

## Decisione

Per il primo rilascio si usa **Stripe Checkout hosted**. Il dominio applicativo non deve conoscere Stripe direttamente nelle entity principali: Stripe resta dietro un `PaymentProviderAdapter`.

## Adapter interface proposta

```ts
interface PaymentProviderAdapter {
  provider: 'stripe' | 'nexi' | 'paypal' | 'mollie' | 'manual_bank_transfer';
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult>;
  parseWebhook(payload: RawWebhookPayload): Promise<PaymentWebhookEvent>;
  refundPayment(input: RefundPaymentInput): Promise<RefundResult>;
}
```

## Scelta UX

- Checkout pubblico guidato sul sito.
- Redirect su pagina hosted provider per pagamento.
- Ritorno su `/checkout/success?order=...` o `/checkout/cancel?order=...`.
- Stato reale confermato solo da webhook, non dal redirect.

## Regola architetturale

Il frontend non crea mai direttamente una sessione provider. Chiama solo l'API backend `POST /checkout/session`, che valida prodotto, prezzo, cliente, guardrail e uso lecito.
