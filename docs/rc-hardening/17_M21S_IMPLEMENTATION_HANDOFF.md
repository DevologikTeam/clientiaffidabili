# 17 — M21-S Implementation Handoff

## Obiettivo M21-S

Implementare il runtime minimo per rendere eseguibili i gate M21-P e preparare il progetto alla prima Release Candidate verificabile.

## Task P0

1. Creare registry gate RC condiviso web/API.
2. Implementare command center admin `/admin/launch-readiness/rc-hardening`.
3. Aggiungere evidence bundle generator in `artifacts/rc-hardening/`.
4. Aggiungere static gate che fallisce se manca un gate P0 o se un waiver non ha feature off.
5. Integrare controllo production guard per `ENABLE_DEMO_DATA=false`.
6. Disegnare/aggiungere baseline migration o almeno controllo esplicito che blocca RC finche non esiste.
7. Collegare sandbox certification M19-S allo stato provider RC.
8. Rafforzare CI affinche lanci build/typecheck/static gates e raccolga artifact.

## Task P1

1. Aggiungere export support runbook.
2. Collegare error ledger, payment ledger ed email ledger a summary RC.
3. Aggiungere risk register leggibile in admin.
4. Preparare template note release RC.
5. Preparare lista comandi manuali per Docker/Coolify target.

## Done criteria

- `node scripts/qa-rc-hardening-design.js` passa.
- Nuovo gate M21-S passa staticamente.
- Evidence bundle viene generato anche con stato `blocked` se mancano evidenze reali.
- La UI admin mostra chiaramente cosa blocca RC, perche e quale azione serve.
- Nessuna feature non certificata viene presentata come disponibile.

## Fuori perimetro M21-S se ambiente non disponibile

- Esecuzione reale provider live.
- Esecuzione Docker/Coolify in produzione.
- Restore drill su database reale.
- Invio email reali verso clienti.
