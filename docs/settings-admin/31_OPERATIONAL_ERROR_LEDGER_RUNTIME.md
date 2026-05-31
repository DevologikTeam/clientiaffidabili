# Operational Error Ledger Runtime

L'error ledger raccoglie errori non come log tecnici isolati, ma come eventi operativi collegabili a decisioni: retry, refund, fix, ticket o escalation.

## Categorie MVP
- payment
- refund
- subscription
- openapi_provider
- openai_api
- email_delivery
- webhook
- report_generation
- checkout
- auth
- crm_contact
- partner_api
- cms_publish

## Flusso errore
1. Il modulo registra evento con messaggio sicuro e payload redatto.
2. Admin vede la coda `/admin/settings`.
3. Admin assegna, collega rimborso, collega fix, risolve o ignora con reason.
4. Tutto resta append-only nella timeline dell'errore.

## Esempi integrati
- Billing registra errori di riconciliazione webhook pagamento.
- Provider runtime registra errori Openapi/provider con dati redatti.
