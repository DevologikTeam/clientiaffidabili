# Provider admin queue — Implementation

## API

```http
GET /provider/admin/queue
```

Restituisce le ultime richieste provider con stato, costo riservato, tentativi e prossima azione.

## UI

La pagina interna `/admin/provider` mostra:

- totale richieste;
- richieste in review;
- costo provider riservato;
- tabella operativa con prossima azione;
- warning su produzione bloccata.

## Principio UX

La queue è interna: non usa linguaggio marketing e non espone payload. Deve aiutare support/admin a capire cosa fare senza rendere automatiche azioni rischiose.
