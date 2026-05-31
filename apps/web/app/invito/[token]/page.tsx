import { AuthShell } from '@/components/auth';
import { Button } from '@/components/ds';
import { authFormsCopy } from '@/lib/auth/auth-accounts-runtime';

export default function AcceptInvitePage() {
  return (
    <AuthShell title={authFormsCopy.inviteTitle} subtitle="Completa il profilo per entrare nel team aziendale autorizzato.">
      <form className="ca-form">
        <label>Nome e cognome<input placeholder="Nome Cognome" /></label>
        <label>Password<input type="password" placeholder="Almeno 12 caratteri" /></label>
        <label className="checkbox"><input type="checkbox" /> Accetto termini, privacy e uso consentito.</label>
        <Button href="/dashboard">Accetta invito</Button>
      </form>
    </AuthShell>
  );
}
