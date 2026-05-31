import Link from 'next/link';
import { Badge, Card, StatCard } from '@/components/ds';
import { adminPartnerRuntime } from '@/lib/partner-portal/partner-portal-runtime';

export function AdminPartnerList() {
  return (
    <div className="ca-stack">
      <div className="ca-grid ca-grid--4">
        <StatCard label="Live review" value={String(adminPartnerRuntime.summary.pendingLiveReviews)} description="Richieste aperte" tone="warning" />
        <StatCard label="Sandbox" value={String(adminPartnerRuntime.summary.sandboxPartners)} description="Partner in test" tone="info" />
        <StatCard label="Live" value={String(adminPartnerRuntime.summary.livePartners)} description="Partner attivi" tone="success" />
        <StatCard label="Sospesi" value={String(adminPartnerRuntime.summary.suspendedPartners)} description="Accesso bloccato" tone="neutral" />
      </div>
      <Card>
        <p className="ca-eyebrow">Partner operations</p>
        <h2>Review e monitoraggio</h2>
        <table className="table"><thead><tr><th>Partner</th><th>Stato</th><th>Tier</th><th>Uso</th><th>Azione</th></tr></thead>
          <tbody>{adminPartnerRuntime.partners.map((partner) => <tr key={partner.id}>
            <td><strong>{partner.legalName}</strong></td><td><Badge tone={partner.risk === 'high' ? 'warning' : 'info'}>{partner.status}</Badge></td><td>{partner.tier}</td><td>{partner.usage}</td><td><Link className="btn btn-outline" href={`/admin/partners/${partner.id}`}>Apri</Link></td>
          </tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
