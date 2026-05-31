# MFA & Step-Up Blueprint

## Decisione MVP

- Customer MFA: progettata ma non obbligatoria al primo rilascio.
- Admin MFA: blocker prima del go-live pubblico.
- Step-up: implementabile già in M11-S come re-auth password/session freshness; MFA si aggancerà dopo.

## Metodi MFA futuri

| Metodo | Priorità | Note |
|---|---|---|
| TOTP app | alta | MVP admin-friendly |
| WebAuthn/passkey | media/alta | più sicuro, UX ottima, più complesso |
| Email OTP | bassa | fallback, meno sicuro |
| SMS OTP | evitare salvo necessità | costo, SIM swap, UX fragile |

## Step-up contract

Azioni sensibili devono verificare:

```ts
StepUpContext {
  userId: string
  accountId?: string
  action: string
  lastAuthenticatedAt: Date
  mfaVerifiedAt?: Date
  riskLevel: 'low' | 'medium' | 'high'
}
```

Esito:

```ts
StepUpDecision {
  required: boolean
  method: 'password' | 'mfa' | 'webauthn' | 'admin_block'
  reason: string
}
```

## Recovery codes

Quando MFA sarà attiva:

- recovery codes generati una sola volta;
- hashati a riposo;
- ogni uso auditato;
- rigenerazione richiede step-up;
- download/visualizzazione non ripetibile.
