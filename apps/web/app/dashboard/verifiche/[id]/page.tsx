import Link from 'next/link';
import { CheckTimeline, CustomerShell, ReportAccessCard } from '@/components/customer-dashboard';
import { Card, StatusPill } from '@/components/ds';
import { formatEuro, getCustomerCheckDetail, statusTone } from '@/lib/customer-dashboard/customer-dashboard-runtime';

export default function CustomerCheckDetailPage({ params }: { params: { id: string } }) {
  const check = getCustomerCheckDetail(params.id);
  return (
    <CustomerShell active="/dashboard/verifiche">
      <Card variant="elevated">
        <StatusPill tone={statusTone(check.status)} label={check.statusLabel} />
        <h1 style={{ color: 'var(--color-navy-900)', fontSize: 48, marginBottom: 12 }}>{check.subjectName}</h1>
        <p>{check.statusDescription}</p>
        <div className="ca-grid ca-grid--3 customer-detail-stats">
          <div><span className="tag">Servizio</span><strong>{check.serviceName}</strong></div>
          <div><span className="tag">Importo</span><strong>{formatEuro(check.amountGrossCents)}</strong></div>
          <div><span className="tag">Ordine</span><strong>{check.orderId}</strong></div>
        </div>
      </Card>
      <div className="ca-grid ca-grid--2">
        <CheckTimeline steps={check.timeline} />
        <ReportAccessCard check={check} />
      </div>
      <Card>
        <span className="tag">Supporto contestuale</span>
        <h2 style={{ fontSize: 28, marginTop: 12 }}>Serve un chiarimento?</h2>
        <p>Apri una richiesta collegata a questa verifica: il supporto riceverà il riferimento corretto.</p>
        <Link className="btn btn-outline" href={`/dashboard/supporto?check=${check.id}`}>Apri richiesta supporto</Link>
      </Card>
    </CustomerShell>
  );
}
