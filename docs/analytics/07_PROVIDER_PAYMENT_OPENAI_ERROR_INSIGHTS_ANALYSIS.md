# 07 — Provider, Payment and OpenAI Error Insights Analysis

## Obiettivo

Collegare analytics e operations senza confondere i due livelli.

Gli errori dettagliati vivono nell'Operational Error Ledger. La dashboard growth deve mostrare aggregati e impatto business.

## Errori da aggregare

- payment session creation failed;
- webhook signature invalid;
- webhook duplicate;
- payment failed;
- refund failed;
- provider disabled;
- provider timeout;
- provider paid error;
- Openapi mapping missing;
- OpenAI disabled by admin;
- OpenAI budget exceeded;
- email delivery failed;
- CMS publish blocked;
- checkout blocked by kill switch.

## Collegamenti operativi

Ogni errore può generare:

- retry;
- rimborso;
- ticket;
- escalation;
- fix tecnico;
- blocco temporaneo acquisti;
- revisione settings.

## Insight utili

- errori per provider;
- errori per servizio;
- costo stimato perso;
- ordini impattati;
- rimborsi collegati;
- tempo medio di risoluzione;
- errori ricorrenti negli ultimi 7/30 giorni.

## Guardrail

Non mostrare stack trace o raw payload in dashboard growth. Usare error code normalizzati, severity e status operativo.
