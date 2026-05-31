import { Card } from '../ds';
import { sandboxEvidencePreview } from '../../lib/sandbox-certification/sandbox-certification-runtime';

export function CertificationEvidenceList() {
  return (
    <Card>
      <p className="ca-eyebrow">Evidenze redatte</p>
      <h2>Evidence ledger</h2>
      <div className="ca-stack">
        {sandboxEvidencePreview.map((evidence) => (
          <article className="ca-card ca-card--interactive" key={evidence.id}>
            <p className="ca-eyebrow">{evidence.type}</p>
            <h3>{evidence.safeLabel}</h3>
            <p>{evidence.scenarioKey}</p>
            <pre className="ca-code-block">{JSON.stringify(evidence.redactedPayload, null, 2)}</pre>
          </article>
        ))}
      </div>
    </Card>
  );
}
