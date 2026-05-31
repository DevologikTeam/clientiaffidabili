import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('analytics_kpi_snapshots')
@Index(['periodKey', 'createdAt'])
@Index(['metricKey'])
export class AnalyticsKpiSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'period_key' })
  periodKey!: string;

  @Column({ name: 'metric_key' })
  metricKey!: string;

  @Column({ name: 'metric_group' })
  metricGroup!: string;

  @Column({ name: 'value_json', type: 'jsonb', default: {} })
  valueJson!: Record<string, unknown>;

  @Column({ name: 'source', default: 'internal_event_ledger' })
  source!: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
