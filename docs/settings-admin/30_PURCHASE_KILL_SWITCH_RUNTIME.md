# Purchase Kill Switch Runtime

Il kill switch usa la setting `commerce.purchases.enabled`.

## Enforcement MVP
Il controllo e' integrato in `BillingService.createCheckoutSession()` prima della creazione sessione pagamento.

## Regola
- Se `purchases.enabled=false`, il backend restituisce errore e messaggio cliente.
- Gli ordini gia' pagati continuano provider/report/fatturazione.
- Le modifiche richiedono reason e finiscono in audit.

## Prossime estensioni
- Bloccare anche subscription checkout, credit pack checkout e partner API purchase.
- Esposizione banner frontend commerciale.
- Notifica admin quando il kill switch resta attivo oltre una finestra configurata.
