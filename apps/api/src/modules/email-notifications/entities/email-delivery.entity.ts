import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { EmailDeliveryStatus, EmailProviderKey } from '../email-notifications-runtime.types';

@Entity('email_deliveries')
@Index(['status', 'createdAt'])
@Index(['eventId', 'createdAt'])
@Index(['provider', 'providerMessageId'])
export class EmailDelivery {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'event_id' })
  eventId!: string;

  @Column({ name: 'template_key' })
  templateKey!: string;

  @Column({ name: 'recipient_redacted' })
  recipientRedacted!: string;

  @Column({ name: 'recipient_hash' })
  recipientHash!: string;

  @Column({ type: 'varchar', default: 'mock' })
  provider!: EmailProviderKey;

  @Column({ name: 'provider_message_id', nullable: true })
  providerMessageId?: string;

  @Column({ type: 'varchar', default: 'queued' })
  status!: EmailDeliveryStatus;

  @Column({ name: 'attempt_count', default: 0 })
  attemptCount!: number;

  @Column({ name: 'next_retry_at', type: 'timestamptz', nullable: true })
  nextRetryAt?: Date;

  @Column({ name: 'last_error_safe', type: 'text', nullable: true })
  lastErrorSafe?: string;

  @Column({ name: 'error_ledger_id', nullable: true })
  errorLedgerId?: string;

  @Column({ name: 'metadata_json', type: 'jsonb', default: {} })
  metadataJson!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
