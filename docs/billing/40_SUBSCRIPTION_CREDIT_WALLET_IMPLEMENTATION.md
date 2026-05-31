# 40 — Subscription & Credit Wallet Implementation

Sono stati introdotti `BillingSubscription`, `CreditWallet` e `CreditLedgerEntry`. Il wallet e' la fonte interna di verita' per crediti disponibili, prenotati e consumati.

## Piani MVP
- Starter: 3 crediti/mese.
- Pro: 10 crediti/mese.
- Agency: 30 crediti/mese.

Nessun piano e' illimitato. Ogni rinnovo genera una voce ledger `subscription_renewal`.
