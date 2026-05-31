import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { EmailSuppressionReason } from '../email-notifications-runtime.types';

@Entity('email_suppressions')
@Index(['recipientHash'], { unique: true })
@Index(['reason', 'createdAt'])
export class EmailSuppression {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'recipient_hash' })
  recipientHash!: string;

  @Column({ name: 'recipient_redacted' })
  recipientRedacted!: string;

  @Column({ type: 'varchar' })
  reason!: EmailSuppressionReason;

  @Column({ name: 'source_delivery_id', nullable: true })
  sourceDeliveryId?: string;

  @Column({ name: 'note', type: 'text', nullable: true })
  note?: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
