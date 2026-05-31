# Report admin review analysis

## Perché serve admin review

Alcuni report non possono essere pubblicati automaticamente perché:

- dati provider incompleti;
- risposta ambigua;
- segnali compliance-sensitive;
- score incoerente;
- fonte mancante;
- provider paid error;
- soggetto non identificato con certezza;
- claim vietato intercettato dal QA copy.

## Queue admin MVP

La queue admin deve mostrare:

- report id;
- ordine;
- servizio;
- soggetto;
- stato;
- motivo review;
- ultima evidenza disponibile;
- prossima azione sicura.

## Decisioni admin

| Decisione | Effetto |
|---|---|
| publish | Pubblica report al cliente. |
| request_more_data | Chiede input aggiuntivo al cliente. |
| refund_review | Passa a gestione rimborso/supporto. |
| mark_failed | Segna report fallito con motivazione. |
| escalate | Escalation interna/compliance. |

## Audit obbligatorio

Ogni decisione deve creare audit log:

- chi;
- quando;
- cosa;
- perché;
- stato prima/dopo;
- riferimento report/order/provider request.

## UX admin

La UI admin non deve essere una lista tecnica grezza. Deve essere una cabina di regia:

- “Cosa è bloccato?”
- “Perché?”
- “Che impatto ha sul cliente?”
- “Qual è la prossima azione sicura?”

## Customer communication

Se il report richiede più tempo:

> La verifica è in controllo qualità. Ti avviseremo quando il report sarà disponibile o se serviranno informazioni aggiuntive.

Non mostrare dettagli provider, stack trace, errori API o payload.
