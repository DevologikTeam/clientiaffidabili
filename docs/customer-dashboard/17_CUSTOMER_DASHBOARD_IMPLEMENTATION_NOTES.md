# Customer Dashboard — Implementation Notes

## Superficie implementata

L'area cliente è stata trasformata da dashboard demo generica a esperienza post-acquisto strutturata.

## Route frontend

| Route | Scopo |
|---|---|
| `/dashboard` | Panoramica cliente, prossima azione, verifiche recenti, notifiche. |
| `/dashboard/verifiche` | Storico verifiche customer-facing. |
| `/dashboard/verifiche/[id]` | Dettaglio verifica, timeline e accesso report. |
| `/dashboard/fatture` | Stato fatture/documenti fiscali. |
| `/dashboard/supporto` | Supporto contestuale. |

## Componenti

- `CustomerShell`
- `DashboardStatusHero`
- `NextBestActionCard`
- `CheckList`
- `CheckTimeline`
- `ReportAccessCard`
- `InvoiceList`
- `NotificationList`
- `SupportEntryCard`

## Nota demo data

I dati demo sono nel runtime frontend e sono chiaramente isolati. Nei tenant reali i dati dovranno arrivare esclusivamente dalle API customer-dashboard.
