import { Alert, PageHero, TrustNotice } from '@/components/ds';
import { AdminOperationsShell, OperationsPriorityStrip, WorkQueueTable } from '@/components/admin-operations';
import { adminOpsItems, adminOpsSummary } from '@/lib/admin-operations/admin-operations-runtime';

export default function AdminOperationsPage() {
  return (
    <AdminOperationsShell active="/admin/operations">
      <PageHero
        eyebrow="Operazioni interne"
        title="Centro operativo"
        description="Una coda unica per sbloccare ordini, pagamenti, provider, report, fatture e supporto senza esporre complessità o payload grezzi al cliente."
      />
      <Alert tone="info" title="Console queue-first">
        Parti sempre dagli item più urgenti, leggi motivo e impatto, poi usa solo azioni consentite con reason obbligatoria quando richiesto.
      </Alert>
      <OperationsPriorityStrip summary={adminOpsSummary} />
      <WorkQueueTable items={adminOpsItems} />
      <TrustNotice tone="warning" title="Guardrail admin attivi">
        Nessuna chiamata provider prima del pagamento confermato. Nessun raw payload nelle liste admin. Ogni azione sensibile richiede motivazione e audit append-only.
      </TrustNotice>
    </AdminOperationsShell>
  );
}
