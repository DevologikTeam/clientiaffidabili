import { Badge, Button, Card, StatCard, TrustNotice } from '@/components/ds';
import { partnerPortalRuntime } from '@/lib/partner-portal/partner-portal-runtime';

export function PartnerStatusHero() {
  const summary = partnerPortalRuntime.summary;
  return (
    <Card variant="elevated">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <p className="ca-eyebrow">Portale partner</p>
          <h1>{summary.legalName}</h1>
          <p>{summary.nextAction.reason}</p>
          <Badge tone="info">{summary.statusLabel}</Badge>
        </div>
        <Button href={summary.nextAction.href}>{summary.nextAction.label}</Button>
      </div>
      <div className="ca-grid ca-grid--4" style={{ marginTop: 24 }}>
        <StatCard label="Sandbox" value={summary.canAccessSandbox ? 'Attiva' : 'No'} description="Test senza provider reale" tone="success" />
        <StatCard label="Live" value={summary.canAccessLive ? 'Attiva' : 'Bloccata'} description="Richiede review" tone={summary.canAccessLive ? 'success' : 'warning'} />
        <StatCard label="Crediti" value={summary.creditsAvailable} description="Wallet partner" tone="neutral" />
        <StatCard label="API key" value="1" description="Chiave sandbox attiva" tone="info" />
      </div>
      <TrustNotice tone="warning" title="Produzione controllata">
        Le API live non vengono abilitate automaticamente. Servono uso dichiarato, webhook, termini API e approvazione operations.
      </TrustNotice>
    </Card>
  );
}
