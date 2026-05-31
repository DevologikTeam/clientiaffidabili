# Auth Emails, Password Recovery e Remember Me

## Registrazione cliente

Flusso consigliato:

1. Utente crea account.
2. Sistema crea `EmailVerificationToken` hashato.
3. Sistema invia `auth_welcome_verify_email`.
4. Utente verifica.
5. Sistema abilita accesso completo a report, fatture, team e storico.

## Recupero password

Regole:

- Non rivelare se l'email esiste.
- Token reset salvato solo come hash.
- Scadenza breve: 30/60 minuti.
- Link monouso.
- Dopo reset, invalidare sessioni esistenti se configurato.
- Inviare `auth_password_changed`.

## Funzione ricordami

La funzione “ricordami” deve essere progettata come sessione lunga sicura, non come salvataggio password.

Regole:

- Refresh token persistente solo hashato.
- Cookie `HttpOnly`, `Secure`, `SameSite=Lax/Strict`.
- Rotazione token a ogni uso.
- Possibilita' di revoca da dashboard account.
- Audit login remember-me.
- Email opzionale `auth_remember_me_enabled` al primo enable o quando il rischio e' alto.

## Email sicurezza consigliate

| Email | Quando inviarla | Obbligatoria? |
|---|---|---|
| Verifica email | Registrazione | Sì |
| Recupero password | Reset richiesto | Sì |
| Password modificata | Reset/cambio completato | Sì |
| Nuovo dispositivo | Risk signal | Post-MVP |
| Ricordami attivato | Primo enable o rischio | Opzionale |
| Invito team | Invito creato | Sì |
| Ruolo team modificato | Cambio ruolo sensibile | Sì |

## Copy guardrail

- Oggetti chiari, non allarmistici.
- Mai inserire password, token o dati sensibili nel testo.
- Link con scadenza esplicita.
- CTA unica.
- Testo “se non sei stato tu” per reset/cambio password.
