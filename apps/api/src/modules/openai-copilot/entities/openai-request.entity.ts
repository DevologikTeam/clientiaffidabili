import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { OpenaiCopilotUseCase, OpenaiRequestStatus } from '../openai-copilot-runtime.types';

@Entity('openai_requests')
@Index(['useCase', 'createdAt'])
@Index(['status', 'createdAt'])
@Index(['targetType', 'targetId'])
export class OpenaiRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'use_case' })
  useCase!: OpenaiCopilotUseCase;

  @Column({ type: 'varchar', default: 'queued' })
  status!: OpenaiRequestStatus;

  @Column({ name: 'target_type' })
  targetType!: string;

  @Column({ name: 'target_id', nullable: true })
  targetId?: string;

  @Column({ name: 'actor_id' })
  actorId!: string;

  @Column({ name: 'prompt_template_key' })
  promptTemplateKey!: string;

  @Column({ name: 'prompt_template_version', default: '1.0.0' })
  promptTemplateVersion!: string;

  @Column({ name: 'provider_mode', default: 'mock' })
  providerMode!: string;

  @Column({ default: 'mock-safe-model' })
  model!: string;

  @Column({ name: 'redacted_context', type: 'jsonb', default: {} })
  redactedContext!: Record<string, unknown>;

  @Column({ name: 'redaction_summary', type: 'jsonb', default: {} })
  redactionSummary!: Record<string, unknown>;

  @Column({ name: 'output_json', type: 'jsonb', default: {} })
  outputJson!: Record<string, unknown>;

  @Column({ name: 'validation_warnings', type: 'jsonb', default: [] })
  validationWarnings!: string[];

  @Column({ name: 'cost_cents', type: 'int', default: 0 })
  costCents!: number;

  @Column({ name: 'error_summary', type: 'text', nullable: true })
  errorSummary?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
