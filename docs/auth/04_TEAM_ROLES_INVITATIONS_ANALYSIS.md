# Team, Roles & Invitations Analysis

## Ruoli customer MVP

| Ruolo | Può fare |
|---|---|
| `owner` | tutto, inclusi ruoli, billing, chiusura account |
| `admin` | team, verifiche, report, supporto, ma non trasferimento ownership |
| `analyst` | creare/verificare richieste e leggere report |
| `billing` | fatture, profilo fiscale, abbonamento, pagamenti |
| `viewer` | sola lettura di verifiche/report autorizzati |

## Azioni sensibili

Richiedono audit e, se possibile, re-auth:

- invio invito;
- revoca membro;
- cambio ruolo;
- trasferimento ownership;
- cambio email;
- reset password;
- cancellazione account;
- download massivo report;
- gestione API keys futura.

## Inviti

Ogni invito deve avere:

- account target;
- email target normalizzata;
- ruolo assegnato;
- token random non reversibile;
- hash token salvato, non token in chiaro;
- scadenza;
- stato;
- audit event;
- revoca possibile.

## Edge case

| Caso | Decisione |
|---|---|
| invito ad email già esistente | aggiunge membership dopo accettazione |
| invito scaduto | owner/admin può rigenerare |
| ultimo owner rimosso | vietato |
| cambio ruolo proprio | owner non può degradarsi se resta unico owner |
| email con dominio generico | consentita MVP, ma warning per account B2B |
