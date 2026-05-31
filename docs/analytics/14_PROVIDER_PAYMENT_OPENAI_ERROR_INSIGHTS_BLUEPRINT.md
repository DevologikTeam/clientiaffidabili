# 14 — Provider, Payment, OpenAI Error Insights Blueprint

## Principio

Gli errori dettagliati vivono nell'Operational Error Ledger. Analytics usa solo informazioni normalizzate e aggregate per individuare pattern.

## Categorie errore

| Categoria | Esempi |
|---|---|
| `payment` | pagamento fallito, refund failed, dispute opened |
| `provider` | Openapi timeout, provider disabled, payload invalid |
| `openai` | model unavailable, budget exceeded, safety block |
| `email` | bounce, complaint, PDF delivery failed |
| `checkout` | kill switch, consent missing, billing profile invalid |
| `report` | manual review required, PDF generation failed |
| `partner_api` | rate limit, idempotency missing, live access blocked |

## Insight admin

- errori ricorrenti per provider;
- errori che generano rimborsi;
- errori che bloccano report pronti;
- errori che richiedono fix tecnico;
- errori che richiedono comunicazione cliente;
- errori OpenAI che consumano budget senza valore.

## Regola dati

Non salvare mai stack trace completo, raw payload, prompt, response, token, API key o dati cliente negli analytics.
