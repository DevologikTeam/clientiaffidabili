import { Card, StatusPill } from '@/components/ds';
import type { CustomerDashboardTimelineStep } from '@clientiaffidabili/shared';

export function CheckTimeline({ steps }: { steps: ReadonlyArray<CustomerDashboardTimelineStep> }) {
  return (
    <Card>
      <span className="tag">Avanzamento</span>
      <h2 style={{ fontSize: 28, marginTop: 12 }}>Stato della verifica</h2>
      <div className="customer-timeline">
        {steps.map((step) => (
          <div className="customer-timeline__item" key={step.key}>
            <StatusPill tone={step.completed ? 'success' : step.current ? 'info' : 'neutral'} label={step.completed ? 'Completato' : step.current ? 'Ora' : 'In attesa'} />
            <div>
              <strong>{step.label}</strong>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
