import Link from 'next/link';
import { Header } from '@/components/Header';
import { ReportActions, ReportHero, ReportLimits, ReportSection } from '@/components/reports';
import { demoCustomerReport } from '@/lib/reports/report-runtime';

export default function ReportPage() {
  const report = demoCustomerReport;
  return (
    <>
      <Header />
      <main className="section" id="main-content" tabIndex={-1}>
        <div className="container">
          <Link className="btn btn-outline" href="/dashboard">← Torna alla dashboard</Link>
          <div style={{ marginTop: 20 }}>
            <ReportHero report={report} />
          </div>
          <div style={{ display: 'grid', gap: 20, marginTop: 20 }}>
            {report.sections.map((section) => <ReportSection key={section.code} section={section} report={report} />)}
            <ReportActions report={report} />
            <ReportLimits report={report} />
          </div>
        </div>
      </main>
    </>
  );
}
