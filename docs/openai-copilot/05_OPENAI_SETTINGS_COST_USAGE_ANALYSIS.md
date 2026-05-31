# OpenAI Settings, Cost & Usage Analysis

## Settings necessari

Namespace: `openai`.

| Setting | Tipo | Sensibile | Default |
|---|---|---:|---|
| `openai.enabled` | boolean | no | false |
| `openai.provider` | enum | no | `openai` |
| `openai.apiKeySecretRef` | secret_ref | si | null |
| `openai.defaultModel` | string | no | null |
| `openai.maxDailyCostCents` | number | no | 0 |
| `openai.maxMonthlyCostCents` | number | no | 0 |
| `openai.maxInputTokens` | number | no | use-case specific |
| `openai.maxOutputTokens` | number | no | use-case specific |
| `openai.allowedUseCases` | string[] | no | [] |
| `openai.logPrompts` | enum | no | `redacted_only` |
| `openai.requireApproval` | boolean | no | true |

## Cost guardrails

- Budget giornaliero e mensile.
- Budget per use case.
- Pre-check prima della chiamata.
- Stop automatico se budget superato.
- Warning admin quando si raggiunge 70%, 90%, 100%.
- Error ledger `openai_budget_exceeded`.

## Usage ledger

Ogni chiamata deve registrare:

- use case;
- prompt version;
- model;
- input/output token estimate se disponibile;
- costo stimato;
- status;
- error code;
- linked entity;
- operator/admin;
- redaction status.

## Admin visibility

L'admin deve vedere:

- stato OpenAI;
- budget;
- uso corrente;
- errori recenti;
- use case attivi;
- prompt version attive;
- ultimo safety block;
- azioni bloccate.
