import type { CustomerRole } from '@/lib/auth/auth-accounts-runtime';

export function TeamMembersTable({ members }: { members: ReadonlyArray<{ id: string; name: string; email: string; role: CustomerRole; status: string; lastAccess: string }> }) {
  return (
    <div className="table-card">
      <h2>Team autorizzato</h2>
      <table>
        <thead><tr><th>Utente</th><th>Ruolo</th><th>Stato</th><th>Ultimo accesso</th></tr></thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td><strong>{member.name}</strong><br /><span>{member.email}</span></td>
              <td>{member.role}</td>
              <td>{member.status}</td>
              <td>{member.lastAccess}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
