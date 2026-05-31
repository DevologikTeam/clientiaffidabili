# 13 — Email Admin Operations Analysis

## Obiettivo admin

L'admin deve poter capire se una comunicazione e' partita, se e' stata consegnata, se e' fallita e cosa fare dopo.

## Viste MVP

- `/admin/email` overview.
- `/admin/email/deliveries` coda invii.
- `/admin/email/templates` template/versioni.
- `/admin/email/suppressions` indirizzi soppressi.
- `/admin/email/webhooks` eventi provider.
- Dettaglio delivery con timeline e correlazioni.

## Azioni admin

| Azione | Reason obbligatoria | Audit | Note |
|---|---|---|---|
| reinvia email tecnica | si | si | solo se evento ancora valido |
| rigenera link sicuro | si | si | revoca link vecchio |
| sopprimi indirizzo | si | si | no email essenziali senza review |
| rimuovi suppression | si | si | solo super admin/billing/support lead |
| archivia template | si | si | non impatta invii gia' fatti |
| attiva template | si | si | dopo QA |

## Error handling

Se una email critica fallisce:

1. creare/update operational error event;
2. mostrare in admin queue;
3. permettere retry sicuro;
4. se fallisce definitivamente, aprire ticket interno o task supporto;
5. evitare invii duplicati.

## KPI admin

- consegna per categoria;
- bounce rate;
- complaint rate;
- retry exhausted;
- email critiche fallite;
- tempi medi report ready -> notifica cliente;
- invii PDF falliti;
- reset password richiesti/falliti.
