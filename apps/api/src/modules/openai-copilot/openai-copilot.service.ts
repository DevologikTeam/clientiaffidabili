import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsAdminService } from '../settings-admin/settings-admin.service';
import { OpenaiAdapterService } from './openai-adapter.service';
import { OpenaiOutputGuardService } from './openai-output-guard.service';
import { OpenaiRedactionService } from './openai-redaction.service';
import { OPENAI_PROMPT_REGISTRY } from './openai-prompt-registry';
import { OpenaiCopilotDraft } from './entities/openai-copilot-draft.entity';
import { OpenaiPromptTemplate } from './entities/openai-prompt-template.entity';
import { OpenaiRequest } from './entities/openai-request.entity';
import { OpenaiUsageLedgerEntry } from './entities/openai-usage-ledger.entity';
import type { OpenaiCopilotSettingsSnapshot, OpenaiCopilotSuggestionRequest, OpenaiCopilotSuggestionResponse, OpenaiCopilotUseCase } from './openai-copilot-runtime.types';

const DEFAULT_ALLOWED_USE_CASES: OpenaiCopilotUseCase[] = ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'];

@Injectable()
export class OpenaiCopilotService {
  constructor(
    @InjectRepository(OpenaiPromptTemplate) private readonly templates: Repository<OpenaiPromptTemplate>,
    @InjectRepository(OpenaiRequest) private readonly requests: Repository<OpenaiRequest>,
    @InjectRepository(OpenaiUsageLedgerEntry) private readonly usageLedger: Repository<OpenaiUsageLedgerEntry>,
    @InjectRepository(OpenaiCopilotDraft) private readonly drafts: Repository<OpenaiCopilotDraft>,
    private readonly settings: SettingsAdminService,
    private readonly redaction: OpenaiRedactionService,
    private readonly adapter: OpenaiAdapterService,
    private readonly outputGuard: OpenaiOutputGuardService,
  ) {}

  async overview() {
    const [settings, recentDrafts, recentRequests] = await Promise.all([
      this.settingsSnapshot(),
      this.drafts.find({ order: { createdAt: 'DESC' }, take: 8 }),
      this.requests.find({ order: { createdAt: 'DESC' }, take: 8 }),
    ]);
    return {
      settings,
      status: settings.enabled ? 'enabled_for_internal_review' : 'disabled',
      policy: 'AI propone -> Admin verifica -> Admin approva -> Sistema audita',
      enabledUseCases: settings.allowedUseCases,
      pendingDrafts: recentDrafts.filter((draft) => draft.status === 'needs_review').length,
      recentDrafts,
      recentRequests,
    };
  }

  async suggest(input: OpenaiCopilotSuggestionRequest): Promise<OpenaiCopilotSuggestionResponse> {
    const settings = await this.settingsSnapshot();
    if (!settings.enabled) throw new BadRequestException('OpenAI copilot disabilitato da admin settings.');
    if (!settings.allowedUseCases.includes(input.useCase)) throw new BadRequestException('Use case OpenAI non abilitato.');

    const template = await this.getTemplate(input.useCase);
    const redacted = this.redaction.redact(input.context);
    const request = await this.requests.save(this.requests.create({
      useCase: input.useCase,
      status: 'redacted',
      targetType: input.targetType,
      targetId: input.targetId,
      actorId: input.actorId,
      promptTemplateKey: template.key,
      promptTemplateVersion: template.version,
      providerMode: settings.providerMode,
      model: template.modelPreference === 'low_cost' ? settings.lowCostModel : settings.defaultModel,
      redactedContext: redacted.payload,
      redactionSummary: redacted.summary,
    }));

    const completion = await this.adapter.complete({
      useCase: input.useCase,
      instruction: input.instruction ?? template.taskInstruction,
      context: redacted.payload,
      model: request.model,
    });
    const warnings = this.outputGuard.validateOutput(completion.output);
    const blocked = this.outputGuard.shouldBlock(warnings);
    request.status = blocked ? 'blocked' : 'completed';
    request.outputJson = completion.output;
    request.validationWarnings = warnings;
    request.costCents = completion.costCents;
    await this.requests.save(request);

    await this.usageLedger.save(this.usageLedger.create({
      requestId: request.id,
      useCase: request.useCase,
      model: request.model,
      inputTokens: Math.round(completion.inputTokens),
      outputTokens: Math.round(completion.outputTokens),
      estimatedCostCents: completion.costCents,
      budgetState: 'ok',
      metadata: { providerMode: settings.providerMode, targetType: input.targetType },
    }));

    const draft = await this.drafts.save(this.drafts.create({
      requestId: request.id,
      useCase: input.useCase,
      status: blocked ? 'blocked' : 'needs_review',
      targetType: input.targetType,
      targetId: input.targetId,
      title: this.titleForUseCase(input.useCase),
      outputJson: completion.output,
      validationWarnings: warnings,
      requiresHumanReview: template.requiresApproval || settings.requireApprovalForPublicContent,
    }));

    return {
      requestId: request.id,
      draftId: draft.id,
      useCase: draft.useCase,
      status: draft.status,
      title: draft.title,
      output: draft.outputJson,
      warnings: draft.validationWarnings,
      requiresApproval: draft.requiresHumanReview,
    };
  }

