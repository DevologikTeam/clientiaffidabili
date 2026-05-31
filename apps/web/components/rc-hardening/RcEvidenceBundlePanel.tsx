import { StatusPill } from '../ds';
import { m21sRcEvidenceBundle } from '../../lib/rc-hardening/rc-hardening-runtime';

export function RcEvidenceBundlePanel() {
  return (
    <section className="ca-card">
      <p className="ca-eyebrow">Evidence bundle</p>
      <h2>Bundle RC v{m21sRcEvidenceBundle.release}</h2>
      <p>
        Stato complessivo: <StatusPill label={m21sRcEvidenceBundle.overallStatus === 'blocked' ? 'Bloccato' : 'Pronto per RC'} tone={m21sRcEvidenceBundle.overallStatus === 'blocked' ? 'danger' : 'success'} />
      </p>
      <ul className="ca-checklist" aria-label="Artifact RC">
        {m21sRcEvidenceBundle.artifactInventory.map((artifact) => (
          <li key={artifact.id}>
            <span aria-hidden="true">{artifact.presentInPackage ? '✓' : '!'}</span>
            <span>
              <strong>{artifact.path}</strong><br />
              {artifact.requiredForRc ? 'Richiesto per RC' : 'Supporto'} · {artifact.presentInPackage ? 'presente nel pacchetto' : 'da allegare dal target'} · {artifact.redactionRule}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
