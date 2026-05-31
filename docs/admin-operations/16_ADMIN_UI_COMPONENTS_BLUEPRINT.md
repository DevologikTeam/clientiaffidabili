# Admin Operations — UI components blueprint

## Componenti layout

### `AdminCommandHeader`

Props:

- `title`;
- `description`;
- `primaryMetric`;
- `primaryAction`;
- `secondaryAction`.

### `OperationsPriorityStrip`

Mostra card aggregate:

- critici;
- da sbloccare;
- da revisionare;
- amministrazione;
- supporto.

### `WorkQueueTable`

Tabella principale con:

- filtri;
- ordinamento;
- row priority indicator;
- next action;
- SLA badge;
- empty state.

### `WorkItemDrawer`

Drawer/panel di dettaglio con:

- header stato;
- motivo/impatto/prossima azione;
- snapshot;
- action panel;
- audit preview.

## Componenti dettaglio

### `OperationalSnapshotCard`

Card riutilizzabile per ordine, pagamento, provider, report, fattura e supporto.

### `AdminActionPanel`

Divide le azioni in:

- consentite;
- con conferma;
- bloccate.

### `ReasonModal`

Modal critica con motivo, categoria, conferma guardrail e preview audit.

### `AuditTimeline`

Timeline redatta, senza payload sensibili.

### `PermissionBadge`

Mostra se l'azione richiede ruolo o approvazione superiore.

## Stati UI obbligatori

- loading skeleton;
- empty state;
- error safe;
- permission denied;
- action blocked;
- action success;
- stale data warning.

## Copy CTA

| Caso | CTA |
|---|---|
| Ordine pagato senza provider | `Avvia richiesta provider` |
| Provider fallito | `Valuta retry sicuro` |
| Report in review | `Revisiona report` |
| Report bloccato | `Risolvi blocco report` |
| Fattura pending | `Prepara fattura` |
| Rimborso richiesto | `Valuta rimborso` |
| Ticket aperto | `Rispondi al cliente` |
| Anomalia critica | `Apri incidente` |

## Accessibilità

- badge colore sempre accompagnato da testo;
- focus visibile su action panel e modal;
- tabelle navigabili da tastiera;
- modal con focus trap;
- aria label per priorità e stato;
- messaggi errore non solo cromatici.
