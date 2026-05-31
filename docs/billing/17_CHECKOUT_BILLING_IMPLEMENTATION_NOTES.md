# Checkout & Billing — Implementation Notes

## Flusso runtime

1. Il cliente seleziona un servizio dal catalogo.
2. Il backend crea l'ordine con price snapshot e price guard.
3. Il checkout raccoglie dati verifica, billing profile e conferme di uso lecito.
4. `POST /billing/checkout-session` crea una sessione hosted tramite adapter.
5. Il cliente paga sul provider esterno.
6. Il webhook `checkout.session.completed` viene normalizzato.
7. Il sistema verifica idempotenza e firma.
8. Vengono creati payment, ledger entry e invoice pending.
9. L'ordine passa a `paid`.
10. Solo da qui può partire la richiesta al provider dati.

## Adapter provider

`PaymentProviderAdapter` nasconde le differenze tra provider e restituisce un contratto stabile:

- `provider`
- `externalId`
- `checkoutUrl`
- `requestPayload`
- `responsePayload`
- `expiresAt`

La modalità mock evita integrazioni reali in sviluppo. Stripe è pronto per sessioni hosted ma va certificato in test mode.

## Idempotenza

La tabella `payment_webhook_events` ha indice unico `provider + eventId`.

Se un evento già processato arriva di nuovo:

- non crea un nuovo payment;
- non crea una nuova invoice;
- non modifica due volte l'ordine;
- risponde come ricevuto ma non processato di nuovo.

## Ledger

`payment_ledger_entries` è append-only e registra:

- creazione sessione checkout;
- webhook ignorati;
- pagamento riuscito;
- fattura pending;
- futuri rimborsi/dispute.

## Limiti noti

- La firma Stripe reale richiede raw body middleware dedicato.
- La fatturazione elettronica non è ancora integrata.
- Non c'è ancora job queue per riconciliazione periodica provider.
- Non c'è ancora pannello admin protetto da RBAC reale.
