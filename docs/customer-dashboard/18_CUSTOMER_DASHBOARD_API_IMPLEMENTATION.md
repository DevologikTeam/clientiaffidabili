# Customer Dashboard — API Implementation

## Endpoint MVP

| Metodo | Endpoint | Output |
|---|---|---|
| GET | `/customer-dashboard` | Snapshot completo area cliente. |
| GET | `/customer-dashboard/summary` | Statistiche e prossima azione. |
| GET | `/customer-dashboard/checks` | Storico verifiche. |
| GET | `/customer-dashboard/checks/:id` | Dettaglio verifica e timeline. |
| GET | `/customer-dashboard/invoices` | Fatture e documenti. |
| GET | `/customer-dashboard/notifications` | Notifiche cliente. |
| GET | `/customer-dashboard/support` | Ticket supporto. |
| POST | `/customer-dashboard/support` | Creazione ticket contestuale. |

## Data source

Il servizio legge da `checks`, `orders`, `reports`, `invoices`, `customer_notifications`, `support_tickets` e restituisce DTO customer-facing.

## Mapping stato

Gli stati tecnici vengono convertiti in stati cliente:

- `report_ready`
- `processing`
- `internal_review`
- `payment_received`
- `support_required`
- `refunded`
- `archived`

## Sicurezza

La versione scaffold usa parametri `organizationId`/`userId` per simulare lo scope. In produzione dovranno derivare da sessione/JWT e policy RBAC, mai dal client libero.
