# Auth, RBAC & Object-Level Authorization Blueprint

## Authorization chain

```text
Request
  -> authenticate session
  -> load user
  -> resolve account context
  -> verify membership active
  -> check role permission
  -> verify object belongs to account
  -> check resource state
  -> optional step-up
  -> audit if sensitive
```

## Account context

L'account attivo può arrivare da:

- path param `:accountId`;
- session default account;
- selected account switcher;
- ownership del record richiesto.

Il backend non deve fidarsi del solo `accountId` inviato dal frontend.

## Permission naming

Usare permessi espliciti:

```text
checks.create
checks.read
reports.read
reports.download
billing.read
billing.manage
team.read
team.invite
team.manage_roles
account.manage
support.create
support.read
```

## Object authorization esempi

| Risorsa | Verifica obbligatoria |
|---|---|
| Report | `report.accountId === membership.accountId` + stato pubblicato/autorizzato |
| Invoice | `invoice.accountId === membership.accountId` + ruolo billing/owner |
| Order | `order.accountId === membership.accountId` |
| Subscription | `subscription.accountId === membership.accountId` |
| SupportTicket | `ticket.accountId === membership.accountId` |
| ProviderRequest | mai esposta raw; solo via report/check autorizzato |

## Admin boundary

Gli admin interni non usano `AccountMembership`. Devono avere ruoli interni separati e azioni auditabili con reason dove sensibile.
