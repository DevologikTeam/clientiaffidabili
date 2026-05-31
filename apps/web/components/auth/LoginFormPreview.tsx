import Link from 'next/link';
import { Button } from '@/components/ds';

export function LoginFormPreview() {
  return (
    <form className="ca-form" aria-label="Accesso cliente" autoComplete="on">
      <label>Email aziendale<input name="email" type="email" placeholder="nome@azienda.it" autoComplete="username email" /></label>
      <label>Password<input name="password" type="password" placeholder="Password" autoComplete="current-password" /></label>
      <Button href="/dashboard">Accedi in sicurezza</Button>
      <p className="muted">Hai dimenticato la password? Il reset non rivela se l’email è registrata.</p>
      <Link href="/registrati">Crea account aziendale</Link>
    </form>
  );
}
