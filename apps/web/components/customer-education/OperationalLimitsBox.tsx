import { TrustNotice } from '@/components/ds';

export function OperationalLimitsBox({ notes }: { notes: ReadonlyArray<string> }) {
  return (
    <section className="ca-education-block" id="garanzia-operativa-e-limiti">
      <h2>Garanzia operativa e limiti</h2>
      <TrustNotice tone="warning" title="Da leggere prima della decisione">
        Il servizio supporta la valutazione, ma non sostituisce consulenza legale, finanziaria o procedure interne.
      </TrustNotice>
      <ul>
        {notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
    </section>
  );
}
