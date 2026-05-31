# Partner Webhook Runtime Implementation

## Endpoint partner
Il partner puo configurare endpoint webhook per eventi come:
- `check.queued`
- `check.completed`
- `check.failed`
- `report.ready`
- `credits.low`

## Firma
Il runtime include firma HMAC SHA-256 su `timestamp.payload` con secret partner.

Header previsti:
- `X-CA-Timestamp`
- `X-CA-Signature`
- `X-CA-Event-Id`

## Test webhook
Lo sprint include test trigger lato partner portal/admin per validare URL e firma senza inviare dati sensibili.

## Limiti
Delivery reale con retry esponenziale, dead letter queue e replay persistente sara' consolidata in M13.
