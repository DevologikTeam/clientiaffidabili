import { CustomerShell, SupportEntryCard } from '@/components/customer-dashboard';
import { customerDashboardTickets } from '@/lib/customer-dashboard/customer-dashboard-runtime';

export default function CustomerSupportPage() {
  return (
    <CustomerShell active="/dashboard/supporto">
      <SupportEntryCard tickets={customerDashboardTickets} />
    </CustomerShell>
  );
}
