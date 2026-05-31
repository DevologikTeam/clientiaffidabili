# Prompt Registry & Output Guardrails Analysis

## Prompt registry

Ogni prompt deve avere:

- codice use case;
- versione;
- owner;
- stato: draft, review, active, deprecated;
- system instruction;
- input schema;
- output schema;
- safety rules;
- forbidden claims;
- token budget;
- model policy;
- evaluation checklist.

## Output guardrails

Ogni output deve essere controllato per:

- claim vietati;
- tono troppo assoluto;
- dati personali non necessari;
- consigli legali/finanziari non richiesti;
- promesse di pagamento/rimborso;
- istruzioni operative non autorizzate;
- riferimento a raw payload o dati interni.

## Claim vietati

- "rischio zero";
- "pagamento garantito";
- "solvibilita' garantita";
- "cliente sicuro";
- "approvato automaticamente";
- "rimborso garantito" se non previsto dalla policy;
- "verifica ufficiale definitiva" se il report e' decision-support.

## Output structure

Per output critici si preferisce output strutturato:

```json
{
  "summary": "...",
  "riskFlags": [],
  "suggestedAction": "...",
  "requiresHumanApproval": true,
  "forbiddenClaimDetected": false
}
```

## Regola editoriale

L'AI deve produrre bozze. Il testo pubblicato deve essere approvato da un operatore.
