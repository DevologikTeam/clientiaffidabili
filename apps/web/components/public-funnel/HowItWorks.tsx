import { Card } from '@/components/ds';
import { funnelSteps } from '@/lib/content';

export function HowItWorks() {
  return (
    <div className="ca-how-it-works">
      {funnelSteps.map((step, index) => (
        <Card key={step.title} className="ca-how-it-works__item">
          <span aria-hidden="true">{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </Card>
      ))}
    </div>
  );
}
