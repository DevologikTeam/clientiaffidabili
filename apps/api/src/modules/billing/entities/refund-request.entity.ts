import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { PaymentProviderCode, RefundPolicyDecision, RefundRequestStatus } from '../payment-providers-subscriptions.types';

@Entity('refund_requests')
@Index(['paymentId', 'status'])
@Index(['provider', 'providerRefundId'])
export class RefundRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  paymentId!: string;

  @Column({ type: 'uuid', nullable: true })
  orderId?: string;

  @Column({ type: 'uuid', nullable: true })
  subscriptionId?: string;

  @Column({ type: 'varchar', length: 32 })
  provider!: PaymentProviderCode;

  @Column({ type: 'varchar', length: 160, nullable: true })
  providerRefundId?: string;

  @Column({ type: 'varchar', length: 32, default: 'requested' })
  status!: RefundRequestStatus;

  @Column({ type: 'int' })
  amountCents!: number;

  @Column({ type: 'varchar', length: 3, default: 'EUR' })
  currency!: 'EUR';

  @Column({ type: 'varchar', length: 220 })
  reason!: string;

  @Column({ type: 'jsonb', default: {} })
  policyDecision!: RefundPolicyDecision | Record<string, unknown>;

  @Column({ type: 'varchar', length: 160, nullable: true })
  providerPaymentReference?: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  idempotencyKey?: string;

  @Column({ type: 'jsonb', default: {} })
  providerSnapshot!: Record<string, unknown>;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
