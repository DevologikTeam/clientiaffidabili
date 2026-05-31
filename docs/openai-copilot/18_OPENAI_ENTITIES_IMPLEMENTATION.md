# OpenAI Entities Implementation

## Entita'

### OpenaiPromptTemplate

Conserva prompt versionati, use case, modello preferito, claim vietati e output schema.

### OpenaiRequest

Registra richiesta, target, contesto redatto, output, warning, costo stimato e stato.

### OpenaiUsageLedgerEntry

Ledger append-only per token/costi stimati per use case e modello.

### OpenaiCopilotDraft

Bozza generata, revisionabile, approvabile, applicabile o scartabile.

## Perche' separare request e draft

La request e' evidenza tecnica/operativa. La draft e' oggetto di revisione prodotto/admin.
