import { Card } from '../ds/Card';
import { conversionFunnel } from '../../lib/analytics/analytics-growth-runtime';

export function ConversionFunnelPanel() {
  return (
    <Card>
      <p className="ca-eyebrow">Funnel</p>
      <h2>Dal contenuto al report consultato</h2>
      <div className="ca-stack">
        {conversionFunnel.map((step, index) => (
          <div className="ca-timeline-row" key={step.step}>
            <span className="ca-step-index">{index + 1}</span>
            <div>
              <strong>{step.step}</strong>
              <p>{step.value} eventi · conversione {step.rate}</p>
              <small>{step.risk}</small>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
