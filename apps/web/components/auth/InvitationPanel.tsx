import { Button } from '@/components/ds';

export function InvitationPanel() {
  return (
    <section className="panel">
      <h2>Invita un membro</h2>
      <p>Ogni invito genera token monouso, scadenza, ruolo iniziale e audit. Per inviare o cambiare ruoli serve reason obbligatoria.</p>
      <div className="grid two">
        <label>Email<input placeholder="collega@azienda.it" /></label>
        <label>Ruolo<select><option>analyst</option><option>billing</option><option>viewer</option><option>admin</option></select></label>
      </div>
      <label>Motivo<input placeholder="Esempio: nuovo responsabile amministrativo" /></label>
      <Button href="#">Prepara invito</Button>
    </section>
  );
}
