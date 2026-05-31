import { Card } from '@/components/ds';
import { openaiCopilotRuntime } from '@/lib/openai-copilot/openai-copilot-runtime';

export function CopilotUseCaseGrid() {
  return (
    <section className="ca-grid ca-grid--3">
      {openaiCopilotRuntime.useCases.map((useCase) => (
        <Card key={useCase.code} variant="interactive" className="ca-stack">
          <p className="ca-eyebrow">Use case</p>
          <h3>{useCase.label}</h3>
          <p>{useCase.description}</p>
          <small>Codice: {useCase.code}</small>
        </Card>
      ))}
    </section>
  );
}
