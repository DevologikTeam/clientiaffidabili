import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('openai_usage_ledger_entries')
@Index(['createdAt'])
@Index(['useCase', 'createdAt'])
export class OpenaiUsageLedgerEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'request_id' })
  requestId!: string;

  @Column({ name: 'use_case' })
  useCase!: string;

  @Column({ default: 'mock-safe-model' })
  model!: string;

  @Column({ name: 'input_tokens', type: 'int', default: 0 })
  inputTokens!: number;

  @Column({ name: 'output_tokens', type: 'int', default: 0 })
  outputTokens!: number;

  @Column({ name: 'estimated_cost_cents', type: 'int', default: 0 })
  estimatedCostCents!: number;

  @Column({ type: 'varchar', name: 'budget_state', default: 'ok' })
  budgetState!: 'ok' | 'warning' | 'blocked';

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
