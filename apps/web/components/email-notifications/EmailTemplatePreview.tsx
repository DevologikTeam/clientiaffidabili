import { Card } from '../ds/Card';
import { emailNotificationRuntime } from '../../lib/email-notifications/email-notifications-runtime';

export function EmailTemplatePreview() {
  return (
    <Card>
      <p className="ca-eyebrow">Template registry</p>
      <h2>Email tecniche attive</h2>
      <div className="ca-stack">
        {emailNotificationRuntime.templates.map((template) => (
          <article className="ca-soft-card" key={template.key}>
            <strong>{template.subject}</strong>
            <p>{template.category} · {template.key} · {template.status}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
