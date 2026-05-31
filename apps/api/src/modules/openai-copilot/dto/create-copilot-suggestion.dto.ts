import { IsIn, IsObject, IsOptional, IsString } from 'class-validator';
import type { OpenaiCopilotUseCase } from '../openai-copilot-runtime.types';

export class CreateCopilotSuggestionDto {
  @IsIn(['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'])
  useCase!: OpenaiCopilotUseCase;

  @IsIn(['seo_page', 'support_ticket', 'error_event', 'admin_work_item', 'release'])
  targetType!: 'seo_page' | 'support_ticket' | 'error_event' | 'admin_work_item' | 'release';

  @IsOptional()
  @IsString()
  targetId?: string;

  @IsString()
  actorId!: string;

  @IsObject()
  context!: Record<string, unknown>;

  @IsOptional()
  @IsString()
  instruction?: string;
}
