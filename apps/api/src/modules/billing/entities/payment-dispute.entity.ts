import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { PaymentProviderCode } from '../payment-providers-subscriptions.types';

export type PaymentDisputeStatus = 'warning_needs_response' | 'needs_response' | 'under_review' | 'won' | 'lost' | 'closed';

@Entity('payment_disputes')
@Index(['paymentId', 'status'])
@Index(['provider', 'providerDisputeId'], { unique: true })
export class PaymentDispute {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  paymentId!: string;

  @Column({ type: 'uuid', nullable: true })
  orderId?: string;

  @Column({ type: 'varchar', length: 32 })
  provider!: PaymentProviderCode;

  @Column({ type: 'varchar', length: 160 })
  providerDisputeId!: string;

  @Column({ type: 'varchar', length: 40 })
  status!: PaymentDisputeStatus;

  @Column({ type: 'int', default: 0 })
  amountCents!: number;

  @Column({ type: 'varchar', length: 3, default: 'EUR' })
  currency!: 'EUR';

  @Column({ type: 'varchar', length: 120, nullable: true })
  reason?: string;

  @Column({ type: 'timestamptz', nullable: true })
  evidenceDueBy?: Date;

  @Column({ type: 'jsonb', default: {} })
  redactedProviderSnapshot!: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
