# RBAC & Object-Level Authorization Blueprint

## Obiettivo

Evitare accessi orizzontali e verticali non autorizzati a verifiche, report, ordini, fatture, pagamenti, ticket e code admin.

## Ruoli customer

| Ruolo | Accesso |
|---|---|
| `customer_owner` | account, billing, utenti, verifiche, report, supporto |
| `customer_admin` | verifiche, report, supporto, profilo aziendale |
| `customer_analyst` | crea verifiche, legge report autorizzati |
| `customer_billing` | fatture, abbonamenti, pagamenti, rimborsi |
| `customer_viewer` | sola lettura verifiche/report pubblicati |

## Ruoli admin

| Ruolo | Accesso |
|---|---|
| `support` | ticket, lettura stato ordine/report redatto |
| `operations` | code operative, retry sicuri, sblocchi non economici |
| `billing` | pagamenti, fatture, rimborsi, dispute |
| `compliance` | report sensibili, blocchi, review, data requests |
| `analyst` | review report, evidenze normalizzate |
| `super_admin` | configurazioni critiche, override e policy |

## Owner model

Ogni tabella customer-facing deve avere almeno uno tra:

- `tenantId` / `accountId`;
- `customerId`;
- `organizationId`;
- parent resource con ownership verificabile.

## Pattern API obbligatorio

1. Auth guard.
2. Role guard.
3. Object ownership guard.
4. Action policy guard.
5. Audit event se azione sensibile.

## Policy examples

| Risorsa | Customer rule | Admin rule |
|---|---|---|
| Order | account owner/member | role + reason per modifica |
| Report | published + account ownership | analyst/compliance + audit |
| Invoice | billing/owner | billing role |
| Refund | owner request | billing/super_admin approve |
| ProviderRequest | mai customer raw | operations/compliance redacted |
| SupportTicket | owner/member | support/operations |

## Test obbligatori M9-S

- utente A non vede report utente B;
- customer viewer non scarica fatture se non autorizzato;
- support admin non esegue refund;
- billing admin non vede raw provider payload;
- report non pubblicato non e' scaricabile;
- API con ID manipolato restituisce 403/404 sicuro.
