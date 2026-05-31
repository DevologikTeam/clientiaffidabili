const items = [
  { value: '3', label: 'decisioni guidate', detail: 'cliente, fornitore, dato operativo' },
  { value: '€14,90', label: 'primo servizio', detail: 'prezzo netto visibile prima dell’acquisto' },
  { value: 'Fonti', label: 'limiti dichiarati', detail: 'il report spiega cosa è stato verificato' },
  { value: 'Supporto', label: 'assistenza e rimborso', detail: 'stato della verifica sempre tracciabile' },
];

export function CommercialProofStrip() {
  return (
    <div className="ca-commercial-proof" aria-label="Elementi di fiducia ClientiAffidabili.it">
      {items.map((item) => (
        <div key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
          <small>{item.detail}</small>
        </div>
      ))}
    </div>
  );
}
