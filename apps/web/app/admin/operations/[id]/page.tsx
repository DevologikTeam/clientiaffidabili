import { notFound } from 'next/navigation';
import { AdminActionPanel, AdminOperationsShell, AuditTimeline, OperationalSnapshotCard, ReasonModalPreview } from '@/components/admin-operations';
import { Badge, Button, Card, KeyValueList, PageHero, TrustNotice } from '@/components/ds';
import { adminOpsItems, getAdminOpsDetail, priorityTone, statusTone, typeLabel } from '@/lib/admin-operations/admin-operations-runtime';

export function generateStaticParams() {
  return adminOpsItems.map((item) => ({ id: item.id }));
}

export default function AdminOperationDetailPage({ params }: { params: { id: string } }) {
  const detail = getAdminOpsDetail(params.id);
  if (!detail?.item) notFound();
  const item = detail.item;
  return (
    <AdminOperationsShell active="/admin/operations">
      <PageHero
        eyebrow="Dettaglio work item"
        title={`${typeLabel(item.type)} · ${item.orderCode}`}
        description={item.nextAction}
        actions={<Button href="/admin/operations" variant="outline">Torna alla coda</Button>}
      />
      <div className="ca-grid ca-grid--2">
        <Card>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            <Badge tone={priorityTone(item.priority)}>{item.priority}</Badge>
            <Badge tone={statusTone(item.status)}>{item.status}</Badge>
          </div>
          <KeyValueList
            items={[
              { label: 'Ordine', value: item.orderCode },
              { label: 'Servizio', value: item.serviceLabel },
              { label: 'Owner', value: item.assignedToLabel ?? item.ownerRole },
              { label: 'Motivo', value: item.reason },
              { label: 'Impatto', value: item.impact },
              { label: 'Prossima azione', value: item.nextAction },
            ]}
          />
        </Card>
        <ReasonModalPreview />
      </div>
      <section className="ca-grid ca-grid--3">
        {detail.snapshots.map((snapshot) => <OperationalSnapshotCard key={`${snapshot.kind}-${snapshot.title}`} snapshot={snapshot} />)}
      </section>
      <div className="ca-grid ca-grid--2">
        <AdminActionPanel actions={detail.allowedActions} blockedActions={detail.blockedActions} />
        <AuditTimeline items={detail.auditTimeline} />
      </div>
      <TrustNotice tone="info" title="Dato sensibile redatto">
        La vista operativa mostra solo informazioni utili alla decisione. Payload provider, dati personali non necessari e credenziali restano fuori dalla UI.
      </TrustNotice>
    </AdminOperationsShell>
  );
}
