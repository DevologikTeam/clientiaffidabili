# M7-S — Customer Dashboard Development

## Obiettivo

Implementare l'area cliente MVP prevista negli sprint M7-A e M7-P: dashboard post-acquisto, storico verifiche, dettaglio verifica, accesso report, fatture, notifiche e supporto contestuale.

## Decisione di sprint

La dashboard cliente deve essere una cabina di regia semplice, non una console tecnica. L'utente deve capire subito:

1. cosa è pronto;
2. cosa è in lavorazione;
3. cosa richiede attenzione;
4. quale azione compiere ora.

## Implementazioni principali

- Nuovo modulo backend `CustomerDashboardModule`.
- API customer-facing per summary, verifiche, dettaglio verifica, fatture, notifiche e supporto.
- Entità `CustomerNotification`, `CustomerTask`, `SupportTicket`.
- Componenti React riutilizzabili per area cliente.
- Route Next.js:
  - `/dashboard`
  - `/dashboard/verifiche`
  - `/dashboard/verifiche/[id]`
  - `/dashboard/fatture`
  - `/dashboard/supporto`
- Runtime demo isolato lato frontend per simulare stati senza inserire dati nei tenant reali.
- QA antiregressione dedicato.

## Guardrail applicati

- Nessun raw payload provider esposto al cliente.
- Nessun termine tecnico interno nella UI cliente.
- Report apribile solo se pubblicato o demo-safe.
- Download PDF mostrato come stato non attivo finché export non è implementato.
- Supporto sempre contestuale a verifica, ordine, report o fattura.
- Subscription Stripe/PayPal non mostrata come attiva finché non implementata nel modulo M4B.

## Esito

Sprint completato in versione `0.22.0`.
