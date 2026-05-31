# OpenAI Settings and Secret Blueprint

## Principio

Le configurazioni OpenAI devono essere governate da admin ma i segreti non devono mai essere leggibili in chiaro dalla UI o dal frontend.

## Settings

| Chiave | Tipo | Default | Sensibile | Descrizione |
|---|---|---:|---:|---|
| `openai.enabled` | boolean | false | no | Abilita il copilot |
| `openai.apiKeySecretRef` | secret_reference | null | si | Reference al secret backend/Coolify |
| `openai.defaultModel` | string | `gpt-4.1-mini` | no | Modello default |
| `openai.lowCostModel` | string | `gpt-4.1-nano` | no | Modello per task semplici |
| `openai.dailyBudgetCents` | number | 500 | no | Budget giornaliero |
| `openai.monthlyBudgetCents` | number | 5000 | no | Budget mensile |
| `openai.maxInputTokens` | number | 6000 | no | Limite input |
| `openai.maxOutputTokens` | number | 1200 | no | Limite output |
| `openai.redactionMode` | enum | strict | no | Modalita' redaction |
| `openai.allowedUseCases` | string[] | [] | no | Use case abilitati |
| `openai.logPromptOutputMode` | enum | metadata_only | no | Log prompt/output |

## Regole sicurezza

- API key solo in secret manager o variabili ambiente.
- DB salva solo secret reference redatta.
- Rotazione secret richiede reason e audit.
- Produzione e staging separati.
- Nessun client-side OpenAI call.
- Nessuna API key in analytics, error messages, response payload o log.

## Kill switch

OpenAI deve avere kill switch indipendente dagli acquisti:

- `openai.enabled=false` blocca tutte le nuove richieste;
- richieste in coda vengono marcate `cancelled_by_settings`;
- error ledger registra il blocco.
