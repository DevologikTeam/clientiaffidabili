# Incident Response & Data Breach Runbook Blueprint

## Obiettivo

Definire un flusso pratico per incidenti tecnici, economici, provider e privacy.

## Severita'

| Severita' | Esempi | Azione |
|---|---|---|
| P0 | data breach, secret leak, accesso report altrui, doppio addebito massivo | blocco release, war room, owner immediato |
| P1 | webhook failure esteso, provider cost mismatch, backup fallito | triage entro giornata |
| P2 | errore singolo report, ticket cliente, retry provider manuale | operations queue |
| P3 | bug UI non bloccante, copy, miglioramento | backlog |

## Runbook P0 sintetico

1. aprire incidente con timestamp e owner;
2. contenere: disabilitare provider/payment se serve, revocare secret, bloccare download/report;
3. preservare evidenze: audit, log redatti, webhook ids, request ids;
4. valutare impatto: dati coinvolti, utenti, tempi, rischio diritti/liberta';
5. notificare stakeholder interni;
6. valutare comunicazione autorita'/interessati con consulente privacy/legal;
7. fix, test, deploy, monitoraggio;
8. postmortem con azioni preventive.

## Data breach decision record

Ogni possibile data breach deve avere:

- categoria dati;
- numero interessati stimato;
- causa radice;
- misure di contenimento;
- rischio stimato;
- decisione su notifica autorita'/interessati;
- responsabile decisione;
- timestamp.

## Template comunicazioni

Il testo legale finale va validato in M10/legal review. M9-P prepara solo struttura, non consulenza legale definitiva.
