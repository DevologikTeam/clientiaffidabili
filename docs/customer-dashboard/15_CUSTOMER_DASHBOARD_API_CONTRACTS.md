# Customer dashboard API contracts

## Principio

Le API customer devono restituire dati già normalizzati e sicuri per la UI. Non devono esporre payload provider, ID tecnici inutili, webhook events o informazioni operative interne.

## `GET /customer/dashboard/summary`

Risposta concettuale:

```json
{
  "readyReports": 2,
  "pendingChecks": 1,
  "actionRequired": 0,
  "nextBestAction": {
    "type": "open_report",
    "title": "Nuovo report disponibile",
    "description": "Il report su Rossi Srl è pronto per la consultazione.",
    "href": "/reports/report_123",
    "ctaLabel": "Apri report"
  }
}
```

## `GET /customer/checks`

Query:

- `status`;
- `q`;
- `page`;
- `limit`.

Item:

```json
{
  "id": "chk_123",
  "subjectName": "Rossi Srl",
  "serviceName": "Check Affidabilità Pro",
  "status": "report_ready",
  "customerStatusLabel": "Report pronto",
  "requestedAt": "2026-05-30T09:00:00Z",
  "reportId": "rep_123"
}
```

## `GET /customer/checks/:id`

Include:

- dati richiesta;
- stato cliente;
- timeline customer-facing;
- ordine collegato;
- report collegato;
- support state.

Esclude:

- provider request raw;
- cost ledger;
- webhook;
- internal notes;
- payload vault.

## `GET /customer/reports`

Restituisce solo report pubblicati e autorizzati.

## `GET /customer/invoices`

Restituisce fatture e stati leggibili. Non deve sostituire il sistema contabile/SDI futuro.

## `POST /customer/support/tickets`

Payload:

```json
{
  "category": "report_question",
  "entityType": "report",
  "entityId": "rep_123",
  "message": "Vorrei un chiarimento sulle evidenze riportate."
}
```

## Errori customer-facing

Formato:

```json
{
  "code": "CUSTOMER_DASHBOARD_UNAVAILABLE",
  "message": "Non siamo riusciti a caricare i dati. Riprova tra poco.",
  "action": "retry"
}
```

## Autorizzazione

Ogni endpoint deve verificare:

- account membership;
- ruolo utente;
- ownership risorsa;
- stato account;
- eventuali blocchi compliance.

## Audit

Eventi minimi:

- dashboard aperta;
- report aperto;
- report scaricato futuro;
- fattura scaricata;
- support ticket creato;
- dati profilo aggiornati.
