import { CustomerShell } from '@/components/customer-dashboard';
import { InvitationPanel, PermissionMatrix, SessionSecurityPanel, TeamMembersTable } from '@/components/auth';
import { authRuntimeSnapshot } from '@/lib/auth/auth-accounts-runtime';

export default function TeamPage() {
  return (
    <CustomerShell active="/dashboard/team">
      <section className="dashboard-hero">
        <span className="eyebrow">Account e team</span>
        <h1>Gestisci chi puo accedere alle verifiche</h1>
        <p>Ruoli, inviti e sessioni sono separati dai dati operativi: ogni accesso a report, fatture e ordini deve essere autorizzato a livello oggetto.</p>
      </section>
      <TeamMembersTable members={authRuntimeSnapshot.members} />
      <InvitationPanel />
      <PermissionMatrix permissions={authRuntimeSnapshot.permissions} />
      <SessionSecurityPanel session={authRuntimeSnapshot.session} />
    </CustomerShell>
  );
}
