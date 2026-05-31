# Provider security & raw payload vault blueprint

## Secrets

Le credenziali provider devono stare solo nel runtime API/Coolify secrets:

- `OPENAPI_BASE_URL_SANDBOX`
- `OPENAPI_BASE_URL_PRODUCTION`
- `OPENAPI_API_KEY`
- `OPENAPI_CLIENT_ID` se previsto
- `OPENAPI_CLIENT_SECRET` se previsto
- `OPENAPI_CALLBACK_SECRET`

Vietato usare `NEXT_PUBLIC_OPENAPI_*`.

## Raw payload vault

Il raw payload serve per audit, debug, contestazioni e supporto, ma non per UI cliente.

Requisiti:

- cifratura a riposo;
- hash payload per deduplica;
- classificazione dati;
- retention per profilo servizio;
- accesso solo admin autorizzato;
- motivo accesso obbligatorio;
- audit accessi.

## Minimizzazione

Prima di salvare il payload, valutare:

- serve conservare tutto o basta subset?
- contiene dati personali non necessari?
- contiene dati pagamento?
- contiene identificativi provider sensibili?

## Logging

Log consentiti:

- request id interno;
- provider name;
- stato;
- categoria errore;
- durata;
- costo snapshot;
- hash payload.

Log vietati:

- token;
- API key;
- codice fiscale/persona se non mascherato;
- IBAN completo;
- raw response completa;
- dati PEP/sanzioni in chiaro.

## Audit events

- `provider_request_created`
- `provider_request_sent`
- `provider_callback_received`
- `provider_payload_vaulted`
- `provider_payload_accessed`
- `provider_manual_review_started`
- `provider_manual_review_completed`
- `provider_request_failed`
- `provider_request_completed`

## Data retention proposta MVP

| Profilo | Retention raw | Retention normalized |
|---|---:|---:|
| company-basic-profile | 90 giorni | 24 mesi ordine/report |
| company-risk-profile | 180 giorni | 24 mesi ordine/report |
| kyb-compliance-profile | 180 giorni o policy legale | secondo base giuridica/contratto |
| payment-data-profile | 30 giorni raw | minimizzata nel report |
| contact-profile | 30 giorni raw | minimizzata nel report |

La retention definitiva va validata con legale/DPO prima della produzione.
