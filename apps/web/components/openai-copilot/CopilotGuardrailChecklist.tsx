import { Card, Checklist } from '@/components/ds';
import { openaiCopilotRuntime } from '@/lib/openai-copilot/openai-copilot-runtime';

export function CopilotGuardrailChecklist() {
  return (
    <Card className="ca-stack">
      <p className="ca-eyebrow">Sicurezza AI</p>
      <h2>Controlli prima di usare OpenAI</h2>
      <Checklist items={openaiCopilotRuntime.guardrails} />
    </Card>
  );
}
