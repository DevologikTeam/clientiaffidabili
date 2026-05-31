import { Button } from '@/components/ds';

export function RegisterCompanyFormPreview() {
  return (
    <form className="ca-form" aria-label="Registrazione account aziendale">
      <label>Nome e cognome<input placeholder="Mario Rossi" /></label>
      <label>Email aziendale<input type="email" placeholder="mario@azienda.it" /></label>
      <label>Ragione sociale<input placeholder="Azienda Srl" /></label>
      <label>Partita IVA<input placeholder="IT00000000000" /></label>
      <label>Password<input type="password" placeholder="Almeno 12 caratteri" /></label>
      <label className="checkbox"><input type="checkbox" /> Accetto termini, privacy, uso consentito e limiti dei report.</label>
      <Button href="/dashboard">Crea account e continua</Button>
    </form>
  );
}
