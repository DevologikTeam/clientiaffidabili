# Tag Manager & Clarity Roadmap QA

Versione: **0.59.1**

## QA statici

Il nuovo modulo M16B deve introdurre controlli automatici per impedire rilasci ZIP con tracking pericoloso o configurazioni incoerenti.

## Controlli minimi

- Esistenza roadmap M16B.
- Presenza settings GTM e Clarity.
- Presenza lista eventi ammessi.
- Presenza lista eventi/dati vietati.
- Clarity esclusa da admin, dashboard report, fatture, checkout e API per default.
- Tag Manager caricato solo se enabled.
- Consent mode previsto con default denied.
- Nessun evento contiene PII nel blueprint.
- `qa-source-syntax-smoke` passato.

## Gate prima della RC

Prima della RC:

- verificare in staging che `dataLayer` riceva eventi attesi;
- verificare che Clarity non registri pagine escluse;
- verificare che il banner consenso aggiorni Tag Manager/Clarity;
- verificare che marketing tags non partano senza consenso;
- verificare che non vengano inviati email/telefono/cf/iban/api key/token nei payload;
- documentare configurazione GTM/Clarity nel manuale admin;
- aggiornare privacy/cookie policy.
