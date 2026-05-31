import { Button, Card, StatusPill } from '@/components/ds';
import type { CustomerDashboardNextAction } from '@clientiaffidabili/shared';

export function NextBestActionCard({ action }: { action: CustomerDashboardNextAction }) {
  const tone = action.priority === 'high' ? 'warning' : action.priority === 'medium' ? 'info' : 'neutral';
  return (
    <Card>
      <div className="customer-action-card">
        <div>
          <StatusPill tone={tone} label="Prossima azione" />
          <h2 style={{ fontSize: 28, marginTop: 14 }}>{action.title}</h2>
          <p>{action.description}</p>
        </div>
        <Button href={action.href} variant={action.priority === 'high' ? 'primary' : 'outline'}>{action.ctaLabel}</Button>
      </div>
    </Card>
  );
}
