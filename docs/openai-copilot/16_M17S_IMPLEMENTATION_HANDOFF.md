# M17-S Implementation Handoff

## Backend da implementare

```text
apps/api/src/modules/openai-copilot/
  openai-copilot.module.ts
  openai-copilot.controller.ts
  openai-copilot.service.ts
  openai-adapter.service.ts
  openai-redaction.service.ts
  openai-budget.service.ts
  openai-output-validator.service.ts
  entities/openai-prompt-template.entity.ts
  entities/openai-request.entity.ts
  entities/openai-usage-ledger.entity.ts
  entities/openai-copilot-draft.entity.ts
```

## Frontend da implementare

```text
apps/web/app/admin/openai-copilot/page.tsx
apps/web/app/admin/openai-copilot/prompts/page.tsx
apps/web/app/admin/openai-copilot/usage/page.tsx
apps/web/components/openai-copilot/
apps/web/lib/openai-copilot/openai-copilot-runtime.ts
```

## Integrazioni

- settings admin `openai.*`;
- operational error ledger;
- CMS SEO/GEO;
- CRM/support;
- admin operations;
- analytics solo aggregata;
- QA source syntax smoke.

## QA M17-S

- nessuna API key hardcoded;
- nessun client-side OpenAI call;
- banned claims bloccati;
- PII redaction obbligatoria;
- budget guard presente;
- output pubblici richiedono approvazione;
- error ledger collegato;
- settings kill switch funzionante.
