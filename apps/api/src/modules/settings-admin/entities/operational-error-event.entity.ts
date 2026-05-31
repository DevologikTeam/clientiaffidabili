import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { OperationalErrorCategory, OperationalErrorSeverity, OperationalErrorStatus } from '../settings-admin-runtime.types';

@Entity('operational_error_events')
@Index(['category', 'status', 'createdAt'])
@Index(['severity', 'status'])
export class OperationalErrorEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  category!: OperationalErrorCategory;

  @Column({ type: 'varchar', default: 'error' })
  severity!: OperationalErrorSeverity;

  @Column({ type: 'varchar', default: 'new' })
  status!: OperationalErrorStatus;

  @Column({ name: 'source_module' })
  sourceModule!: string;

  @Column({ name: 'source_action' })
  sourceAction!: string;

  @Column({ name: 'safe_message', type: 'text' })
  safeMessage!: string;

  @Column({ name: 'technical_summary', type: 'text' })
  technicalSummary!: string;

  @Column({ name: 'redacted_payload', type: 'jsonb', default: {} })
  redactedPayload!: Record<string, unknown>;

  @Column({ name: 'linked_objects', type: 'jsonb', default: {} })
  linkedObjects!: Record<string, string | undefined>;

  @Column({ name: 'assigned_to', nullable: true })
  assignedTo?: string;

  @Column({ name: 'refund_relevant', default: false })
  refundRelevant!: boolean;

  @Column({ name: 'fix_reference', nullable: true })
  fixReference?: string;

  @Column({ name: 'resolution_reason', type: 'text', nullable: true })
  resolutionReason?: string;

  @Column({ type: 'jsonb', default: [] })
  events!: Array<Record<string, unknown>>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
