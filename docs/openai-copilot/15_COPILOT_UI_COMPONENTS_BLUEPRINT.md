# Copilot UI Components Blueprint

## Componenti admin

- `OpenaiStatusCard`
- `OpenaiBudgetMeter`
- `OpenaiUseCaseToggleList`
- `PromptTemplateTable`
- `CopilotActionPanel`
- `CopilotDraftPreview`
- `CopilotDiffViewer`
- `CopilotRiskWarnings`
- `CopilotApprovalModal`
- `OpenaiUsageLedgerTable`
- `OpenaiErrorInsightPanel`

## Componenti embedded

### CMS

- `CmsCopilotPanel`
- `SeoSuggestionPreview`
- `FaqSuggestionList`
- `GeoAnswerSuggestion`

### Supporto

- `SupportSummaryBox`
- `ReplyDraftPreview`
- `MissingInfoChecklist`

### Error ledger

- `ErrorAiSummaryCard`
- `RecommendedActionBox`

## Design rules

- Sempre etichettare output AI come "Bozza".
- Mostrare data, modello e prompt version.
- Mostrare warning se claim rischiosi rilevati.
- Bottoni principali: "Applica bozza", "Modifica", "Scarta".
- Mai usare CTA "Pubblica automaticamente".
