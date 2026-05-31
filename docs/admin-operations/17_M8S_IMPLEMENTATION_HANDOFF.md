# M8-S implementation handoff

## Obiettivo M8-S

Implementare la prima versione reale del centro operativo admin:

- backend summary e work items;
- UI `/admin/operations`;
- dettaglio item;
- action panel mock-safe;
- audit timeline redatta;
- RBAC placeholder server-side;
- QA antiregressione.

## File attesi backend

- `apps/api/src/modules/admin-operations/admin-operations.module.ts`
- `apps/api/src/modules/admin-operations/admin-operations.service.ts`
- `apps/api/src/modules/admin-operations/admin-operations.controller.ts`
- `apps/api/src/modules/admin-operations/entities/admin-work-item.entity.ts`
- `apps/api/src/modules/admin-operations/entities/admin-audit-event.entity.ts`
- `apps/api/src/modules/admin-operations/admin-rbac.guard.ts`
- `apps/api/src/modules/admin-operations/admin-action.service.ts`

## File attesi frontend

- `apps/web/app/admin/operations/page.tsx`
- `apps/web/app/admin/operations/[id]/page.tsx` oppure drawer client-side
- `apps/web/components/admin-operations/AdminCommandHeader.tsx`
- `apps/web/components/admin-operations/OperationsPriorityStrip.tsx`
- `apps/web/components/admin-operations/WorkQueueTable.tsx`
- `apps/web/components/admin-operations/WorkItemDrawer.tsx`
- `apps/web/components/admin-operations/AdminActionPanel.tsx`
- `apps/web/components/admin-operations/ReasonModal.tsx`
- `apps/web/components/admin-operations/AuditTimeline.tsx`
- `apps/web/lib/admin-operations/admin-operations-runtime.ts`

## Priorità implementazione

1. Modelli e tipi condivisi.
2. Summary endpoint mock-safe.
3. Work items endpoint mock-safe da segnali esistenti.
4. Pagina operations con queue e filtri.
5. Dettaglio item e action panel.
6. Audit timeline.
7. QA.

## Non obiettivi M8-S

- Non implementare workflow approvazione multi-step completo.
- Non implementare raw payload access.
- Non implementare rimborsi reali.
- Non implementare retry provider reale in produzione.
- Non implementare motore SLA avanzato.

## Definition of done

- `/admin/operations` mostra code operative reali/mock-safe.
- Ogni item ha stato, motivo, impatto e prossima azione.
- Azioni critiche mostrano reason modal.
- Azioni non implementate sono disabilitate con motivo.
- Nessun raw payload in UI standard.
- QA script M8-S passa.
- Roadmap, changelog e release aggiornati.
