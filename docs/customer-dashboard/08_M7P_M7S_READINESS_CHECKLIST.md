# M7-P / M7-S Readiness Checklist

## Readiness per M7-P — Design

- [ ] Definire wireframe panoramica cliente.
- [ ] Definire wireframe lista verifiche.
- [ ] Definire dettaglio verifica con timeline.
- [ ] Definire area report pronti.
- [ ] Definire area ordini/fatture.
- [ ] Definire stati customer-facing e copy.
- [ ] Definire notification/task cards.
- [ ] Definire support entry point.
- [ ] Definire mobile layout.
- [ ] Definire empty states e error states.

## Readiness per M7-S — Development

- [ ] Creare DTO dashboard customer.
- [ ] Creare mapping tecnico -> stato cliente.
- [ ] Creare endpoint `GET /customer/dashboard`.
- [ ] Creare endpoint `GET /customer/checks`.
- [ ] Creare endpoint `GET /customer/reports`.
- [ ] Creare endpoint `GET /customer/orders`.
- [ ] Creare pagina `/dashboard` client-ready.
- [ ] Creare componenti dashboard riutilizzabili.
- [ ] Collegare report runtime già sviluppato.
- [ ] Collegare billing/order/provider statuses.
- [ ] Aggiungere audit apertura report/download futuro.
- [ ] Aggiungere QA antiregressione M7-S.

## Domande aperte

1. L'accesso MVP richiede login completo o magic link temporaneo?
2. La dashboard deve supportare multi-utente già in MVP?
3. Le fatture saranno manual-assisted o integrate con provider fiscale?
4. I report saranno scaricabili subito o solo visualizzati web nel primo MVP?
5. Il cliente potrà cancellare/archiviare una verifica?

## Raccomandazione

Per non rallentare il go-live, M7-S dovrebbe implementare una dashboard customer con:

- accesso autenticato base;
- panoramica;
- storico verifiche;
- report pronti;
- ordini/fatture read-only;
- supporto come CTA verso email/form semplice;
- ruoli avanzati e notifiche real-time rimandati.
