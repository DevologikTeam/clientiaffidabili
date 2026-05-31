import { Button, Card, Checklist, TrustNotice } from '@/components/ds';
import { partnerPortalRuntime } from '@/lib/partner-portal/partner-portal-runtime';

export function PartnerGoLiveChecklist() {
  return (
    <Card>
      <p className="ca-eyebrow">Go live</p>
      <h2>Checklist produzione</h2>
      <Checklist items={partnerPortalRuntime.goLiveChecklist.map((item) => `${item.done ? '✓' : '□'} ${item.label}`)} />
      <TrustNotice tone="warning" title="Live non automatica">
        La richiesta viene revisionata da operations/compliance. Nessuna API key live viene creata senza approvazione.
      </TrustNotice>
      <Button>Richiedi revisione live</Button>
    </Card>
  );
}
