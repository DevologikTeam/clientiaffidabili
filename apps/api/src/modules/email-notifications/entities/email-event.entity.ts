import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { EmailCategory, EmailEventPayload, EmailEventStatus, EmailPriority } from '../email-notifications-runtime.types';

@Entity('email_events')
@Index(['eventKey', 'createdAt'])
@Index(['status', 'priority', 'createdAt'])
@Index(['recipientHash', 'createdAt'])
export class EmailEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'event_key' })
  eventKey!: string;

  @Column({ type: 'varchar' })
  category!: EmailCategory;

  @Column({ type: 'varchar', default: 'normal' })
  priority!: EmailPriority;

  @Column({ type: 'varchar', default: 'queued' })
  status!: EmailEventStatus;

  @Column({ name: 'template_key' })
  templateKey!: string;

  @Column({ name: 'template_version', default: 1 })
  templateVersion!: number;

  @Column({ name: 'recipient_hash' })
  recipientHash!: string;

  @Column({ name: 'recipient_domain', nullable: true })
  recipientDomain?: string;

  @Column({ name: 'recipient_redacted' })
  recipientRedacted!: string;

  @Column({ name: 'payload_json', type: 'jsonb', default: {} })
  payloadJson!: EmailEventPayload;

  @Column({ name: 'related_entities', type: 'jsonb', default: {} })
  relatedEntities!: Record<string, string | undefined>;

  @Column({ name: 'idempotency_key', nullable: true })
  idempotencyKey?: string;

  @Column({ name: 'requested_by', nullable: true })
  requestedBy?: string;

  @Column({ name: 'failure_reason', type: 'text', nullable: true })
  failureReason?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
