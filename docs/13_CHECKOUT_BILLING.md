# Checkout e billing

## Provider MVP

Provider principale: Stripe Checkout.

Motivo:

- riduce complessità PCI;
- supporta pagamenti una tantum e subscription;
- gestisce redirect, sessioni, webhook;
- consente sconti/coupon in fase successiva.

## Flusso

```mermaid
sequenceDiagram
  participant U as Utente
  participant W as Web
  participant A as API
  participant S as Stripe
  participant DB as PostgreSQL

  U->>W: seleziona servizio
  W->>A: POST /orders
  A->>DB: crea ordine pending_payment
  W->>A: POST /billing/checkout-session
  A->>S: crea checkout session
  A->>DB: salva checkoutSessionId
  A-->>W: checkoutUrl
  W-->>U: redirect Stripe
  S->>A: webhook checkout.session.completed
  A->>DB: ordine paid
  A->>DB: crea check queued
```

## Idempotenza

- Ogni ordine ha `checkoutSessionId` unico.
- Ogni webhook deve essere gestito una sola volta.
- Se Stripe invia webhook duplicato, non creare doppio check.

## Sicurezza

- Verificare sempre firma webhook.
- Non fidarsi di `success_url` frontend come prova pagamento.
- Abilitare verifica provider solo dopo webhook valido.

## Nexi/Mollie

Non implementare nel primo sprint di sviluppo. Creare solo interfaccia adapter:

```ts
interface BillingProviderAdapter {
  createCheckoutSession(order: Order): Promise<{ checkoutUrl: string; externalId: string }>;
  verifyWebhook(rawBody: Buffer, signature: string): Promise<BillingEvent>;
}
```
