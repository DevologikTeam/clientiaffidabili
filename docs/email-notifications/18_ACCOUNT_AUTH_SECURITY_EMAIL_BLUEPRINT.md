# 18 — Account, Auth & Security Email Blueprint

## Email registrazione

Evento: `account.registered`  
Template: `account_welcome_v1`

Obiettivo: confermare la creazione account e guidare alla verifica email/dashboard.

Contenuto:

- benvenuto;
- account aziendale creato;
- prossima azione;
- link dashboard;
- nota supporto.

## Verifica email

Evento: `account.email_verification_requested`  
Template: `verify_email_v1`

Regole:

- link con token monouso hashato;
- scadenza breve;
- nessun dato sensibile;
- alert se link scade e serve rigenerazione.

## Recupero password

Evento: `auth.password_reset_requested`  
Template: `password_reset_v1`

Regole:

- risposta neutra lato UI, anche se email non esiste;
- email inviata solo se account valido;
- token monouso hashato;
- scadenza breve;
- link con HTTPS;
- notifica di sicurezza se password viene cambiata.

## Password modificata

Evento: `auth.password_changed`  
Template: `password_changed_v1`

Contenuto:

- conferma modifica;
- link supporto se non riconosciuta;
- suggerimento di controllare sessioni/team.

## Remember-me

La funzione "ricordami" deve creare una sessione persistente controllata.

Eventi email:

- `auth.remember_me_enabled` quando un device persistente viene creato;
- `auth.remember_me_revoked` quando viene revocato;
- `auth.new_persistent_device` se nuovo dispositivo o contesto anomalo.

Regole:

- token persistente salvato solo come hash;
- rotazione token a ogni uso;
- revoca da dashboard;
- email con link "Gestisci dispositivi";
- nessun IP completo in email.

## Inviti team

Eventi:

- `team.invite_sent`;
- `team.invite_accepted`;
- `team.invite_expired` opzionale;
- `team.role_changed`.

Regole:

- token invito monouso hashato;
- scadenza;
- ruolo visibile in email;
- account aziendale visibile;
- audit obbligatorio.
