# 27 — M15B-S Implementation Handoff

## File backend da creare

- `apps/api/src/modules/settings-admin/settings-admin.module.ts`
- `apps/api/src/modules/settings-admin/settings-admin.controller.ts`
- `apps/api/src/modules/settings-admin/settings-admin.service.ts`
- `apps/api/src/modules/settings-admin/bootstrap-admin.service.ts`
- `apps/api/src/modules/settings-admin/purchase-kill-switch.service.ts`
- `apps/api/src/modules/settings-admin/operational-error-ledger.service.ts`
- `apps/api/src/modules/settings-admin/entities/platform-setting.entity.ts`
- `apps/api/src/modules/settings-admin/entities/platform-setting-audit.entity.ts`
- `apps/api/src/modules/settings-admin/entities/operational-error-event.entity.ts`
- `apps/api/src/modules/settings-admin/entities/purchase-audit-event.entity.ts`

## File frontend da creare

- `apps/web/app/admin/settings/page.tsx`
- `apps/web/app/admin/settings/commerce/page.tsx`
- `apps/web/app/admin/settings/payments/page.tsx`
- `apps/web/app/admin/settings/provider-openapi/page.tsx`
- `apps/web/app/admin/settings/openai/page.tsx`
- `apps/web/app/admin/settings/errors/page.tsx`
- `apps/web/components/settings-admin/*`
- `apps/web/lib/settings-admin/settings-admin-runtime.ts`

## Integrazioni richieste

- Checkout deve chiamare kill switch prima della sessione pagamento.
- Billing deve scrivere error ledger su errori pagamento/rimborso/webhook.
- Provider runtime deve scrivere error ledger su errori Openapi.
- Future OpenAI integration deve scrivere error ledger e cost events.
- Contact inbox deve mantenere messaggio anche se email fallisce.
- Purchase flow deve salvare audit IP hash.

## QA obbligatorio

- `qa-settings-admin-development.js`
- `qa-source-syntax-smoke.js`
- build API/web reale in ambiente con dipendenze;
- test kill switch server-side;
- test secret redaction;
- test error ledger per payment/provider/email;
- test che nessun secret sia incluso nel frontend bundle.
