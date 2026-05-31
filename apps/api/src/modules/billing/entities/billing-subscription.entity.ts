import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { InternalSubscriptionStatus, PaymentProviderCode } from '../payment-providers-subscriptions.types';

@Entity('billing_subscriptions')
@Index(['customerAccountId', 'status'])
@Index(['provider', 'providerSubscriptionId'], { unique: true })
export class BillingSubscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  customerAccountId!: string;

  @Column({ type: 'varchar', length: 32 })
  provider!: PaymentProviderCode;

  @Column({ type: 'varchar', length: 160 })
  providerSubscriptionId!: string;

  @Column({ type: 'varchar', length: 80 })
  planCode!: string;

  @Column({ type: 'varchar', length: 32, default: 'pending' })
  status!: InternalSubscriptionStatus;

  @Column({ type: 'int', default: 0 })
  monthlyCredits!: number;

  @Column({ type: 'int', default: 0 })
  includedChecks!: number;

  @Column({ type: 'int', default: 0 })
  amountCents!: number;

  @Column({ type: 'varchar', length: 3, default: 'EUR' })
  currency!: 'EUR';

  @Column({ type: 'timestamptz', nullable: true })
  currentPeriodStart?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  currentPeriodEnd?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  cancelAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  cancelledAt?: Date;

  @Column({ type: 'jsonb', default: {} })
  entitlementSnapshot!: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  providerSnapshot!: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
