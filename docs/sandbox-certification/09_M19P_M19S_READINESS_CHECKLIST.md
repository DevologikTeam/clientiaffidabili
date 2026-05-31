# M19-P / M19-S Readiness Checklist

## Pronto per M19-P se

- Sono definiti flussi sandbox per Stripe, PayPal, Openapi, OpenAI, email provider.
- Sono definiti dati fixture.
- Sono definiti pass/fail e blocker RC.
- Sono definiti error ledger e refund scenarios.
- Sono definiti smoke test Docker/Coolify.

## Pronto per M19-S se

- Esiste blueprint M19-P.
- Esistono script test/smoke da implementare.
- Esistono feature flag/settings per disabilitare provider non certificati.
- Esiste checklist RC aggiornata.

## Non pronto se

- Un provider esterno non ha fallback o kill switch.
- Un errore non è visibile in admin.
- Un rimborso non è auditato.
- Un webhook duplicato non è idempotente.
- Un dato reale è necessario per testare.
