import { Badge, Card } from '@/components/ds';
import type { ReportEvidenceViewModel } from '@/lib/reports/report-runtime';
import { evidenceTone } from '@/lib/reports/report-runtime';

export function EvidenceCard({ evidence }: { evidence: ReportEvidenceViewModel }) {
  return (
    <Card className="ca-evidence-card">
      <div className="section-head">
        <div>
          <span className="tag">{evidence.sourceName}</span>
          <h3>{evidence.label}</h3>
        </div>
        <Badge tone={evidenceTone(evidence.severity)}>{evidence.severity}</Badge>
      </div>
      <p>{evidence.summary}</p>
      {evidence.details ? <p>{evidence.details}</p> : null}
      <ul className="ca-checklist">
        {evidence.limits.map((limit) => <li key={limit}><span aria-hidden="true">i</span>{limit}</li>)}
      </ul>
    </Card>
  );
}
