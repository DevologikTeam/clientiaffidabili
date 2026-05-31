# Report Review Workflow Blueprint

## Quando serve review

La review admin è obbligatoria quando:

- provider response incompleta ma ordine pagato;
- segnali compliance sensibili;
- score provider incongruente con evidence;
- costo provider sostenuto ma report non componibile automaticamente;
- raw payload contiene dati non mappati;
- dati del soggetto non coincidono con input cliente;
- copy finale rischia claim non prudente.

## Stati review

| Stato | Descrizione |
|---|---|
| `not_required` | composizione automatica pubblicabile |
| `required` | serve intervento umano |
| `in_review` | admin sta verificando |
| `approved` | report approvato e pubblicabile |
| `changes_requested` | composer deve rigenerare o correggere |
| `rejected` | report non pubblicabile |

## Admin queue

La coda admin deve mostrare:

- order id;
- soggetto verificato;
- prodotto;
- motivo review;
- evidence problematiche;
- costo provider già sostenuto;
- scadenza SLA;
- azioni disponibili.

## Azioni admin

- Approva pubblicazione.
- Richiedi rigenerazione.
- Correggi sezione testuale con template controllato.
- Marca come non pubblicabile.
- Richiedi rimborso/assistenza.

## Audit obbligatorio

Ogni azione review deve produrre audit log con:

- admin id;
- timestamp;
- motivazione;
- stato precedente e nuovo;
- report version;
- template version;
- campi modificati.

## Regola anti-abuso

L'admin non può inventare informazioni non presenti nelle evidence. Può solo selezionare copy prudente, aggiungere nota di limite o bloccare la pubblicazione.
