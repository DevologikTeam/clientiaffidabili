import { legalConfirmations } from '@/lib/billing/checkout';

export function CheckoutLegalConfirmation() {
  return (
    <fieldset className="ca-stack ca-stack-sm">
      <legend className="ca-fieldset-legend">Conferme prima del pagamento</legend>
      {legalConfirmations.map((confirmation, index) => (
        <label className="ca-checkbox-row" key={confirmation}>
          <input type="checkbox" name={`legalConfirmation${index + 1}`} aria-describedby={`legal-confirmation-${index + 1}`} />
          <span id={`legal-confirmation-${index + 1}`}>{confirmation}</span>
        </label>
      ))}
    </fieldset>
  );
}
