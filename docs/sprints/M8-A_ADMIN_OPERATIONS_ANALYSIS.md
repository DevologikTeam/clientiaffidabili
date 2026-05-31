# M8-A — Admin Operations Analysis

## Obiettivo

Analizzare il pannello operativo interno di **ClientiAffidabili.it** prima della progettazione e dello sviluppo. Il modulo Admin Operations deve consentire al team interno di governare ordini, pagamenti, richieste provider, report, supporto, audit e anomalie senza esporre complessità tecniche al cliente.

## Contesto prodotto

Gli sprint precedenti hanno creato il funnel pubblico, il catalogo con price guard, checkout/billing, runtime provider, report composer e dashboard cliente. Manca ora una superficie interna unica per gestire il ciclo operativo end-to-end:

1. acquisto e pagamento;
2. richiesta provider;
3. normalizzazione dati;
4. composizione e revisione report;
5. pubblicazione report;
6. fatturazione/supporto;
7. audit e gestione eccezioni.

## Principio guida

L'admin non deve essere una raccolta di pagine tecniche isolate. Deve diventare una **cabina operativa interna** con code di lavoro, priorità, motivazione del blocco, owner, prossima azione sicura e audit.

## Ambiti inclusi

- Operations home.
- Order operations.
- Billing operations.
- Provider operations.
- Report review operations.
- Support operations.
- Audit/event log.
- Manual review queue.
- Incident/anomaly queue.
- Internal role model.

## Ambiti esclusi dal primo MVP

- CRM avanzato.
- Contabilità completa o SDI automatico.
- BI avanzata.
- Gestione piani subscription completa, che resta nel modulo futuro M4B.
- Chiamate provider reali in produzione senza credenziali e contratto verificati.

## Decisione di sprint

L'MVP Admin Operations deve partire da una vista **queue-first**:

- cosa richiede intervento oggi;
- perché è bloccato;
- quanto è urgente;
- quale rischio operativo/compliance comporta;
- quale azione è consentita;
- quale azione richiede approvazione.

## Output di analisi

Lo sprint produce:

- strategia del pannello operativo interno;
- mappa code operative;
- matrice stati e priorità;
- modello ruoli interni;
- analisi operativa ordine/pagamento/provider/report/supporto;
- guardrail admin e audit;
- data model preliminare;
- readiness checklist per M8-P e M8-S.

## Esito

Sprint completato in versione `0.23.0`.
