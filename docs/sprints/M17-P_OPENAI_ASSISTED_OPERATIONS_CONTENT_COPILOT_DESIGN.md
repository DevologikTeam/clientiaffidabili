# M17-P — OpenAI Assisted Operations & Content Copilot Design

Versione: **0.61.0**  
Data: **2026-05-30**  
Tipo sprint: **Progettazione**

## Obiettivo

Trasformare l'analisi M17-A in un blueprint operativo per introdurre OpenAI come **copilot interno controllato**. Il modulo deve supportare CMS SEO/GEO, CRM/supporto, error ledger, admin operations e QA/release senza automatizzare decisioni sensibili.

## Decisione architetturale

OpenAI viene integrato come servizio backend-only con questi principi:

```text
Admin richiede assistenza -> backend redige contesto -> prompt registry versionato -> OpenAI -> validazione output -> bozza -> approvazione admin -> audit
```

OpenAI resta **disabilitato di default**. L'attivazione richiede settings admin, secret reference, budget e reason.

## Use case MVP

| Use case | Endpoint interno | Output | Approvazione |
|---|---|---|---|
| CMS SEO/GEO copilot | `POST /admin/openai-copilot/cms/suggest` | bozza title/meta/outline/FAQ | obbligatoria |
| Support reply assistant | `POST /admin/openai-copilot/support/reply-draft` | bozza risposta | obbligatoria |
| Error ledger summarizer | `POST /admin/openai-copilot/errors/summarize` | sintesi interna | opzionale, solo interna |
| Admin operations assistant | `POST /admin/openai-copilot/operations/explain` | spiegazione stato | interna |
| QA/release summarizer | `POST /admin/openai-copilot/release/summarize` | sintesi QA | interna |

## Azioni vietate

L'AI non puo':

- rimborsare utenti;
- modificare prezzi;
- modificare settings;
- pubblicare pagine CMS;
- inviare email cliente;
- chiamare Openapi;
- cambiare stato provider/pagamento/report;
- decidere affidabilita' o rischio assoluto;
- generare claim come "rischio zero", "pagamento garantito", "solvibilita' garantita".

## Settings richiesti

- `openai.enabled`
- `openai.provider = openai`
- `openai.apiKeySecretRef`
- `openai.defaultModel`
- `openai.lowCostModel`
- `openai.maxInputTokens`
- `openai.maxOutputTokens`
- `openai.dailyBudgetCents`
- `openai.monthlyBudgetCents`
- `openai.redactionMode`
- `openai.logPromptOutputMode`
- `openai.allowedUseCases`
- `openai.requireApprovalForPublicContent`

## Runtime blueprint

### 1. Pre-flight

- OpenAI abilitato?
- use case consentito?
- budget disponibile?
- utente admin autorizzato?
- contesto associato ad account/tenant corretto?
- dati sensibili redatti?

### 2. Prompt assembly

Il prompt viene costruito da:

- system instruction versionata;
- use-case instruction versionata;
- context pack redatto;
- output schema;
- prohibited claims;
- brand/copy policy;
- business guardrails.

### 3. Output validation

Ogni output deve passare:

- schema validation;
- banned claim detection;
- PII leak detection;
- max length;
- required sections;
- human approval flag.

### 4. Audit

Eventi append-only:

- `openai.request.created`
- `openai.request.redacted`
- `openai.request.sent`
- `openai.response.received`
- `openai.response.validated`
- `openai.response.blocked`
- `openai.output.approved`
- `openai.output.discarded`
- `openai.error.logged`

## Handoff M17-S

M17-S deve implementare:

- `OpenaiCopilotModule`;
- entities `OpenaiPromptTemplate`, `OpenaiRequest`, `OpenaiUsageLedger`, `OpenaiCopilotDraft`;
- redaction service;
- prompt registry;
- OpenAI adapter mock/real feature-flagged;
- admin UI `/admin/openai-copilot`;
- CMS copilot panel;
- support reply panel;
- error summarizer panel;
- QA anti risky claims e anti PII.
