# 04 — Database Migration, Backup and Restore Audit

## Stato statico

- Sono presenti 74 entity TypeORM.
- Non sono state trovate migrazioni versionate nel repository.
- `synchronize` e' abilitato solo fuori produzione tramite `NODE_ENV !== 'production'`.
- Compose usa volume persistente PostgreSQL locale/Coolify.

## Blocchi RC

| Blocco | Severita | Motivo |
|---|---|---|
| Migrazioni assenti | P0 | schema drift non governato |
| Seed demo/fixture non formalmente separati da production | P0 | rischio dati demo in tenant reale |
| Restore drill non eseguito | P0 | rollback dati non dimostrato |
| Retention e cleanup non certificati | P1 | report, email secure link, token e payload hanno lifecycle diversi |
| Indici e constraint non revisionati | P1 | performance e integrita non dimostrate |

## Piano richiesto

- Creare baseline migration oppure schema freeze documentato con export SQL verificabile.
- Definire seed sandbox/demo separati da tenant reali.
- Eseguire backup prima deploy e restore su database temporaneo.
- Verificare query critiche: checkout, report, provider request, email ledger, sandbox run, settings e audit.
- Documentare retention per report, raw payload vault, email secure link, sessioni e token.

## Output M21-P

Blueprint migration/backup/restore con comandi, owner, artefatti e pass/fail.
