import { Button, Card } from '@/components/ds';
import { launchUseCases } from '@/lib/launch-website/launch-website-runtime';

export function UseCaseDecisionGrid() {
  return (
    <div className="grid-3">
      {launchUseCases.map((useCase) => (
        <Card key={useCase.id} variant="interactive" className="ca-launch-use-case">
          <span className="ca-eyebrow">{useCase.eyebrow}</span>
          <h3>{useCase.title}</h3>
          <p>{useCase.problem}</p>
          <p><strong>Perché verificarlo:</strong> {useCase.value}</p>
          <Button href={useCase.ctaHref} variant="outline">{useCase.ctaLabel}</Button>
        </Card>
      ))}
    </div>
  );
}
