# 07 — CRM Admin Operations Analysis

## Console interna proposta

Route future:

- `/admin/crm`
- `/admin/crm/leads`
- `/admin/crm/leads/[id]`
- `/admin/crm/opportunities`
- `/admin/crm/tickets`
- `/admin/crm/tickets/[id]`
- `/admin/crm/templates`
- `/admin/crm/settings`

## Home CRM

La home deve mostrare:

- nuovi lead;
- lead caldi;
- follow-up in scadenza;
- ticket P0/P1;
- richieste partner/API da valutare;
- opportunità in proposal;
- attività senza owner.

## Vista lead

Informazioni utili:

- origine;
- pagina/CTA;
- azienda e referente;
- messaggio;
- servizio/piano di interesse;
- score operativo;
- stato;
- owner;
- prossima azione;
- timeline;
- consenso e privacy snapshot.

## Azioni lead

- assegna owner;
- qualifica;
- programma follow-up;
- crea opportunità;
- invia link checkout;
- converti in ticket;
- marca come perso;
- marca come spam/abuso;
- archivia.

Azioni sensibili richiedono reason:

- disqualifica compliance;
- blocco abuso;
- cancellazione/anonymization;
- invio proposta custom;
- override prezzo/sconto.

## Vista ticket

Informazioni utili:

- categoria;
- priorità;
- account;
- collegamenti a ordine/report/fattura;
- stato;
- owner;
- messaggio;
- timeline;
- SLA interno;
- escalation.

## Integrazione con Admin Operations

Il CRM non deve duplicare Admin Operations. Deve alimentare le code:

- nuovo lead caldo;
- demo da pianificare;
- ticket P0/P1;
- partner/API review;
- richiesta rimborso/fattura;
- possibile abuso/compliance.

## Decisione

M15-S dovrà implementare prima una console semplice e leggibile, non Kanban complesso. Kanban e automazioni potranno arrivare dopo dati reali.
