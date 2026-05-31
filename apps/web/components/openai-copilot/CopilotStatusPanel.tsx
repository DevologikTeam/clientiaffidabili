import { Alert, Card, KeyValueList, StatusPill } from '@/components/ds';
import { openaiCopilotRuntime } from '@/lib/openai-copilot/openai-copilot-runtime';

export function CopilotStatusPanel() {
  return (
    <Card className="ca-stack">
      <div className="ca-split">
        <div>
          <p className="ca-eyebrow">Stato copilot</p>
          <h2>OpenAI interno controllato</h2>
          <p>{openaiCopilotRuntime.status.policy}</p>
        </div>
        <StatusPill tone="warning" label="Disabilitato di default" />
      </div>
      <KeyValueList
        items={[
          { label: 'Modalità', value: openaiCopilotRuntime.status.mode },
          { label: 'Budget', value: openaiCopilotRuntime.status.budgetLabel },
          { label: 'Output', value: 'Bozze revisionabili, mai azioni automatiche' },
        ]}
      />
      <Alert title="Guardrail obbligatorio" tone="warning">
        OpenAI non deve pubblicare contenuti, inviare email, modificare prezzi/settings, chiamare Openapi o rimborsare utenti senza approvazione umana e audit.
      </Alert>
    </Card>
  );
}
