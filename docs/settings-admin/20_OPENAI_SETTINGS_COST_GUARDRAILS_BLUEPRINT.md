# 20 — OpenAI Settings & Cost Guardrails Blueprint

## Uso previsto

Le API OpenAI potranno supportare funzioni future come:

- assistenza alla scrittura di pagine SEO/GEO;
- sintesi interna di errori operativi;
- suggerimenti admin su report o supporto;
- classificazione ticket/lead;
- generazione bozze non pubblicate automaticamente.

## Settings OpenAI

- `openai.enabled`
- `openai.project_ref`
- `openai.api_key_secret_ref`
- `openai.default_model`
- `openai.max_monthly_budget_eur`
- `openai.max_request_cost_eur`
- `openai.allowed_use_cases`
- `openai.redaction_required`
- `openai.store_prompts_for_audit`
- `openai.fail_closed`

## Guardrail

- OpenAI disabilitato di default.
- Nessuna chiamata automatica su dati sensibili senza redaction.
- Nessun output AI pubblicato senza review umana.
- Budget e rate limit obbligatori.
- Errori e costi nel ledger.
- Prompt/output conservati solo se necessario e redatti.

## Note produzione

Le chiavi API devono restare in secret manager/env protetto e non essere hardcoded. La piattaforma deve supportare staging e produzione separati e limiti di spesa/progetto.