  async listDrafts(status?: string) {
    const where = status ? { status: status as OpenaiCopilotDraft['status'] } : {};
    return this.drafts.find({ where, order: { createdAt: 'DESC' }, take: 50 });
  }

  async reviewDraft(id: string, input: { status: 'approved' | 'applied' | 'discarded'; reason: string; actorId: string }) {
    const draft = await this.drafts.findOne({ where: { id } });
    if (!draft) throw new NotFoundException('Bozza OpenAI non trovata.');
    if (draft.status === 'blocked') throw new BadRequestException('La bozza e bloccata e non puo essere approvata.');
    draft.status = input.status;
    draft.reviewReason = input.reason;
    draft.reviewedBy = input.actorId;
    draft.reviewedAt = new Date();
    return this.drafts.save(draft);
  }

  async usageSummary() {
    const entries = await this.usageLedger.find({ order: { createdAt: 'DESC' }, take: 200 });
    const totalCostCents = entries.reduce((sum, entry) => sum + entry.estimatedCostCents, 0);
    return {
      entries: entries.slice(0, 25),
      totalCostCents,
      totalRequests: entries.length,
      byUseCase: DEFAULT_ALLOWED_USE_CASES.map((useCase) => ({
        useCase,
        count: entries.filter((entry) => entry.useCase === useCase).length,
      })),
    };
  }

  private async getTemplate(useCase: OpenaiCopilotUseCase): Promise<OpenaiPromptTemplate> {
    const existing = await this.templates.findOne({ where: { useCase, status: 'active' } });
    if (existing) return existing;
    const seed = OPENAI_PROMPT_REGISTRY.find((template) => template.useCase === useCase);
    if (!seed) throw new BadRequestException('Prompt template non configurato per questo use case.');
    return this.templates.save(this.templates.create({
      key: seed.key,
      version: seed.version,
      useCase: seed.useCase,
      status: seed.status,
      modelPreference: seed.modelPreference,
      systemInstruction: seed.systemInstruction,
      taskInstruction: seed.taskInstruction,
      outputSchemaKey: seed.outputSchemaKey,
      prohibitedClaims: seed.prohibitedClaims,
      requiresApproval: seed.requiresApproval,
    }));
  }

  private async settingsSnapshot(): Promise<OpenaiCopilotSettingsSnapshot> {
    const namespace = await this.settings.listNamespace('openai');
    const value = (key: string, fallback: unknown) => namespace.settings.find((setting) => setting.key === key)?.displayValue ?? fallback;
    const rawAllowed = value('openai.allowedUseCases', DEFAULT_ALLOWED_USE_CASES);
    return {
      enabled: Boolean(value('openai.enabled', false)),
      providerMode: 'mock',
      defaultModel: String(value('openai.defaultModel', 'gpt-4.1-mini')),
      lowCostModel: String(value('openai.lowCostModel', 'gpt-4.1-mini')),
      dailyBudgetCents: Number(value('openai.dailyBudgetCents', 500)),
      monthlyBudgetCents: Number(value('openai.monthlyBudgetCents', 5000)),
      allowedUseCases: Array.isArray(rawAllowed) ? rawAllowed as OpenaiCopilotUseCase[] : DEFAULT_ALLOWED_USE_CASES,
      requireApprovalForPublicContent: Boolean(value('openai.requireApprovalForPublicContent', true)),
    };
  }

  private titleForUseCase(useCase: OpenaiCopilotUseCase): string {
    const labels: Record<OpenaiCopilotUseCase, string> = {
      cms_seo_suggestion: 'Suggerimento CMS SEO/GEO',
      support_reply_draft: 'Bozza risposta supporto',
      error_ledger_summary: 'Sintesi error ledger',
      admin_operations_explain: 'Spiegazione operativa admin',
      release_qa_summary: 'Sintesi QA/release',
    };
    return labels[useCase];
  }
}
