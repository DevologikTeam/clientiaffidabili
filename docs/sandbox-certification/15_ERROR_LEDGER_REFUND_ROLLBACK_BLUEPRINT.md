# Error Ledger, Refund & Rollback Certification Blueprint

## Error ledger obbligatorio

Ogni scenario fallito deve produrre un `OperationalErrorEvent` con:

- area;
- severity;
- correlation id;
- provider;
- related order/payment/report/user se applicabile;
- payload redatto;
- remediation suggestion;
- refund eligible sì/no;
- retry eligible sì/no;
- owner;
- status.

## Rimborso

Ogni test rimborso deve verificare:

- policy applicabile;
- stato provider call;
- stato report/PDF;
- importo massimo rimborsabile;
- ledger rimborso;
- email cliente;
- eventuale nota credito/fiscal queue.

## Rollback

La certificazione deve dimostrare che è possibile:

- fermare nuovi acquisti con kill switch;
- disabilitare Openapi provider call;
- disabilitare OpenAI copilot;
- disabilitare PayPal se instabile;
- mantenere accesso ai report già pubblicati;
- comunicare ai clienti stati di errore senza perdere dati.

## Regola RC

Un errore critico senza percorso di retry/rimborso/fix/rollback blocca la RC.
