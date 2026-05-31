# M7-S implementation handoff

## Obiettivo M7-S

Sviluppare la prima area cliente reale usando il blueprint M7-P.

## File da creare in M7-S

Backend:

```text
apps/api/src/modules/customer-dashboard/customer-dashboard.module.ts
apps/api/src/modules/customer-dashboard/customer-dashboard.controller.ts
apps/api/src/modules/customer-dashboard/customer-dashboard.service.ts
apps/api/src/modules/customer-dashboard/customer-dashboard.dto.ts
```

Frontend:

```text
apps/web/components/customer-dashboard/
apps/web/app/dashboard/page.tsx
apps/web/app/dashboard/verifiche/page.tsx
apps/web/app/dashboard/verifiche/[id]/page.tsx
apps/web/app/dashboard/fatture/page.tsx
apps/web/app/dashboard/supporto/page.tsx
apps/web/lib/customer-dashboard/customer-dashboard.ts
```

QA:

```text
scripts/qa-customer-dashboard-development.js
```

## Sviluppo consigliato

1. Creare fixture customer dashboard lato frontend.
2. Implementare componenti UI senza chiamate reali.
3. Creare controller/service backend mock-safe.
4. Collegare route customer a dati mock normalizzati.
5. Aggiungere QA su copy vietato, stati cliente e assenza raw payload.
6. Aggiornare roadmap, manifest, changelog e release.

## Guardrail M7-S

- Nessun raw payload nella UI.
- Nessun termine tecnico interno nella customer area.
- Report accessibile solo se `published`.
- Stati tecnici tradotti in stati cliente.
- Fatture solo se disponibili o “in preparazione”.
- Supporto contestuale collegato a risorsa.
- Nessuna subscription mostrata come attiva se non implementata.
- Stripe/PayPal mostrati solo come metodi pagamento storici/provider-neutral, non come configurazioni account reali.

## QA acceptance criteria

- `/dashboard` mostra stato operativo e prossima azione.
- `/dashboard/verifiche` mostra lista, empty, error e filtri.
- `/dashboard/verifiche/[id]` mostra timeline e report link solo se pronto.
- `/dashboard/fatture` mostra fatture/stati senza dati carta.
- `/dashboard/supporto` permette richiesta contestuale mock.
- Nessuna stringa vietata nelle route customer.
