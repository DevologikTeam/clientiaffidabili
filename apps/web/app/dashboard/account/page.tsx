import { CustomerShell } from '@/components/customer-dashboard';
import { SessionSecurityPanel } from '@/components/auth';
import { authRuntimeSnapshot } from '@/lib/auth/auth-accounts-runtime';

export default function AccountPage() {
  return (
    <CustomerShell active="/dashboard/account">
      <section className="dashboard-hero">
        <span className="eyebrow">Account aziendale</span>
        <h1>{authRuntimeSnapshot.account.legalName}</h1>
        <p>Stato account: {authRuntimeSnapshot.account.status}. Piano: {authRuntimeSnapshot.account.plan}. Owner: {authRuntimeSnapshot.account.owner}.</p>
      </section>
      <SessionSecurityPanel session={authRuntimeSnapshot.session} />
      <section className="panel">
        <h2>Azioni sensibili</h2>
        <p>Cambio email, password, ruoli, rimborsi e API key richiedono step-up e audit. MFA admin resta blocker prima del go-live.</p>
      </section>
    </CustomerShell>
  );
}
