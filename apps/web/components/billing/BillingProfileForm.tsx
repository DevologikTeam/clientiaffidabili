import { Field } from '@/components/ds';

export function BillingProfileForm() {
  return (
    <fieldset className="ca-stack ca-stack-sm">
      <legend className="ca-fieldset-legend">Dati di fatturazione</legend>
      <div className="form-row">
        <Field label="Ragione sociale" name="billingCompanyName" placeholder="Es. Rossi Srl" helpText="Usa la denominazione che deve comparire in fattura." />
        <Field label="Partita IVA" name="billingVatNumber" placeholder="IT01234567890" helpText="Serve per preparare il documento fiscale." />
      </div>
      <div className="form-row">
        <Field label="Email amministrativa" name="billingEmail" type="email" placeholder="amministrazione@example.it" helpText="Riceverai aggiornamenti su ordine, report e documenti." />
        <Field label="Codice SDI o PEC" name="billingRecipientCode" placeholder="USAL8PV / pec@example.it" helpText="Inserisci almeno un canale valido per la fatturazione elettronica." />
      </div>
      <div className="form-row">
        <Field label="Indirizzo" name="billingAddress" placeholder="Via, numero civico" />
        <Field label="CAP e Comune" name="billingCity" placeholder="00100 Roma" />
      </div>
    </fieldset>
  );
}
