# Backup, restore e incident response runbook

## Prima del go-live

Eseguire e documentare almeno una prova di restore completa.

## Oggetti da verificare dopo restore

- account e organizzazioni;
- ordini;
- pagamenti e ledger;
- abbonamenti e wallet crediti;
- richieste provider;
- report snapshot;
- fatture;
- audit log;
- ticket supporto;
- work item admin.

## Procedura minima PostgreSQL

1. Creare backup cifrato del database.
2. Creare ambiente pulito di restore.
3. Ripristinare backup.
4. Eseguire query di consistenza su entità principali.
5. Verificare accesso solo con account autorizzato.
6. Documentare durata, errori e remediation in `docs/qa/RESTORE_DRILL_REPORT.md`.

## Incident response

In caso di incidente:

1. bloccare provider call e checkout reali;
2. preservare log e audit;
3. stimare categorie dati coinvolte;
4. coinvolgere DPO/legale se necessario;
5. preparare timeline evento;
6. applicare comunicazioni obbligatorie secondo valutazione legale;
7. creare post-mortem e remediation.

## Data breach

La valutazione data breach deve essere fatta da soggetto competente. Il prodotto deve fornire evidenze, log, audit e scope tecnico, non sostituire il parere legale.
