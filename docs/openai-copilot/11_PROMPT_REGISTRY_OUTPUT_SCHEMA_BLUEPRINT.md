# Prompt Registry and Output Schema Blueprint

## Prompt registry

Ogni prompt e' versionato e associato a un use case.

```ts
interface OpenaiPromptTemplateBlueprint {
  key: string;
  version: string;
  useCase: OpenaiUseCase;
  status: 'draft' | 'active' | 'archived';
  modelPreference: 'default' | 'low_cost' | 'high_quality';
  systemInstruction: string;
  taskInstruction: string;
  prohibitedClaims: string[];
  outputSchemaKey: string;
  requiresApproval: boolean;
}
```

## Output schema

Usare structured outputs quando possibile, con schema rigido.

Esempi:

### CMS suggestion

```json
{
  "summary": "string",
  "title": "string",
  "metaDescription": "string",
  "h2": ["string"],
  "faq": [{"question": "string", "answer": "string"}],
  "riskWarnings": ["string"],
  "requiresHumanReview": true
}
```

### Support reply

```json
{
  "customerIntent": "string",
  "urgency": "low|medium|high",
  "replyDraft": "string",
  "missingInformation": ["string"],
  "internalNotes": ["string"],
  "requiresHumanReview": true
}
```

### Error summary

```json
{
  "probableCause": "string",
  "customerImpact": "none|low|medium|high",
  "recommendedAction": "retry|refund_review|developer_fix|support_reply|escalate",
  "safeExplanation": "string",
  "requiresHumanReview": true
}
```

## Claim guard

Banned claim list:

- rischio zero;
- pagamento garantito;
- solvibilita' garantita;
- cliente sicuro al 100%;
- esito ufficiale definitivo se non supportato dalla fonte;
- garanzia assoluta su recupero crediti.
