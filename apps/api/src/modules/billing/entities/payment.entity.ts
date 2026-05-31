import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { CheckoutProvider, PaymentStatus } from '@clientiaffidabili/shared';

@Entity('payments')
@Index(['provider', 'providerPaymentId'], { unique: true })
export class Payment {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() orderId!: string;
  @Column({ nullable: true }) checkoutSessionId?: string;
  @Column({ default: 'mock' }) provider!: CheckoutProvider;
  @Column({ nullable: true }) providerPaymentId?: string;
  @Column({ default: 'pending' }) status!: PaymentStatus;
  @Column({ type: 'int' }) amountCents!: number;
  @Column({ default: 'EUR' }) currency!: 'EUR';
  @Column({ nullable: true }) paidAt?: Date;
  @Column({ type: 'jsonb', default: {} }) rawPayload!: Record<string, unknown>;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
