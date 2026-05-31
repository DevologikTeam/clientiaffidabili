import { CustomerShell } from '@/components/customer-dashboard';
import { FiscalDocumentTable, LegalAcceptancePanel, TaxProfilePanel } from '@/components/fiscal-legal';
import { fiscalLegalDashboard } from '@/lib/fiscal-legal/fiscal-legal-runtime';

export default function CustomerFiscalProfilePage() {
  return (
    <CustomerShell active="/dashboard/profilo-fiscale">
      <TaxProfilePanel profile={fiscalLegalDashboard.taxProfile} />
      <FiscalDocumentTable documents={fiscalLegalDashboard.fiscalDocuments} />
      <LegalAcceptancePanel acceptances={fiscalLegalDashboard.legalAcceptances} legalPack={fiscalLegalDashboard.legalPack} />
    </CustomerShell>
  );
}
