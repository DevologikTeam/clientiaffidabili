import Link from 'next/link';
import { Button } from '@/components/ds';

export function LoginFormPreview() {
  return (
    <form className="ca-form" aria-label="Accesso cliente">
      <label>Email aziendale<input type="email" placeholder="nome@azienda.it" /></label>
      <label>Password<input type="password" placeholder="Password" /></label>
      <Button href="/dashboard">Accedi in sicurezza</Button>
      <p className="muted">Hai dimenticato la password? Il reset non rivela se l’email è registrata.</p>
      <Link href="/registrati">Crea account aziendale</Link>
    </form>
  );
}
