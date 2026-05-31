import { Card, Stepper } from '../ds';
import { sandboxRunResults } from '../../lib/sandbox-certification/sandbox-certification-runtime';

export function CertificationRunTimeline() {
  return (
    <Card>
      <p className="ca-eyebrow">Run timeline</p>
      <h2>Ultima run M19-S preview</h2>
      <Stepper
        orientation="vertical"
        items={sandboxRunResults.map((result) => ({
          label: result.scenarioKey,
          description: result.safeMessage,
          state: result.status === 'passed' || result.status === 'waived' ? 'done' : result.status === 'blocked' || result.status === 'failed' ? 'blocked' : 'todo',
        }))}
      />
    </Card>
  );
}
