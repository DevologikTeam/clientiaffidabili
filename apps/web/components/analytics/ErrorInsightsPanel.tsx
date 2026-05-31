import { Card } from '../ds/Card';
import { errorInsightRows } from '../../lib/analytics/analytics-growth-runtime';

export function ErrorInsightsPanel() {
  return (
    <Card>
      <p className="ca-eyebrow">Error insights</p>
      <h2>Impatto operativo aggregato</h2>
      <div className="ca-stack">
        {errorInsightRows.map((row) => (
          <div className="ca-inline-card" key={row.area}>
            <strong>{row.area}</strong>
            <p>{row.events} eventi · {row.impact}</p>
            <small>{row.recommendedAction}</small>
          </div>
        ))}
      </div>
    </Card>
  );
}
