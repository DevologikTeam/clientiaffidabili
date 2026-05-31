# 11 — OpenAI Settings & Usage Guardrails Analysis

## Perimetro

ClientiAffidabili.it potra' usare API OpenAI in futuro come supporto operativo, non come fonte ufficiale per determinare l'affidabilita' di un'impresa.

Possibili casi d'uso:

- bozza copy SEO/GEO CMS;
- suggerimento risposta supporto;
- classificazione ticket/errori;
- sintesi interna di eventi tecnici gia' redatti;
- generazione checklist admin;
- supporto QA/documentazione.

## Impostazioni admin richieste

- `openai.enabled`;
- `openai.environmentLabel`;
- `openai.defaultModel`;
- `openai.allowedUseCases[]`;
- `openai.monthlyBudgetLimit`;
- `openai.perRequestMaxTokens`;
- `openai.promptLoggingMode`: none, redacted, metadata_only;
- `openai.piiRedactionRequired=true`;
- `openai.failClosedForSensitiveUseCases=true`;
- `openai.secretReference`.

## Guardrail dati

Prima di inviare input a OpenAI:

- rimuovere segreti e API keys;
- rimuovere raw provider payload;
- minimizzare dati personali;
- rimuovere IBAN completo;
- rimuovere indirizzi IP completi;
- non includere carte o dati pagamento;
- non includere report non pubblicati se non necessario e approvato.

## Error handling

Ogni errore OpenAI deve creare `OperationalErrorEvent` con:

- categoria `openai_api`;
- use case;
- modello richiesto;
- safe message;
- request id interno;
- redacted payload metadata;
- costo stimato se disponibile;
- azione consigliata.

## Cost governance

OpenAI deve avere:

- limite mensile;
- limite giornaliero opzionale;
- limite per use case;
- blocco se supera soglia;
- alert admin;
- nessun retry infinito.

## Fonti ufficiali considerate

Le API key e la gestione progetti/permessi devono restare allineate alla documentazione ufficiale OpenAI Platform. La configurazione locale deve usare secret reference/ENV e non salvare chiavi in chiaro in repository o frontend.
