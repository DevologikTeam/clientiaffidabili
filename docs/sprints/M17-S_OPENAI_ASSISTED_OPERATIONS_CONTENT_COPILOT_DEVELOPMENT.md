# M17-S — OpenAI Assisted Operations & Content Copilot Development

Versione: **0.62.0**  
Data: **2026-05-30**  
Tipo sprint: **Sviluppo**

## Obiettivo

Implementare il runtime MVP del copilot OpenAI interno, mantenendolo disabilitato di default e governato da admin settings, redaction, prompt registry, usage ledger, error ledger e approvazione umana.

## Implementato

- `OpenaiCopilotModule` backend;
- entita' `OpenaiPromptTemplate`, `OpenaiRequest`, `OpenaiUsageLedgerEntry`, `OpenaiCopilotDraft`;
- prompt registry seedable;
- redaction service;
- output guard contro claim rischiosi e leak;
- adapter mock-first;
- endpoint admin overview, suggest, drafts, review, usage;
- settings OpenAI aggiuntivi;
- pagina admin `/admin/openai-copilot`;
- componenti UI copilot;
- QA dedicato.

## Guardrail runtime

Il modulo rispetta il flusso:

```text
AI propone -> Admin verifica -> Admin approva -> Sistema audita
```

L'AI non puo' eseguire autonomamente:

- rimborsi;
- modifica prezzi;
- modifica settings;
- chiamate Openapi;
- pubblicazione CMS;
- invio email;
- decisioni di affidabilita' assoluta.

## Nota produzione

L'adapter reale OpenAI resta feature-flagged. In questa versione l'adapter e' mock-first per evitare costi, leak e chiamate non controllate.
