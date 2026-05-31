import { CustomerShell, InvoiceList } from '@/components/customer-dashboard';
import { customerDashboardInvoices } from '@/lib/customer-dashboard/customer-dashboard-runtime';

export default function CustomerInvoicesPage() {
  return (
    <CustomerShell active="/dashboard/fatture">
      <InvoiceList invoices={customerDashboardInvoices} />
    </CustomerShell>
  );
}
