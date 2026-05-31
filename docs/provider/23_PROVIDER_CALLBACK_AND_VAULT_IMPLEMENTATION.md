# Callback and raw payload vault — Implementation

## Callback

Endpoint:

```http
POST /provider/openapi/callback
x-clientiaffidabili-signature: <OPENAPI_CALLBACK_SECRET>
```

Il callback viene accettato solo con firma valida. Il payload deve contenere `providerRequestId` o `externalId`.

## Vault

Il payload viene redatto prima del salvataggio. Chiavi sensibili come `iban`, `email`, `phone`, `mobile`, `token`, `secret`, `raw` vengono sostituite con `[redacted]`.

## Limiti MVP

- Non è ancora presente encryption applicativa campo-per-campo.
- Non è ancora presente job di retention.
- Non è ancora presente access audit per lettura payload.

Questi punti diventano backlog hardening prima della produzione reale.
