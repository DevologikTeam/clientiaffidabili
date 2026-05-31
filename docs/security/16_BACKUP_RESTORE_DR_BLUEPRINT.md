# Backup, Restore & Disaster Recovery Blueprint

## Obiettivo

Assicurare continuita' minima e recuperabilita' dei dati prima del go-live.

## Asset da proteggere

- PostgreSQL database;
- file/report esportati quando introdotti;
- audit ledger;
- configurazioni Coolify non segrete documentate;
- secrets inventory separato e protetto;
- log security essenziali.

## Policy MVP

| Asset | Frequenza backup | Retention | Test restore |
|---|---:|---:|---:|
| PostgreSQL | giornaliero | 30 giorni | prima del go-live e poi mensile |
| Audit/payment ledger | incluso DB + export opzionale | 60-180 giorni | mensile |
| File report/PDF | giornaliero se storage persistente | 90 giorni | mensile |
| Configurazioni | ad ogni release | storico release | manuale |

## RPO/RTO iniziali

- RPO target: 24 ore MVP.
- RTO target: 4-8 ore MVP.
- P0 se backup fallisce per 2 cicli consecutivi.

## Restore drill

1. creare ambiente restore isolato;
2. ripristinare DB da ultimo backup;
3. avviare API/web con secrets staging;
4. verificare login admin/customer;
5. verificare ordine, report, billing ledger, audit;
6. generare report prova senza provider reale;
7. documentare tempo restore e anomalie.

## Go-live blocker

La produzione e' bloccata se non esiste almeno un restore drill riuscito con evidenza in `docs/qa`.
