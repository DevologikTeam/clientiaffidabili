# 08 — Provider API E2E Readiness Analysis

## Ambito
Il provider Openapi e' il primo provider previsto, ma la produzione e' bloccata finche' non sono validate credenziali, endpoint, costi effettivi, addebiti e contratti.

## Test richiesti
- mapping servizio pubblico → provider operation;
- idempotency key persistente;
- costo provider snapshot prima della richiesta;
- retry sicuro solo su errori non addebitanti;
- raw payload salvato/redatto in vault;
- normalizzazione DTO;
- report composer da dati normalizzati;
- admin manual review su payload incompleto/ambiguo;
- provider disabled in production se flag non esplicito.

## Errori da simulare
- timeout;
- 401/403 credenziali;
- 429 rate limit;
- 5xx provider;
- payload incompleto;
- provider response success ma report non componibile;
- doppio callback;
- costo provider superiore allo snapshot previsto.

## Produzione
Prima del go-live reale vanno confermati:

- contratto provider;
- ambiente sandbox/live;
- prezzi effettivi e sconti;
- limiti rate;
- condizioni rimborso/addebito;
- SLA e tempi reali;
- trattamento dati e ruoli privacy.
