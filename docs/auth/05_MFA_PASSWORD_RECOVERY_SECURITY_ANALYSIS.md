# MFA, Password Recovery & Auth Security Analysis

## MFA roadmap

MVP customer:

- predisposizione schema dati e UI state;
- MFA opzionale post-MVP;
- MFA obbligatoria per admin/super admin prima del go-live operativo.

Metodo consigliato in ordine:

1. TOTP come implementazione più rapida;
2. WebAuthn/passkeys come evoluzione più sicura;
3. recovery codes cifrati/hashati;
4. step-up authentication per azioni sensibili.

## Password policy

La policy deve evitare regole vecchie e frustranti. Scelta proposta:

- minimo 12 caratteri in MVP, 15 consigliati per account senza MFA;
- massimo almeno 64 caratteri;
- supporto spazi e Unicode;
- nessun obbligo artificiale di maiuscole/numeri/simboli;
- password strength meter;
- blocco password comuni o compromesse;
- rotazione solo in caso di compromissione o evento di rischio.

## Recupero password

- Token monouso.
- Hash token in DB.
- Scadenza breve.
- Invalidazione sessioni dopo reset.
- Nessuna enumerazione account.
- Audit `password_reset_requested` e `password_reset_completed`.

## Cambio email

- Richiede sessione attiva.
- Richiede conferma nuova email.
- Per account con MFA: conferma MFA.
- Per account senza MFA: conferma password + email nuova.
- Audit e notifica a vecchia email.
