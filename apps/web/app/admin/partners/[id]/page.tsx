import { AdminOperationsShell } from '@/components/admin-operations/AdminOperationsShell';
import { Badge, Button, Card, TrustNotice } from '@/components/ds';

export default function AdminPartnerDetailPage({ params }: { params: { id: string } }) {
  return (
    <AdminOperationsShell active="/admin/partners">
      <Card variant="elevated"><p className="ca-eyebrow">Partner detail</p><h1>{params.id}</h1><p>Vista operativa partner con stato, uso dichiarato, API key redatte, usage, webhook e audit.</p><Badge tone="warning">sandbox_testing</Badge></Card>
      <Card><h2>Azioni admin</h2><p>Approva live, richiedi modifiche, revoca API key, adjustment crediti o replay webhook. Le azioni sensibili richiedono reason.</p><Button variant="outline">Apri reason modal</Button></Card>
      <TrustNotice tone="warning" title="Raw payload non visibile">La console non deve mostrare secret API, raw provider payload o dati non necessari.</TrustNotice>
    </AdminOperationsShell>
  );
}
