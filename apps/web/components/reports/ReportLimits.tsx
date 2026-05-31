import { Card } from '@/components/ds';
import type { CustomerReportViewModel } from '@/lib/reports/report-runtime';

export function ReportLimits({ report }: { report: CustomerReportViewModel }) {
  return (
    <Card>
      <h2>Fonti e limiti</h2>
      <p>Fonti normalizzate: {report.sources.join(', ') || 'non disponibili'}.</p>
      <ul className="ca-checklist">
        {report.globalLimits.map((limit) => <li key={limit}><span aria-hidden="true">i</span>{limit}</li>)}
      </ul>
    </Card>
  );
}
