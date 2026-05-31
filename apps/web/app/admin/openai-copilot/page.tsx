import { PageHero } from '@/components/ds';
import { CopilotDraftQueue, CopilotGuardrailChecklist, CopilotStatusPanel, CopilotUseCaseGrid } from '@/components/openai-copilot';

export default function AdminOpenaiCopilotPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Admin AI"
        title="OpenAI copilot interno"
        description="Assistenza controllata per CMS, supporto, error ledger, operations e QA. Ogni output resta una bozza da verificare."
      />
      <CopilotStatusPanel />
      <section className="ca-section">
        <h2>Use case disponibili</h2>
        <CopilotUseCaseGrid />
      </section>
      <CopilotDraftQueue />
      <CopilotGuardrailChecklist />
    </main>
  );
}
