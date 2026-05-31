import { Badge, Button, Card, TrustNotice } from '@/components/ds';
import { partnerPortalRuntime } from '@/lib/partner-portal/partner-portal-runtime';

export function PartnerWebhookPanel() {
  return (
    <Card>
      <div className="section-head">
        <div><p className="ca-eyebrow">Webhook</p><h2>Endpoint firmati</h2></div>
        <Button size="sm" variant="outline">Test webhook</Button>
      </div>
      {partnerPortalRuntime.webhooks.map((hook) => (
        <div key={hook.id} style={{ border: '1px solid var(--ca-slate-200)', borderRadius: 16, padding: 16, marginTop: 12 }}>
          <strong>{hook.url}</strong>
          <p>Eventi: {hook.events.join(', ')}</p>
          <Badge tone="success">{hook.status}</Badge>
        </div>
      ))}
      <TrustNotice tone="info" title="Firma obbligatoria">
        Ogni evento viene firmato con HMAC SHA-256 e header `X-CA-Signature`, `X-CA-Timestamp`, `X-CA-Event-Id`.
      </TrustNotice>
    </Card>
  );
}
