import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { AnalyticsConsentState, AnalyticsEventCategory, AnalyticsEventOrigin, AnalyticsEventStatus } from '../analytics-runtime.types';

@Entity('analytics_events')
@Index(['name', 'createdAt'])
@Index(['category', 'createdAt'])
@Index(['routeTemplate', 'createdAt'])
@Index(['contentCluster', 'createdAt'])
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'varchar' })
  category!: AnalyticsEventCategory;

  @Column({ type: 'varchar' })
  origin!: AnalyticsEventOrigin;

  @Column({ type: 'varchar', name: 'consent_state', default: 'unknown' })
  consentState!: AnalyticsConsentState;

  @Column({ name: 'route_template', nullable: true })
  routeTemplate?: string;

  @Column({ name: 'content_cluster', nullable: true })
  contentCluster?: string;

  @Column({ name: 'attribution_snapshot_id', nullable: true })
  attributionSnapshotId?: string;

  @Column({ name: 'account_id', nullable: true })
  accountId?: string;

  @Column({ name: 'order_id', nullable: true })
  orderId?: string;

  @Column({ name: 'error_ledger_id', nullable: true })
  errorLedgerId?: string;

  @Column({ name: 'server_authoritative', default: false })
  serverAuthoritative!: boolean;

  @Column({ type: 'varchar', default: 'accepted' })
  status!: AnalyticsEventStatus;

  @Column({ name: 'payload_json', type: 'jsonb', default: {} })
  payloadJson!: Record<string, unknown>;

  @Column({ name: 'redaction_summary', type: 'jsonb', default: {} })
  redactionSummary!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
