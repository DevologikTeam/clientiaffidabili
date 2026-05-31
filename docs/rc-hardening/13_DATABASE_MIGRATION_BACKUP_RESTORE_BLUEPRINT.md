# 13 — Database Migration, Backup, Restore & Rollback Blueprint

## Obiettivo

Eliminare il blocco P0 rilevato da M21-A: 74 entity TypeORM senza migrazioni versionate.

## Strategia

1. Generare baseline migration dello schema attuale.
2. Congelare entity e migration prima del build RC.
3. Eseguire backup database sandbox/staging.
4. Applicare migration in ambiente pulito.
5. Eseguire smoke test su auth, checkout, report, email ledger, sandbox certification e admin.
6. Eseguire restore drill da backup.
7. Documentare rollback applicativo e rollback DB.

## Regole

- Nessuna `synchronize: true` in produzione.
- Nessuna migration manuale non tracciata.
- Nessun dato reale in fixture sandbox.
- Restore drill obbligatorio prima di RC sign-off.
- Ogni migration deve avere descrizione, owner e rischio.

## Evidenze

- `artifacts/rc-hardening/database/migration-baseline.log`.
- `artifacts/rc-hardening/database/backup.log`.
- `artifacts/rc-hardening/database/restore-drill.log`.
- `artifacts/rc-hardening/database/schema-checksum.json`.
- `artifacts/rc-hardening/database/rollback-plan.md`.

## Uscita gate

`rc-database-migration-restore` passa solo se baseline, migration, backup e restore drill sono presenti e coerenti.
