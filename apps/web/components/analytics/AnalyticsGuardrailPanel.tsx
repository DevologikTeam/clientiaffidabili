import { Alert } from '../ds/Alert';
import { Checklist } from '../ds/Checklist';
import { analyticsRuntimeGuardrails } from '../../lib/analytics/analytics-growth-runtime';

export function AnalyticsGuardrailPanel() {
  return (
    <Alert title="Analytics privacy-safe" tone="info">
      <Checklist items={analyticsRuntimeGuardrails} />
    </Alert>
  );
}
