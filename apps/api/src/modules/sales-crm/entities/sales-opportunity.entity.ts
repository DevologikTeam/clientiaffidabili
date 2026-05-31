import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { OpportunityStage } from '../sales-crm.types';

@Entity('crm_sales_opportunities')
@Index(['stage', 'createdAt'])
@Index(['leadId'])
export class SalesOpportunity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'lead_id' })
  leadId!: string;

  @Column()
  title!: string;

  @Column({ type: 'varchar', default: 'qualified' })
  stage!: OpportunityStage;

  @Column({ name: 'estimated_value_cents', default: 0 })
  estimatedValueCents!: number;

  @Column({ name: 'currency', default: 'EUR' })
  currency!: string;

  @Column({ name: 'expected_close_at', type: 'timestamptz', nullable: true })
  expectedCloseAt?: Date;

  @Column({ name: 'lost_reason', type: 'text', nullable: true })
  lostReason?: string;

  @Column({ name: 'next_action', type: 'text', nullable: true })
  nextAction?: string;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
