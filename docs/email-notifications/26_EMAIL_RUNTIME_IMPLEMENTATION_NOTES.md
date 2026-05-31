# Email runtime implementation notes

Il runtime implementa un sistema transazionale tracciabile per registrazione, password, ricordami, ordini, pagamenti, rimborsi, report, PDF, fatture, abbonamenti, crediti, supporto e partner/API.

## Principi

- event-driven;
- ledger obbligatorio;
- retry esplicito;
- suppression list;
- PDF tramite link sicuro first;
- provider mock-first;
- nessun dato sensibile nei log;
- error ledger per anomalie provider.
