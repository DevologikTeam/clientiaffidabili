# 14 — CRM UI Components Blueprint

## Componenti admin

- `CrmPriorityStrip`
- `ContactInboxTable`
- `ContactMessageDetail`
- `LeadStatusBadge`
- `OpportunityPipelineBoard`
- `SupportTicketQueue`
- `CrmTimeline`
- `CrmReasonModal`
- `LinkedObjectCard`
- `ErrorLinkPanel`
- `EmailDeliveryStatusBadge`

## Componenti pubblici

- `ContactForm`
- `DemoRequestForm`
- `PartnerRequestForm`
- `SupportRequestForm`
- `ConsentCheckbox`
- `SubmissionSuccessState`
- `SubmissionErrorState`

## Stati obbligatori

Ogni form deve avere:

- idle;
- validating;
- submitting;
- saved/email pending;
- success;
- saved/email failed con messaggio prudente;
- blocked/rate limited.

## Copy errore pubblico

Se l'invio email fallisce ma il messaggio è salvato:

> Abbiamo ricevuto la richiesta. Potrebbe esserci un ritardo nella notifica interna, ma il messaggio è stato registrato correttamente.

Non mostrare mai stack trace o errori provider.
