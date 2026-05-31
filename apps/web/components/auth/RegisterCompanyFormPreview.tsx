import { Button } from '@/components/ds';

export function RegisterCompanyFormPreview() {
  return (
    <form className="ca-form" aria-label="Registrazione account aziendale" autoComplete="on">
      <label>Nome e cognome<input name="name" placeholder="Mario Rossi" autoComplete="name" /></label>
      <label>Email aziendale<input name="email" type="email" placeholder="mario@azienda.it" autoComplete="email" /></label>
      <label>Ragione sociale<input name="companyName" placeholder="Azienda Srl" autoComplete="organization" /></label>
      <label>Partita IVA<input name="vatNumber" placeholder="IT00000000000" autoComplete="off" inputMode="text" /></label>
      <label>Password<input name="newPassword" type="password" placeholder="Almeno 12 caratteri" autoComplete="new-password" /></label>
      <label className="checkbox"><input type="checkbox" /> Accetto termini, privacy, uso consentito e limiti dei report.</label>
      <Button href="/dashboard">Crea account e continua</Button>
    </form>
  );
}
