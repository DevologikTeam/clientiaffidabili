# Auth runtime implementation notes

L'implementazione M11-S introduce un modulo applicativo auth che usa il modello:

`User` + `Account` + `AccountMembership`.

L'utente rappresenta l'identita. L'account rappresenta il cliente aziendale. La membership collega utente e account con ruolo e stato.

## Runtime MVP

- `AuthAccountsService` gestisce registrazione, login, logout, reset password, inviti, team e ruolo.
- `AuthPasswordService` usa PBKDF2 SHA-256 con salt e iterazioni calibrate come fallback senza dipendenze esterne.
- `AuthTokenService` genera token opachi e salva solo hash SHA-256.
- `AuthSession` contiene `tokenHash`, stato, account attivo e scadenza.

## Nota produzione

Prima del go-live e' consigliato valutare Argon2id o bcrypt con libreria dedicata e test di carico/costo. PBKDF2 e' usato qui per scaffold offline senza installare dipendenze.
