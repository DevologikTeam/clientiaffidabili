import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { OpenaiCopilotUseCase, OpenaiDraftStatus } from '../openai-copilot-runtime.types';

@Entity('openai_copilot_drafts')
@Index(['status', 'createdAt'])
@Index(['targetType', 'targetId'])
export class OpenaiCopilotDraft {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'request_id' })
  requestId!: string;

  @Column({ type: 'varchar', name: 'use_case' })
  useCase!: OpenaiCopilotUseCase;

  @Column({ type: 'varchar', default: 'needs_review' })
  status!: OpenaiDraftStatus;

  @Column({ name: 'target_type' })
  targetType!: string;

  @Column({ name: 'target_id', nullable: true })
  targetId?: string;

  @Column()
  title!: string;

  @Column({ name: 'output_json', type: 'jsonb', default: {} })
  outputJson!: Record<string, unknown>;

  @Column({ name: 'validation_warnings', type: 'jsonb', default: [] })
  validationWarnings!: string[];

  @Column({ name: 'requires_human_review', default: true })
  requiresHumanReview!: boolean;

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy?: string;

  @Column({ name: 'review_reason', type: 'text', nullable: true })
  reviewReason?: string;

  @Column({ name: 'reviewed_at', type: 'timestamptz', nullable: true })
  reviewedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
