# 22 — Buyer IP Audit Blueprint

## Obiettivo

Salvare l'IP degli utenti che acquistano per antifrode, sicurezza, supporto e analisi di anomalie, rispettando minimizzazione, access control e retention.

## Momenti di raccolta

- creazione checkout session;
- pagamento confermato;
- rimborso richiesto;
- dispute/chargeback;
- accesso download report;
- consumo API partner.

## Modalita' dati

Per default salvare:

- `buyerIpHash`;
- `buyerIpPrefix` opzionale per troubleshooting;
- user agent redatto;
- country/ASN solo se disponibile senza arricchimento invasivo;
- timestamp;
- linked order/payment/customer.

L'IP pieno deve essere evitato salvo necessita' legale/security e comunque access-controlled.

## UI admin

La UI mostra:

- stato: IP registrato / non disponibile;
- indicatore di coerenza geografica solo se presente;
- hash o prefisso redatto;
- motivazione della raccolta.

Non mostra IP completo nelle liste.
