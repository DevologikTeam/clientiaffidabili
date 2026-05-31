# M18-S — Email & Customer Notifications Development

## Obiettivo

Implementare il runtime MVP per le email tecniche cliente/admin, evitando invii diretti non tracciati e preparando provider reali tramite adapter.

## Ambito implementato

- modulo NestJS `EmailNotificationsModule`;
- template registry e renderer;
- delivery ledger;
- event ledger;
- suppression list;
- secure link per PDF/report;
- provider adapter mock-first;
- webhook provider email;
- admin monitor web;
- QA statico dedicato.

## Decisione runtime

Il sistema email e event-driven:

```text
Evento business → EmailEvent → EmailDelivery → Provider adapter → Webhook provider → Stato aggiornato
```

Nessun controller business deve inviare email direttamente.

## Esito

Sprint completato come scaffold runtime. Le integrazioni provider reali, DNS SPF/DKIM/DMARC e invii reali restano gate sandbox/produzione.
