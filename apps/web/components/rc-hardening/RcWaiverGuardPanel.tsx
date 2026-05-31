import { TrustNotice } from '../ds';
import { m21sRcRuntimeGates } from '../../lib/rc-hardening/rc-hardening-runtime';

export function RcWaiverGuardPanel() {
  const waiverGates = m21sRcRuntimeGates.filter((gate) => gate.waiverAllowed);
  return (
    <section className="ca-card">
      <p className="ca-eyebrow">Waiver policy</p>
      <h2>Solo feature-off, mai provider live non certificati</h2>
      <p>Un waiver non rende pronta una funzione: la esclude dal perimetro RC e deve spegnere feature flag, percorso UI e comunicazione commerciale.</p>
      <div className="ca-stack">
        {waiverGates.map((gate) => (
          <TrustNotice key={gate.id} title={gate.label} tone={gate.blocksReleaseCandidate ? 'warning' : 'info'}>
            {gate.waiverControl ?? 'Waiver consentito solo con owner, scadenza e rischio accettato.'}
          </TrustNotice>
        ))}
      </div>
    </section>
  );
}
