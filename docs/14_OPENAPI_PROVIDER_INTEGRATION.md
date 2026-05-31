# Integrazione Openapi — disegno tecnico

## Principi

- Openapi deve essere chiamata solo dal backend.
- Le credenziali devono vivere in Coolify/env secrets.
- Ogni chiamata deve generare audit e cost tracking.
- Le risposte provider devono essere normalizzate prima di arrivare al frontend.

## Adapter

`OpenapiAdapterService` deve gestire:

- autenticazione OAuth/token;
- cache token;
- request standard;
- callback verification;
- polling fallback;
- error mapping;
- provider cost metadata.

## Normalizzazione

Ogni risultato deve essere trasformato in:

```ts
{
  "riskLevel": "low|medium|high|unknown",
  "summary": "string",
  "redFlags": [],
  "evidences": [],
  "rawProviderReference": "string",
  "sourceTimestamp": "ISO date"
}
```

## Mock provider

Finché `ENABLE_PROVIDER_CALLS=false`, il sistema deve usare fixture realistiche ma chiaramente isolate.

## Errori

| Errore provider | Stato interno | Messaggio utente |
|---|---|---|
| timeout | waiting_callback | La verifica richiede più tempo |
| not found | completed | Nessun soggetto trovato con i dati inseriti |
| auth failed | failed | Servizio temporaneamente non disponibile |
| rate limit | queued | Verifica in coda, riproviamo automaticamente |
| invalid input | failed | Controlla i dati inseriti |

## Callback

La callback deve:

- verificare firma/segreto;
- cercare richiesta provider;
- ignorare duplicati;
- salvare payload raw in area protetta;
- normalizzare;
- completare check;
- generare report;
- notificare utente.
