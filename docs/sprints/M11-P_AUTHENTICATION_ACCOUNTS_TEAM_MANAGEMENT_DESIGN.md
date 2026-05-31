# M11-P — Authentication, Accounts & Team Management Design

## Stato sprint

- Versione: `0.36.0`
- Tipo sprint: Progettazione
- Modulo: `M11 Authentication, Accounts & Team Management`
- Stato: completato
- Input: `M11-A Authentication, Accounts & Team Management Analysis`
- Output: blueprint operativo per login, account aziendali, team, inviti, ruoli, sessioni, sicurezza, MFA roadmap e handoff M11-S.

## Obiettivo

Trasformare l'analisi M11-A in una progettazione implementabile senza ambiguità. Il modulo auth deve proteggere superfici customer, admin, billing, report, provider e API future, senza rendere il primo acquisto troppo complesso.

## Decisione architetturale

Si conferma il modello **Account aziendale + Membership utenti**:

```text
User
└── AccountMembership
    └── Account
        ├── ordini
        ├── verifiche
        ├── report
        ├── fatture
        ├── wallet crediti
        ├── abbonamenti
        └── ticket supporto
```

`User` rappresenta l'identità personale. `Account` rappresenta il soggetto cliente. `AccountMembership` decide cosa può fare l'utente dentro quell'account.

## Regola madre

Nessuna risorsa sensibile deve essere letta, modificata o scaricata se non passa contemporaneamente:

1. autenticazione utente valida;
2. sessione non revocata;
3. membership attiva sull'account;
4. ruolo autorizzato;
5. object-level authorization sul record richiesto;
6. eventuale step-up/re-auth per azioni sensibili.

## UX flow principali

| Flow | Esito progettato |
|---|---|
| Registrazione diretta | crea user + account + membership owner |
| Checkout guest | crea ordine; dopo pagamento richiede attivazione account per report/storico |
| Login | sessione HTTP-only, audit, rate limit, errori anti-enumerazione |
| Recupero password | token monouso hashato, TTL breve, messaggio neutro |
| Invito membro | owner/admin seleziona ruolo, invio token, accettazione auditata |
| Cambio ruolo | consentito solo owner/admin con reason/audit per ruoli sensibili |
| Rimozione membro | disabilita membership, non cancella audit/storico |
| Transfer ownership | step-up obbligatorio, almeno un owner attivo |
| MFA admin | obbligatoria prima del go-live; customer opzionale post-MVP |

## Guardrail di progettazione

- Niente JWT/localStorage per sessioni web customer/admin MVP.
- Cookie sessione solo `HttpOnly`, `Secure`, `SameSite=Lax/Strict` in produzione.
- Nessun token in querystring dopo consumo; redirect pulito.
- Password reset e inviti salvati solo come hash token.
- Messaggi login/reset sempre neutri: non rivelano se l'email esiste.
- Rate limit su login, reset, resend email, invite accept.
- Re-auth per cambio email, password, ruoli, ownership, API key, azioni billing critiche.
- Session revoke su cambio password e sospensione account.
- Audit append-only per eventi auth/account/team.

## Handoff a M11-S

M11-S deve implementare:

- entità TypeORM `User`, `Account`, `AccountMembership`, `AccountInvitation`, `AuthSession`, `PasswordResetToken`, `EmailVerificationToken`, `AuthAuditEvent`;
- servizi `AuthService`, `AccountService`, `TeamService`, `SessionService`, `PasswordRecoveryService`, `AuthAuditService`;
- API auth/customer team;
- pagine Next.js login/register/forgot/reset/inviti/account/team;
- guardie sessione/RBAC/account context;
- QA antiregressione auth.
