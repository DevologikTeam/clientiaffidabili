export type OpenaiCopilotUseCase =
  | 'cms_seo_suggestion'
  | 'support_reply_draft'
  | 'error_ledger_summary'
  | 'admin_operations_explain'
  | 'release_qa_summary';

export type OpenaiRequestStatus = 'queued' | 'redacted' | 'sent' | 'completed' | 'blocked' | 'failed';
export type OpenaiDraftStatus = 'needs_review' | 'approved' | 'applied' | 'discarded' | 'blocked';
export type OpenaiProviderMode = 'mock' | 'openai';

export interface OpenaiCopilotSettingsSnapshot {
  enabled: boolean;
  providerMode: OpenaiProviderMode;
  defaultModel: string;
  lowCostModel: string;
  dailyBudgetCents: number;
  monthlyBudgetCents: number;
  allowedUseCases: OpenaiCopilotUseCase[];
  requireApprovalForPublicContent: boolean;
}

export interface OpenaiCopilotSuggestionRequest {
  useCase: OpenaiCopilotUseCase;
  targetType: 'seo_page' | 'support_ticket' | 'error_event' | 'admin_work_item' | 'release';
  targetId?: string;
  actorId: string;
  context: Record<string, unknown>;
  instruction?: string;
}

export interface OpenaiCopilotSuggestionResponse {
  requestId: string;
  draftId: string;
  useCase: OpenaiCopilotUseCase;
  status: OpenaiDraftStatus;
  title: string;
  output: Record<string, unknown>;
  warnings: string[];
  requiresApproval: boolean;
}

export interface RedactionResult {
  payload: Record<string, unknown>;
  summary: {
    redactedFields: number;
    redactedKeys: string[];
    blockedCategories: string[];
  };
}
