# Session & Password Security Blueprint

## Session strategy MVP

Per web app customer/admin si usa sessione server-side o token opaco con cookie:

```text
Set-Cookie: ca_session=<opaque-token>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=...
```

Non usare localStorage per token di sessione. Se in futuro si useranno JWT, devono essere short-lived, ruotati e non contenere dati sensibili.

## Durate consigliate

| Sessione | Durata |
|---|---:|
| Customer normale | 8-12 ore inattività, max 30 giorni con remember device |
| Admin | 4-8 ore, nessun remember senza MFA |
| Step-up | 10-15 minuti |
| Password reset token | 30-60 minuti |
| Invitation token | 7 giorni |
| Email verification | 24-48 ore |

## Password policy

- Lunghezza minima MVP: 12 caratteri customer, 14 admin.
- Consentire password lunghe fino ad almeno 64 caratteri.
- Non imporre regole arbitrarie tipo maiuscola/simbolo obbligatorio se si usa controllo forza/compromissione.
- Bloccare password comuni o compromesse quando il servizio di verifica sarà disponibile.
- Hash con Argon2id o bcrypt cost adeguato.

## Protezioni anti-abuso

- Rate limit per IP + email normalizzata.
- Progressive delay su tentativi falliti.
- Lock temporaneo solo con copy neutro e sblocco sicuro.
- Audit su login falliti anomali.
- Alert interno su credential stuffing.

## Re-authentication

Richiesta per:

- cambio password/email;
- ruoli e inviti;
- download massivi futuri;
- creazione API key futura;
- azioni billing/rimborso sensibili;
- sessione con risk signal elevato.
