import { CheckList, CustomerShell, DashboardStatusHero, NextBestActionCard, NotificationList } from '@/components/customer-dashboard';
import { customerDashboardSnapshot } from '@/lib/customer-dashboard/customer-dashboard-runtime';

export default function DashboardPage() {
  return (
    <CustomerShell active="/dashboard">
      <DashboardStatusHero summary={customerDashboardSnapshot.summary} />
      <NextBestActionCard action={customerDashboardSnapshot.summary.nextBestAction} />
      <CheckList checks={customerDashboardSnapshot.checks} />
      <NotificationList notifications={customerDashboardSnapshot.notifications} />
    </CustomerShell>
  );
}
