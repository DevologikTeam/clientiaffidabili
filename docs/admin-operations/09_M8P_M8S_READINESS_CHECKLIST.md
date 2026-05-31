# M8-P/M8-S readiness checklist

## Per M8-P Design

- [ ] Disegnare home operations queue-first.
- [ ] Disegnare pagina lista work items.
- [ ] Disegnare dettaglio work item.
- [ ] Disegnare order operations detail.
- [ ] Disegnare provider operations queue.
- [ ] Disegnare report review queue.
- [ ] Disegnare billing/refund/dispute queue.
- [ ] Disegnare support queue integrata.
- [ ] Definire componenti UI admin.
- [ ] Definire API contract admin.
- [ ] Definire RBAC MVP per azioni admin.
- [ ] Definire audit event contract.

## Per M8-S Development

- [ ] Implementare `AdminOperationsModule`.
- [ ] Implementare `AdminWorkItem` o aggregator service.
- [ ] Implementare API summary e queue.
- [ ] Implementare UI `/admin/operations`.
- [ ] Collegare provider/report/billing/support queues.
- [ ] Aggiungere reason obbligatoria per azioni critiche.
- [ ] Aggiungere QA antiregressione admin.

## Gate di rilascio

- [ ] L'admin non espone raw payload nelle liste.
- [ ] L'admin non permette azioni critiche senza audit.
- [ ] Le queue mostrano stato, motivo, impatto e prossima azione.
- [ ] Le azioni non implementate sono chiaramente disabilitate.
- [ ] La UI distingue operazioni customer-safe da informazioni interne.
