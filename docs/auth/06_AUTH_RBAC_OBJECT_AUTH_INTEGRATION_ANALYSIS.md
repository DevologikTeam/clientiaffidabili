# Auth, RBAC & Object Authorization Integration Analysis

## Collegamento con M9-S

M9-S ha introdotto scaffold RBAC e object authorization. M11 deve trasformarli in flusso prodotto reale.

## Principio

Autenticazione risponde a: "chi sei?"  
Autorizzazione risponde a: "puoi agire su questa risorsa di questo account?"

Entrambe sono obbligatorie.

## Oggetti da proteggere

| Risorsa | Regola auth |
|---|---|
| ordine | account owner/admin/billing/analyst in base allo stato |
| report | membership account + ruolo report-readable |
| fattura | owner/admin/billing |
| subscription/wallet | owner/admin/billing |
| ticket supporto | membership account |
| team | owner/admin, con limiti |
| API keys future | owner/admin + re-auth/MFA |
| admin queue | admin internal role, mai customer role |

## Claim/session context necessario

```ts
AuthContext = {
  userId: string;
  activeAccountId: string;
  memberships: Array<{ accountId: string; role: CustomerRole }>;
  adminRoles: AdminRole[];
  sessionId: string;
  mfaSatisfiedAt?: string;
  authTime: string;
}
```

## Rischi principali

- IDOR/BOLA su report e fatture.
- Membership vecchia non revocata.
- Cambio account senza ricalcolare permessi.
- Admin/customer role confusi.
- Token JWT troppo lunghi o non revocabili.

## Decisione

La fonte verità dei permessi è database + membership attiva. I token possono contenere claim minimi, ma le azioni sensibili devono rileggere lo stato corrente.
