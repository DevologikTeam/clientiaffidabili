# Login, Registration & Session Analysis

## Flow registrazione consigliato

### Scenario A — acquisto prima del login

1. Checkout raccoglie email e dati fiscali.
2. Payment confirmed.
3. Sistema crea `Account draft/active` e `User pending_activation` se non esiste.
4. Email magic activation/password setup.
5. Dopo attivazione, utente diventa `owner` dell'account.

### Scenario B — registrazione diretta

1. Email + password + azienda.
2. Verifica email obbligatoria.
3. Account active solo dopo email verified.
4. Checkout e report restano bloccati se email non verificata.

## Sessioni

MVP consigliato:

- access token breve lato server/API;
- refresh/session cookie HTTP-only;
- cookie `Secure`, `HttpOnly`, `SameSite=Lax` o `Strict` dove compatibile;
- rotazione sessione dopo login, reset password, MFA enable/disable, cambio ruolo;
- revoke session su logout, reset password e sospensione account.

## Errori auth sicuri

- Login: "Email o password non corretti".
- Recupero password: "Se l'email è presente, riceverai le istruzioni".
- Invito scaduto: "Questo invito non è più valido".

Non mostrare:

- "utente inesistente";
- "email già registrata" se può favorire enumeration;
- stack trace;
- motivi tecnici del blocco.

## Rate limit e anti-abuse

- Rate limit per IP e per identificatore email hashato.
- Progressive delay dopo errori ripetuti.
- Lock temporaneo soft, non permanente.
- Alert admin per credential stuffing o tentativi distribuiti.
