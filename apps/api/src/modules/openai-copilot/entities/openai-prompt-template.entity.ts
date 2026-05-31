import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { OpenaiCopilotUseCase } from '../openai-copilot-runtime.types';

@Entity('openai_prompt_templates')
@Index(['key', 'version'], { unique: true })
@Index(['useCase', 'status'])
export class OpenaiPromptTemplate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  key!: string;

  @Column({ default: '1.0.0' })
  version!: string;

  @Column({ type: 'varchar', name: 'use_case' })
  useCase!: OpenaiCopilotUseCase;

  @Column({ type: 'varchar', default: 'active' })
  status!: 'draft' | 'active' | 'archived';

  @Column({ type: 'varchar', name: 'model_preference', default: 'low_cost' })
  modelPreference!: 'low_cost' | 'default' | 'high_quality';

  @Column({ name: 'system_instruction', type: 'text' })
  systemInstruction!: string;

  @Column({ name: 'task_instruction', type: 'text' })
  taskInstruction!: string;

  @Column({ name: 'output_schema_key', default: 'generic_schema_v1' })
  outputSchemaKey!: string;

  @Column({ name: 'prohibited_claims', type: 'jsonb', default: [] })
  prohibitedClaims!: string[];

  @Column({ name: 'requires_approval', default: true })
  requiresApproval!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
