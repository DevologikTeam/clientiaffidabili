# M17-A Source Notes — OpenAI Assisted Operations

Fonti consultate/da validare nello sviluppo:

- OpenAI API — Production best practices: sicurezza chiavi, configurazione production, monitoraggio, deploy e principi di affidabilita'.
- OpenAI API — Safety best practices: mitigazione rischi, input/output checks, human review e monitoraggio.
- OpenAI API — Structured Outputs: output controllabili con schema per use case dove serve risposta validabile.
- OpenAI API — Prompt engineering: struttura prompt, esempi, istruzioni chiare e separazione del contesto.

Decisione: nel MVP ClientiAffidabili.it usa OpenAI solo lato backend/admin, con settings, redaction, budget, audit e approval workflow. Nessun use case AI deve essere esposto direttamente al pubblico o usato come decisore automatico.
