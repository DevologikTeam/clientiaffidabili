# M4B-A — Payment source notes

## Stripe

Fonti ufficiali consultate:

- Stripe Checkout documentation: conferma uso di Checkout Sessions API, pagamento una tantum e subscription, con opzione hosted/embedded.
- Stripe pricing Italy: indica tariffe standard pubbliche per carte standard SEE e carte UK, da considerare nel modello margine.

Implicazioni:

- Stripe e' il provider primario consigliato perche' riduce il carico PCI e supporta sia one-shot sia recurring.
- Le fee devono essere incluse nel `PaymentCostSnapshot`.
- Il redirect success non basta: serve webhook verificato.

## PayPal

Fonti ufficiali consultate:

- PayPal Subscriptions API: piani attivi, billing cycles, trial/regular cycle e update pricing.
- PayPal Orders API: riferimento per pagamenti singoli, da approfondire nel design tecnico M4B-P.

Implicazioni:

- PayPal e' utile come secondo provider per conversione e fiducia.
- La subscription PayPal ha lifecycle e concetti diversi da Stripe, quindi serve normalizzazione interna.
- PayPal deve essere feature-flagged finche' webhook e sandbox non sono testati.

## Nota

Le commissioni PayPal variano per paese, tipo transazione e contratto merchant. Prima della produzione serve verifica sul conto PayPal Business reale.
