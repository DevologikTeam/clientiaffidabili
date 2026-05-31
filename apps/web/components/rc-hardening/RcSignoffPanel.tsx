import { StatusPill } from '../ds';
import { m21sRcEvidenceBundle } from '../../lib/rc-hardening/rc-hardening-runtime';

export function RcSignoffPanel() {
  return (
    <section className="ca-card">
      <p className="ca-eyebrow">Sign-off</p>
      <h2>Responsabili prima della RC</h2>
      <p>Le firme restano pending finche i gate P0 non hanno evidenza reale. Il pacchetto non dichiara la RC pronta.</p>
      <div className="ca-stack">
        {m21sRcEvidenceBundle.signoffs.map((signoff) => (
          <article className="ca-card ca-card--compact" key={signoff.role}>
            <StatusPill label={signoff.status === 'signed' ? 'Firmato' : 'Pending'} tone={signoff.status === 'signed' ? 'success' : 'warning'} />
            <h3>{signoff.role}</h3>
            <p>{signoff.owner}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
