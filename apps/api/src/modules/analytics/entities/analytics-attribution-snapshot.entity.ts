import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { AttributionConversionType } from '../analytics-runtime.types';

@Entity('analytics_attribution_snapshots')
@Index(['conversionType', 'createdAt'])
@Index(['conversionId'])
export class AnalyticsAttributionSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'conversion_type' })
  conversionType!: AttributionConversionType;

  @Column({ name: 'conversion_id', nullable: true })
  conversionId?: string;

  @Column({ name: 'account_id', nullable: true })
  accountId?: string;

  @Column({ name: 'first_touch_json', type: 'jsonb', default: {} })
  firstTouchJson!: Record<string, unknown>;

  @Column({ name: 'last_touch_json', type: 'jsonb', default: {} })
  lastTouchJson!: Record<string, unknown>;

  @Column({ name: 'content_assist_json', type: 'jsonb', default: {} })
  contentAssistJson!: Record<string, unknown>;

  @Column({ name: 'redaction_summary', type: 'jsonb', default: {} })
  redactionSummary!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
