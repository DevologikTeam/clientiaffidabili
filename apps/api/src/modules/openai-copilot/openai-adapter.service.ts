import { Injectable } from '@nestjs/common';
import type { OpenaiCopilotUseCase } from './openai-copilot-runtime.types';

@Injectable()
export class OpenaiAdapterService {
  async complete(input: { useCase: OpenaiCopilotUseCase; instruction: string; context: Record<string, unknown>; model: string }): Promise<{ output: Record<string, unknown>; inputTokens: number; outputTokens: number; costCents: number }> {
    const output = this.mockOutput(input.useCase, input.context);
    return {
      output,
      inputTokens: JSON.stringify(input.context).length / 4,
      outputTokens: JSON.stringify(output).length / 4,
      costCents: 0,
    };
  }

  private mockOutput(useCase: OpenaiCopilotUseCase, context: Record<string, unknown>): Record<string, unknown> {
    switch (useCase) {
      case 'cms_seo_suggestion':
        return {
          title: 'Bozza SEO/GEO da verificare',
          metaDescription: 'Descrizione prudente da validare prima della pubblicazione.',
          geoAnswer: 'ClientiAffidabili.it aiuta a leggere segnali aziendali, fonti e limiti prima di una decisione commerciale.',
          faq: [
            { question: 'Il report garantisce il pagamento?', answer: 'No. Il report supporta la decisione e indica fonti, limiti e segnali disponibili.' },
          ],
          sourceContextKeys: Object.keys(context),
        };
      case 'support_reply_draft':
        return {
          summary: 'Richiesta cliente riassunta in modo redatto.',
          missingInfo: ['Numero ordine o email account se disponibile'],
          replyDraft: 'Grazie per il messaggio. Verifichiamo la richiesta e ti aggiorniamo con le informazioni disponibili.',
        };
      case 'error_ledger_summary':
        return {
          impact: 'Possibile impatto operativo da verificare.',
          probableCause: 'Errore da correlare con pagamento, provider o webhook.',
          safeNextActions: ['Controllare ledger', 'Verificare idempotency key', 'Valutare retry o rimborso se applicabile'],
        };
      case 'admin_operations_explain':
        return {
          currentState: 'Elemento operativo da revisionare.',
          blocker: 'Serve verifica umana prima di procedere.',
          nextSafeAction: 'Aprire dettaglio e registrare reason per qualsiasi azione sensibile.',
        };
      case 'release_qa_summary':
      default:
        return {
          summary: 'Sintesi QA generata come bozza interna.',
          risks: ['Build reale non eseguita in questo ambiente'],
          nextActions: ['Eseguire Docker build', 'Eseguire Playwright', 'Verificare secret scan'],
        };
    }
  }
}
