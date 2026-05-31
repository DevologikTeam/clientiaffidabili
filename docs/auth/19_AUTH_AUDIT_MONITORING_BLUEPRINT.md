# Auth Audit & Monitoring Blueprint

## Eventi audit MVP

| Evento | Severità |
|---|---|
| login_success | info |
| login_failed | warning |
| logout | info |
| password_reset_requested | info |
| password_reset_completed | warning |
| email_verification_sent | info |
| email_verified | info |
| account_created | info |
| member_invited | info |
| invitation_accepted | info |
| invitation_revoked | warning |
| role_changed | warning |
| membership_disabled | warning |
| ownership_transferred | critical |
| session_revoked | warning |
| suspicious_login_pattern | critical |
| admin_account_suspended | critical |

## Redaction

Audit metadata non deve contenere:

- password;
- token reset/invito;
- session token;
- provider raw payload;
- dati carta;
- segreti API.

## Monitoring signals

- numero tentativi falliti per IP/email;
- reset password ripetuti;
- inviti massivi;
- cambio ruoli frequente;
- login admin senza MFA;
- access denied cross-account;
- sessioni da device nuovi.

## Alert MVP

- P0: tentativo cross-account riuscito o sospetto;
- P1: admin login senza MFA in production;
- P1: molteplici login falliti su stesso account;
- P2: inviti team anomali;
- P2: reset password ripetuti.
