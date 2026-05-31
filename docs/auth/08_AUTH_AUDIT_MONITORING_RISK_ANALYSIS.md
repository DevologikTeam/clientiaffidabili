# Auth Audit, Monitoring & Risk Analysis

## Eventi da auditare

| Evento | Sensibilità |
|---|---|
| login success/failure | media |
| logout | bassa |
| password reset requested/completed | alta |
| email changed | alta |
| team invitation sent/accepted/revoked | alta |
| role changed | alta |
| membership disabled | alta |
| session revoked | media |
| MFA enabled/disabled | alta |
| suspicious login pattern | alta |
| admin login | alta |

## Dati da non salvare in chiaro

- password;
- reset token;
- invitation token;
- refresh token;
- full IP se non necessario: preferire redazione o retention breve;
- user agent completo oltre retention utile;
- codici MFA/recovery.

## Monitoring

Alert consigliati:

- troppi login falliti su stesso account/email hashata;
- molti account target dallo stesso IP;
- inviti massivi;
- cambio ruolo seguito da download report;
- admin login da contesto insolito;
- reset password ripetuti.

## Risk score auth

MVP: non bloccare automaticamente salvo soglie chiare; inviare in admin queue eventi sospetti.

Post-MVP: risk-based authentication con step-up.
