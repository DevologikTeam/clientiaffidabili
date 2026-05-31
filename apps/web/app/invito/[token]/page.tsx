import { AuthShell } from '@/components/auth';
import { Button } from '@/components/ds';
import { authFormsCopy } from '@/lib/auth/auth-accounts-runtime';

export default function AcceptInvitePage() {
  return (
    <AuthShell title={authFormsCopy.inviteTitle} subtitle="Completa il profilo per entrare nel team aziendale autorizzato.">
      <form className="ca-form" autoComplete="on">
        <label>Nome e cognome<input name="name" placeholder="Nome Cognome" autoComplete="name" /></label>
        <label>Password<input name="newPassword" type="password" placeholder="Almeno 12 caratteri" autoComplete="new-password" /></label>
        <label className="checkbox"><input type="checkbox" /> Accetto termini, privacy e uso consentito.</label>
        <Button href="/dashboard">Accetta invito</Button>
      </form>
    </AuthShell>
  );
}
