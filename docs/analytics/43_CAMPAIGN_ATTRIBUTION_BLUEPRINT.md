# 43 — Campaign Attribution Blueprint

## UTM capture

Il sistema deve salvare attribution snapshot interno quando un utente arriva con parametri:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- `gclid`/`gbraid`/`wbraid` se presenti;
- referrer pubblico;
- landing page.

## Privacy

Gli UTM vengono sanitizzati:

- lunghezza massima;
- caratteri ammessi;
- rimozione email/telefono/token;
- nessun dato sensibile libero.

## Modello attribution

MVP:

- first-touch;
- last-touch;
- content-assist;
- conversion-touch.

## Collegamenti business

Attribution interna puo' collegarsi a:

- lead;
- contact message;
- checkout session;
- ordine;
- report;
- subscription;
- partner application.

## Export esterno

Verso GTM passano solo campi redatti e aggregati. Il valore economico puntuale e' opzionale e da approvare; default consigliato: `value_bucket`.
