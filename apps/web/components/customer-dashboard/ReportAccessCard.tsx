import { Button, Card, StatusPill } from '@/components/ds';
import type { CustomerDashboardCheckDetail } from '@clientiaffidabili/shared';

export function ReportAccessCard({ check }: { check: CustomerDashboardCheckDetail }) {
  if (!check.reportAccess) {
    return (
      <Card>
        <StatusPill tone="info" label="Report non ancora disponibile" />
        <h2 style={{ fontSize: 28, marginTop: 12 }}>Ti avviseremo appena sarà pronto</h2>
        <p>La verifica è in corso o in controllo interno. Non devi ripetere l’acquisto.</p>
      </Card>
    );
  }
  return (
    <Card variant="elevated">
      <StatusPill tone={check.reportAccess.downloadable ? 'success' : 'warning'} label={check.reportAccess.downloadable ? 'Report pubblicato' : 'In controllo'} />
      <h2 style={{ fontSize: 28, marginTop: 12 }}>Accesso report</h2>
      <p>{check.reportAccess.downloadStatusLabel}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button href={check.reportAccess.href}>Apri report</Button>
        {check.reportAccess.downloadable ? <Button href="#" variant="outline">Download PDF</Button> : <Button type="button" variant="outline" disabled>Download PDF</Button>}
      </div>
    </Card>
  );
}
