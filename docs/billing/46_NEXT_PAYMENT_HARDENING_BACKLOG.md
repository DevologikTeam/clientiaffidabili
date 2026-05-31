# 46 — Next Payment Hardening Backlog

## Prossimi step tecnici
1. Collegare Stripe reale in sandbox con webhook firmati.
2. Collegare PayPal sandbox con Orders, Subscriptions e webhook.
3. Implementare Stripe Customer Portal o portale interno equivalente.
4. Eseguire test e2e su acquisto, rinnovo, rimborso parziale, cancellazione e dispute mock.
5. Collegare fatturazione elettronica/manual-assisted al ledger.

## Gate produzione
Nessun provider pagamento reale va attivato senza test webhook, riconciliazione ledger, audit e procedure rimborso documentate.
