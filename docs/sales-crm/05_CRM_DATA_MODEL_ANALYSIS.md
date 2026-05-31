# 05 — CRM Data Model Analysis

## Entità candidate

### Lead

Rappresenta una richiesta commerciale o interesse non ancora convertito.

Campi principali:

- `id`
- `accountId?`
- `contactId?`
- `sourceType`
- `sourcePath`
- `serviceSlug?`
- `guideSlug?`
- `companyName`
- `contactName`
- `email`
- `phone?`
- `message`
- `status`
- `score`
- `ownerUserId?`
- `consentSnapshot`
- `createdAt`
- `updatedAt`

### Contact

Persona referente collegata a lead/account/partner.

Campi principali:

- nome;
- email;
- telefono opzionale;
- ruolo;
- azienda;
- preferenze contatto;
- consenso e fonte.

### SalesOpportunity

Opportunità qualificata con valore commerciale.

Campi principali:

- leadId;
- accountId opzionale;
- stage;
- expectedValue;
- productInterest;
- planInterest;
- probability operativa;
- expectedCloseDate;
- lostReason;
- nextActionAt;
- ownerUserId.

### SupportTicket

Richiesta operativa/customer support.

Campi principali:

- accountId;
- leadId opzionale;
- orderId/reportId/paymentId opzionali;
- category;
- priority;
- status;
- subject;
- description;
- ownerUserId;
- lastCustomerMessageAt;
- lastInternalActionAt;
- resolvedAt.

### Activity

Timeline unificata.

Tipologie:

- note;
- email planned/sent;
- call;
- status change;
- assignment;
- internal escalation;
- checkout link sent;
- ticket created;
- opportunity won/lost.

## Relazioni con moduli esistenti

| Modulo | Relazione |
|---|---|
| Auth/Accounts | Lead può convertirsi in account; ticket appartiene ad account |
| Billing | ticket collega pagamento/fattura/rimborso |
| Reports | ticket collega report e review |
| Provider | ticket collega provider request senza raw payload |
| Partner Portal | lead può diventare partner account |
| SEO CMS | lead conserva pagina/guida sorgente |
| Admin Operations | lead/ticket caldi alimentano code operative |

## Data retention

- lead non convertiti: retention limitata da definire legalmente;
- ticket: retention collegata a obblighi contrattuali/fiscali e supporto;
- attività interne: audit minimale e redatto;
- consensi: mantenere prova di accettazione/versione;
- allegati: evitare nel MVP o limitarli fortemente.

## Decisione

Separare `Lead`, `Contact`, `SalesOpportunity`, `SupportTicket` e `CrmActivity` per evitare un unico oggetto ambiguo e difficile da governare.
