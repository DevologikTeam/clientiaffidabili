import { Card } from '../ds/Card';
import { growthDashboardMetrics } from '../../lib/analytics/analytics-growth-runtime';

export function AnalyticsKpiGrid() {
  return (
    <section className="ca-grid ca-grid--4" aria-label="KPI crescita">
      {growthDashboardMetrics.map((metric) => (
        <Card key={metric.key}>
          <p className="ca-eyebrow">{metric.label}</p>
          <h3>{metric.value}</h3>
          <p>{metric.trend}</p>
          <small>{metric.interpretation}</small>
        </Card>
      ))}
    </section>
  );
}
