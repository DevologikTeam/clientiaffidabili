# Account & Organization Model Analysis

## Entità logiche

| Entità | Scopo |
|---|---|
| `User` | identità personale: email, nome, password hash, stato |
| `Account` | soggetto cliente/azienda che possiede ordini, report, fatture |
| `AccountMembership` | relazione user-account con ruolo e stato |
| `AccountInvitation` | invito email con token monouso e ruolo assegnato |
| `AdminUserProfile` | profilo interno separato da customer membership |
| `AuthSession` | sessione/refresh token/device session tracciata |
| `AuthAuditEvent` | audit append-only di eventi auth/account |

## Perché non basta `organizationId` sullo user

Il modello attuale `User.organizationId` va bene come scaffold, ma non regge:

- utente consulente che lavora per più aziende;
- cambio azienda principale;
- trasferimento ownership;
- invito/revoca membro;
- storico ruoli;
- separazione accessi billing/analyst;
- reseller/partner portal futuro.

## Stati account

| Stato | Significato |
|---|---|
| `draft` | creato da checkout incompleto o onboarding parziale |
| `active` | utilizzabile |
| `requires_review` | dati fiscali/legali o comportamento da verificare |
| `suspended` | accesso bloccato per rischio, chargeback, abuse |
| `closed` | chiuso/archiviato con retention |

## Stati membership

| Stato | Significato |
|---|---|
| `invited` | invito inviato, non accettato |
| `active` | accesso attivo |
| `disabled` | accesso revocato |
| `transferred` | ownership o ruolo trasferito |

## Regola madre

Ogni risorsa sensibile deve essere autorizzata contro `accountId` e `membership.role`, non contro la sola presenza di login.
