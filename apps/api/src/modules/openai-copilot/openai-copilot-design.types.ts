export type OpenaiUseCase =
  | 'cms_seo_suggestion'
  | 'support_reply_draft'
  | 'error_ledger_summary'
  | 'admin_operations_explain'
  | 'release_qa_summary';

export type OpenaiDraftStatus = 'draft' | 'needs_review' | 'approved' | 'applied' | 'discarded' | 'blocked' | 'expired';

export interface OpenaiCopilotSettingsBlueprint {
  enabled: boolean;
  apiKeySecretRef?: string;
  defaultModel: string;
  lowCostModel: string;
  maxInputTokens: number;
  maxOutputTokens: number;
  dailyBudgetCents: number;
  monthlyBudgetCents: number;
  redactionMode: 'strict' | 'balanced';
  logPromptOutputMode: 'metadata_only' | 'redacted_excerpt' | 'disabled';
  allowedUseCases: OpenaiUseCase[];
  requireApprovalForPublicContent: boolean;
}

export interface OpenaiPromptTemplateBlueprint {
  key: string;
  version: string;
  useCase: OpenaiUseCase;
  status: 'draft' | 'active' | 'archived';
  modelPreference: 'default' | 'low_cost' | 'high_quality';
  systemInstruction: string;
  taskInstruction: string;
  prohibitedClaims: string[];
  outputSchemaKey: string;
  requiresApproval: boolean;
}

export interface OpenaiContextPackBlueprint {
  useCase: OpenaiUseCase;
  targetType: 'seo_page' | 'support_ticket' | 'error_event' | 'admin_work_item' | 'release';
  targetId?: string;
  redactedPayload: Record<string, unknown>;
  redactionSummary: {
    redactedFields: number;
    categories: string[];
    contextHash: string;
  };
}

export interface OpenaiCopilotDraftBlueprint {
  id: string;
  useCase: OpenaiUseCase;
  status: OpenaiDraftStatus;
  title: string;
  output: Record<string, unknown>;
  validationWarnings: string[];
  requiresHumanReview: boolean;
}
