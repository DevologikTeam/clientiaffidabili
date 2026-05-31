import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('email_provider_webhook_events')
@Index(['provider', 'providerEventId'], { unique: true })
@Index(['eventType', 'createdAt'])
export class EmailProviderWebhookEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  provider!: string;

  @Column({ name: 'provider_event_id' })
  providerEventId!: string;

  @Column({ name: 'provider_message_id', nullable: true })
  providerMessageId?: string;

  @Column({ name: 'event_type' })
  eventType!: string;

  @Column({ name: 'redacted_payload', type: 'jsonb', default: {} })
  redactedPayload!: Record<string, unknown>;

  @Column({ name: 'signature_valid', default: false })
  signatureValid!: boolean;

  @Column({ name: 'processed_at', type: 'timestamptz', nullable: true })
  processedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
