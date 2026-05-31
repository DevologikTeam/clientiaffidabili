# Provider callback & polling blueprint

## Obiettivo

Gestire provider sincroni e asincroni senza duplicare report, costi o stati.

## Callback

Endpoint interno design:

```http
POST /provider/openapi/callback
Headers:
  x-clientiaffidabili-signature: <signature>
  x-provider-event-id: <event id optional>
```

Regole:

- verificare firma prima di leggere semanticamente il payload;
- salvare evento raw in vault o payload log cifrato;
- idempotenza su `providerEventId` o hash payload + providerRequestId;
- non completare report direttamente dal controller;
- emettere evento interno `provider.callback_received`.

## Polling

Per servizi senza callback affidabile:

```text
sent -> polling -> polling -> normalizing -> completed
```

Scheduler:

- primo polling dopo tempo minimo configurato;
- backoff progressivo;
- timeout massimo per servizio;
- stop immediato se provider segnala stato finale.

## Eventi idempotenti

Tabella/event store consigliato:

- `provider_event_id`
- `provider_name`
- `provider_request_id`
- `event_type`
- `payload_hash`
- `received_at`
- `processed_at`
- `processing_status`

## Failure mode

| Caso | Azione |
|---|---|
| Callback senza request collegabile | Admin queue `manual_review`. |
| Firma non valida | Reject + audit security. |
| Payload duplicato | Ignora, ledger `duplicate_ignored`. |
| Payload parziale | `requires_review`. |
| Provider status failed ma costo consumato | `paid_provider_error`, support/refund decision. |
| Timeout polling | `requires_review`, non retry infinito. |

## Sicurezza

Il controller callback non deve mai restituire dettagli interni. Risposte esterne: `received`, `ignored`, `unauthorized`.
