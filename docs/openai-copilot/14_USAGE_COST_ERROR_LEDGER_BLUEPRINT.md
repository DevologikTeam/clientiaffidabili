# Usage, Cost and Error Ledger Blueprint

## Usage ledger

Ogni richiesta OpenAI genera una riga append-only:

- request id;
- use case;
- model;
- prompt version;
- input tokens;
- output tokens;
- estimated cost cents;
- status;
- latency ms;
- actor admin;
- target entity;
- environment.

## Budget guard

Blocchi:

- budget giornaliero esaurito;
- budget mensile esaurito;
- use case disabilitato;
- modello non consentito;
- input troppo grande;
- safety/redaction failure;
- provider unavailable.

## Error ledger mapping

| Errore | Category | Action |
|---|---|---|
| timeout | openai_timeout | retry manuale |
| rate limit | openai_rate_limit | attesa/backoff |
| budget exceeded | openai_budget_exceeded | blocco settings |
| schema invalid | openai_invalid_output | regenerate/fix prompt |
| unsafe output | openai_safety_block | discard/escalate |
| redaction failed | openai_redaction_failed | blocco immediato |

## Report admin

Dashboard OpenAI deve mostrare:

- costo oggi/mese;
- use case piu' usati;
- errori recenti;
- output bloccati;
- prompt con maggior failure rate;
- bozze in attesa.
