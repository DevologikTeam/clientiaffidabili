import { Badge, Card, DataTable } from '@/components/ds';
import { openaiCopilotRuntime } from '@/lib/openai-copilot/openai-copilot-runtime';

export function CopilotDraftQueue() {
  return (
    <Card className="ca-stack">
      <div>
        <p className="ca-eyebrow">Bozze</p>
        <h2>Output da revisionare</h2>
        <p>Ogni suggerimento resta in coda finché un admin non lo approva, applica o scarta con reason.</p>
      </div>
      <DataTable
        caption="Bozze copilot OpenAI"
        rows={openaiCopilotRuntime.sampleDrafts}
        columns={[
          { key: 'title', label: 'Bozza', render: (row: any) => row.title },
          { key: 'useCase', label: 'Use case', render: (row: any) => row.useCase },
          { key: 'status', label: 'Stato', render: (row: any) => <Badge tone="warning">{row.status}</Badge> },
        ]}
      />
    </Card>
  );
}
