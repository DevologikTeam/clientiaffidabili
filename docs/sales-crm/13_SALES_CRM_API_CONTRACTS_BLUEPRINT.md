# 13 — Sales CRM API Contracts Blueprint

## Public endpoints

```http
POST /api/public/contact
POST /api/public/demo-request
POST /api/public/partner-request
```

Tutti salvano `ContactMessage` prima dell'invio email.

## Customer endpoints

```http
POST /api/customer/support/tickets
GET /api/customer/support/tickets
GET /api/customer/support/tickets/:id
```

## Admin endpoints

```http
GET /api/admin/crm/summary
GET /api/admin/crm/inbox
GET /api/admin/crm/inbox/:id
POST /api/admin/crm/inbox/:id/convert-to-lead
POST /api/admin/crm/inbox/:id/convert-to-ticket
GET /api/admin/crm/leads
GET /api/admin/crm/leads/:id
PATCH /api/admin/crm/leads/:id/status
GET /api/admin/crm/tickets
GET /api/admin/crm/tickets/:id
PATCH /api/admin/crm/tickets/:id/status
```

## Error integration

```http
GET /api/admin/errors
GET /api/admin/errors/:id
POST /api/admin/errors/:id/assign
POST /api/admin/errors/:id/mark-investigating
POST /api/admin/errors/:id/mark-resolved
```

## Audit

Ogni mutazione admin deve creare attività/audit con:

- user id;
- ruolo;
- reason se sensibile;
- before/after redatto;
- timestamp;
- request id.
