import { Card, StatusPill } from '@/components/ds';
import type { CustomerReportViewModel, ReportSectionViewModel } from '@/lib/reports/report-runtime';
import { EvidenceCard } from './EvidenceCard';

export function ReportSection({ section, report }: { section: ReportSectionViewModel; report: CustomerReportViewModel }) {
  const evidences = report.evidence.filter((item) => section.evidenceIds.includes(item.id));
  const tone = section.completeness === 'complete' ? 'success' : section.completeness === 'partial' ? 'warning' : 'neutral';
  return (
    <Card className="ca-report-section">
      <div className="section-head">
        <div>
          <h2>{section.title}</h2>
          <p>{section.summary}</p>
        </div>
        <StatusPill tone={tone} label={section.completeness === 'complete' ? 'Completa' : section.completeness === 'partial' ? 'Parziale' : 'Non disponibile'} />
      </div>
      {evidences.length > 0 ? (
        <div className="grid-2" style={{ marginTop: 16 }}>
          {evidences.map((item) => <EvidenceCard key={item.id} evidence={item} />)}
        </div>
      ) : null}
      {section.limits.length > 0 ? (
        <div style={{ marginTop: 16 }}>
          <strong>Limiti della sezione</strong>
          <ul className="ca-checklist">
            {section.limits.map((limit) => <li key={limit}><span aria-hidden="true">i</span>{limit}</li>)}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
