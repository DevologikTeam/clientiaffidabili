import { Card } from '../ds/Card';
import { emailNotificationRuntime } from '../../lib/email-notifications/email-notifications-runtime';

export function EmailGuardrailPanel() {
  return (
    <Card>
      <p className="ca-eyebrow">Guardrail</p>
      <h2>Regole operative email</h2>
      <ul className="ca-list">
        {emailNotificationRuntime.guardrails.map((guardrail) => <li key={guardrail}>{guardrail}</li>)}
      </ul>
    </Card>
  );
}
