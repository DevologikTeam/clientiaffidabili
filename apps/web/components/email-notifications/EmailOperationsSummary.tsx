import { Card } from '../ds/Card';
import { emailNotificationRuntime } from '../../lib/email-notifications/email-notifications-runtime';

export function EmailOperationsSummary() {
  const overview = emailNotificationRuntime.overview;
  return (
    <section className="ca-grid ca-grid-4">
      <Card><p className="ca-eyebrow">In coda</p><h3>{overview.queued}</h3><p>Email tecniche in attesa.</p></Card>
      <Card><p className="ca-eyebrow">Fallite</p><h3>{overview.failed}</h3><p>Da analizzare o ritentare.</p></Card>
      <Card><p className="ca-eyebrow">Inviate 24h</p><h3>{overview.sentLast24h}</h3><p>Volume operativo recente.</p></Card>
      <Card><p className="ca-eyebrow">Suppression</p><h3>{overview.suppressed}</h3><p>Destinatari bloccati per sicurezza.</p></Card>
    </section>
  );
}
