import { Badge, Card, ProgressBar } from '@/components/ds';
import type { CustomerReportViewModel } from '@/lib/reports/report-runtime';
import { attentionTone } from '@/lib/reports/report-runtime';

export function ReportHero({ report }: { report: CustomerReportViewModel }) {
  return (
    <Card variant="elevated" className="ca-report-hero">
      <div className="section-head">
        <div>
          <span className="tag">{report.title}</span>
          <h1 style={{ color: 'var(--color-navy-900)', fontSize: '44px' }}>{report.subject.name}</h1>
          <p>{report.subject.vatNumber ? `P.IVA ${report.subject.vatNumber} · ` : ''}{report.subject.legalAddress ?? report.subject.country ?? 'Soggetto verificato'}</p>
        </div>
        <Badge tone={attentionTone(report.attentionLevel)}>{report.attentionLabel}</Badge>
      </div>
      <div className="grid-3" style={{ marginTop: 24 }}>
        <Card>
          <span className="tag">Indice</span>
          {report.score === null ? <h3>Da verificare</h3> : <ProgressBar label="Indice di attenzione" value={report.score} helpText="Valore descrittivo, non predittivo." />}
        </Card>
        <Card>
          <span className="tag">Sintesi</span>
          <p>{report.executiveSummary}</p>
        </Card>
        <Card>
          <span className="tag">Snapshot</span>
          <p>Generato: {report.generatedAt ? new Date(report.generatedAt).toLocaleString('it-IT') : 'non disponibile'}</p>
          <p>Hash: {report.snapshotHash ?? 'in preparazione'}</p>
        </Card>
      </div>
    </Card>
  );
}
