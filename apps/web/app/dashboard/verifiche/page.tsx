import { CheckList, CustomerShell } from '@/components/customer-dashboard';
import { Card } from '@/components/ds';
import { customerDashboardChecks } from '@/lib/customer-dashboard/customer-dashboard-runtime';

export default function CustomerChecksPage() {
  return (
    <CustomerShell active="/dashboard/verifiche">
      <Card variant="elevated">
        <span className="tag">Verifiche</span>
        <h1 style={{ color: 'var(--color-navy-900)', fontSize: 48, marginBottom: 12 }}>Storico verifiche</h1>
        <p>Trova ogni richiesta, capisci lo stato e apri report o supporto quando serve.</p>
      </Card>
      <CheckList checks={customerDashboardChecks} />
    </CustomerShell>
  );
}
