import { Badge, Button, Card } from '@/components/ds';
import { checkoutHrefFor, getServiceByCode, type Scenario } from '@/lib/content';

type ScenarioCardProps = {
  scenario: Scenario;
};

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const service = getServiceByCode(scenario.primaryServiceCode);

  return (
    <Card variant="interactive" className="ca-scenario-card">
      <div className="ca-scenario-card__top">
        <Badge tone="brand">Scenario</Badge>
        {service ? <Badge tone="info">{service.price}</Badge> : null}
      </div>
      <div>
        <h3>{scenario.title}</h3>
        <p>{scenario.description}</p>
      </div>
      {service ? (
        <div className="ca-scenario-card__service">
          <strong>{service.name}</strong>
          <span>{service.delivery}</span>
        </div>
      ) : null}
      <Button href={checkoutHrefFor(scenario.primaryServiceCode)}>{scenario.ctaLabel}</Button>
    </Card>
  );
}
