# Observability, Audit & Logging Analysis

## Differenza tra log e audit

- **Log tecnico**: serve a debug/monitoring, deve essere redatto e con retention breve.
- **Audit log**: serve a responsabilita' e ricostruzione di azioni business, append-only e con retention maggiore.
- **Ledger**: source of truth economica/costi/crediti, append-only.

## Eventi audit obbligatori

| Evento | Audit |
|---|---|
| creazione ordine | si |
| checkout session creata | si |
| pagamento confermato/fallito | si |
| webhook ricevuto/scartato | si |
| provider request creata/retry/fail | si |
| provider raw payload salvato/accesso | si |
| report generato/pubblicato/bloccato | si |
| report aperto/download | si |
| refund richiesto/approvato/rifiutato | si |
| subscription create/cancel/renew/fail | si |
| admin action sensibile | si con reason |
| modifica prezzo/catalogo | si |

## Log redaction

Mai loggare:

- token/sessioni;
- chiavi API;
- payload provider grezzi;
- dati carta;
- IBAN completo se non necessario;
- CF/person data non necessari;
- header authorization;
- webhook signature raw.

## Metriche operative

- checkout success/failure rate;
- webhook pending/failure count;
- provider request cost/day;
- provider retry count;
- report generation failures;
- admin queue P0/P1 count;
- refund/dispute count;
- backup success/failure;
- login/admin failed attempts.

## Alert MVP

- secret scan failure;
- provider cost spike;
- webhook signature failure spike;
- DB backup failed;
- report access denied spike;
- repeated 403/401 from same account/IP;
- admin critical actions unusual volume.
