import { Button, Card, TrustNotice } from '@/components/ds';
import type { CustomerReportViewModel } from '@/lib/reports/report-runtime';

export function ReportActions({ report }: { report: CustomerReportViewModel }) {
  return (
    <Card>
      <h2>Prossime azioni consigliate</h2>
      <ul className="ca-checklist">
        {report.recommendedActions.map((action) => <li key={action}><span aria-hidden="true">✓</span>{action}</li>)}
      </ul>
      <TrustNotice title="Uso prudente del report" tone="info">
        Il report supporta una decisione commerciale, ma non automatizza approvazioni, rifiuti o condizioni contrattuali.
      </TrustNotice>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <Button href="/dashboard">Torna alla dashboard</Button>
        <Button href="/servizi" variant="outline">Nuova verifica</Button>
      </div>
    </Card>
  );
}
