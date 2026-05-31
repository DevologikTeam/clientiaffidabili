# 11 — Lead, Contact & Ticket Data Model Blueprint

## ContactMessage

Record obbligatorio per ogni messaggio ricevuto da form pubblico o area cliente.

Campi:

- `id`
- `sourceType`: contact, demo, partner, support, guide_cta
- `sourcePath`
- `ctaId?`
- `name`
- `email`
- `companyName?`
- `phone?`
- `message`
- `consentSnapshot`
- `status`: new, triage, linked_to_lead, linked_to_ticket, spam, archived
- `emailDeliveryStatus`: pending, sent, failed, skipped
- `emailDeliveryErrorId?`
- `ipAddressHash?`
- `userAgent?`
- `createdAt`

## Lead

Lead commerciale qualificabile, generato da contact message, demo, partner request, guida SEO/GEO o checkout abbandonato.

## SalesOpportunity

Opportunità economica con pipeline semplice e valore stimato. Non deve contenere dati sensibili di report o raw provider.

## SupportTicket

Ticket operativo collegato a account, ordine, pagamento, rimborso, report, provider request, partner account o contact message.

## CrmActivity

Timeline append-only per eventi CRM:

- messaggio ricevuto;
- email inviata/fallita;
- owner assegnato;
- stato cambiato;
- ticket creato;
- opportunità creata;
- follow-up programmato;
- errore operativo collegato.

## Error link

`ContactMessage`, `Lead`, `SupportTicket` e `SalesOpportunity` possono collegarsi a `OperationalErrorEvent` quando un errore tecnico/commerciale richiede azione interna.
