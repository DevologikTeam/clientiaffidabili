import { CustomerShell } from '@/components/customer-dashboard';
import { LegalAcceptancePanel } from '@/components/fiscal-legal';
import { fiscalLegalDashboard } from '@/lib/fiscal-legal/fiscal-legal-runtime';

export default function CustomerLegalPage() {
  return (
    <CustomerShell active="/dashboard/legale">
      <LegalAcceptancePanel acceptances={fiscalLegalDashboard.legalAcceptances} legalPack={fiscalLegalDashboard.legalPack} />
    </CustomerShell>
  );
}
