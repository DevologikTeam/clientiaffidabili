# 04 — Support Operations Analysis

## Tipologie ticket MVP

| Categoria | Esempi | Owner suggerito |
|---|---|---|
| Account/accesso | login, team, inviti, password | Support |
| Checkout/pagamenti | pagamento fallito, ricevuta, pagamento doppio | Billing |
| Fatture/rimborsi | dati fiscali, nota credito, rimborso | Billing |
| Report | report non disponibile, dato da chiarire | Operations/Analyst |
| Provider/API | stato richiesta, errore provider | Operations |
| Partner/API | API key, sandbox, rate limit | Partner Ops |
| Compliance | uso non consentito, richiesta sospetta | Compliance |

## Stati ticket

- `new`
- `triage`
- `waiting_customer`
- `waiting_internal`
- `escalated`
- `resolved`
- `closed`
- `blocked`

## Priorità

| Priorità | Quando usarla |
|---|---|
| P0 | pagamento/provider/report bloccante, rischio legale/compliance |
| P1 | cliente pagante fermo o problema su report/fattura |
| P2 | richiesta ordinaria supporto o chiarimento |
| P3 | domanda commerciale non urgente o miglioramento |

## Collegamenti richiesti

Ogni ticket può collegarsi a:

- account cliente;
- lead;
- ordine;
- pagamento;
- fattura;
- rimborso;
- report;
- provider request;
- partner account/API key;
- pagina sorgente.

## Template risposta MVP

Servono template prudenti per:

- richiesta informazioni;
- richiesta demo;
- report in lavorazione;
- report pubblicato;
- pagamento fallito;
- rimborso in valutazione;
- richiesta fuori perimetro;
- uso non consentito;
- partner sandbox ricevuto.

## Escalation

Un ticket deve passare in escalation se:

- coinvolge rimborso/dispute;
- coinvolge dati errati in report;
- richiede chiamata provider manuale;
- ha possibile rischio privacy/compliance;
- arriva da partner con volumi elevati;
- supera SLA interno.

## Decisione MVP

Implementare supporto come modulo integrato con Admin Operations, non come helpdesk separato. Le code operative devono mostrare ticket, lead caldi e follow-up in un'unica vista prioritaria.
