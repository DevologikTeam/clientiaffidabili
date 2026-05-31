# 23 — Stripe Checkout/Billing analysis

## Capacita' rilevanti

Stripe Checkout supporta pagamenti una tantum e abbonamenti tramite Checkout Sessions. La modalita' hosted e' coerente con il progetto perche' riduce complessita' UI, gestione PCI e manutenzione iniziale.

Funzioni utili per ClientiAffidabili.it:

- `mode=payment` per report one-shot;
- `mode=subscription` per piani mensili/annuali;
- hosted checkout page;
- promozioni/coupon future;
- salvataggio metodo pagamento per rinnovi;
- webhook per `checkout.session.completed`, invoice/payment succeeded/failed e subscription lifecycle;
- Customer Portal futuro per gestione self-service.

## Vantaggi

- Bassa complessita' MVP.
- Buona documentazione e tooling.
- Forte supporto subscription.
- Possibilita' futura di Stripe Billing, Tax e Invoicing.
- Migliore scelta come provider primario.

## Criticita'

- Fee da includere nel margine.
- Serve riconciliazione webhook.
- Serve gestione corretta SCA, failed payment, retry, cancellation.
- Dati fiscali e fatturazione elettronica italiana possono richiedere integrazione separata.

## Uso consigliato

| Caso | Stripe object | Stato interno |
|---|---|---|
| Report singolo | Checkout Session payment | Order paid -> provider request allowed |
| Pacchetto crediti | Checkout Session payment | CreditWallet top-up |
| Abbonamento mensile | Checkout Session subscription | CustomerSubscription active + credit grant |
| Rinnovo | Invoice/payment events | credit grant periodico |
| Mancato pagamento | invoice/payment_failed | grace/paused/past_due |

## Guardrail Stripe

- Non fidarsi del redirect success come pagamento definitivo: attendere webhook verificato.
- Salvare `stripeSessionId`, `stripeCustomerId`, `stripeSubscriptionId` solo backend.
- Idempotenza per ogni webhook event.
- Mapping piano Stripe -> `SubscriptionPlan` interno versionato.
- Nessun entitlement attivo senza evento pagamento confermato.
