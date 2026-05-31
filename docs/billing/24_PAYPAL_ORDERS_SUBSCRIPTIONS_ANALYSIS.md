# 24 — PayPal Orders/Subscriptions analysis

## Ruolo PayPal

PayPal e' consigliato come provider secondario, soprattutto per aumentare fiducia e conversione su clienti che preferiscono non inserire carta. Non deve pero' complicare subito il core economico del prodotto.

## Capacita' rilevanti

- Orders API per pagamenti singoli.
- Subscriptions API per piani e cicli ricorrenti.
- Piani attivabili/disattivabili.
- Billing cycles con trial e regular cycle.
- Webhook per eventi pagamento/subscription da riconciliare.

## Vantaggi

- Brand trust elevato lato utente.
- Utile per B2B piccoli e utenti non tecnici.
- Buon canale alternativo se Stripe fallisce o non e' preferito.

## Criticita'

- Doppia gestione provider aumenta QA e operativita'.
- Subscription lifecycle diverso da Stripe.
- Pricing e condizioni merchant devono essere verificati direttamente sul conto business.
- Non deve duplicare la fonte di verita' degli entitlement.

## Decisione

M4B-P deve progettare PayPal come adapter equivalente a Stripe, ma con rollout controllato:

1. contratto adapter pronto;
2. sandbox integrabile;
3. feature flag `ENABLE_PAYPAL_PAYMENTS=false` di default;
4. attivazione pubblica solo dopo test webhook, refund e subscription cancellation.

## Guardrail PayPal

- Non attivare UI PayPal in produzione finche' sandbox e riconciliazione non sono completate.
- Mappare piani PayPal in modo versionato come per Stripe.
- Non creare subscription interne senza conferma evento provider.
- Gestire cancellation/suspension come stato interno auditato.
