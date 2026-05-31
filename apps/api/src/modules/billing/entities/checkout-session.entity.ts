import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { CheckoutProvider, CheckoutSessionStatus } from '@clientiaffidabili/shared';

@Entity('checkout_sessions')
@Index(['provider', 'externalId'], { unique: true })
export class CheckoutSession {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() orderId!: string;
  @Column({ default: 'mock' }) provider!: CheckoutProvider;
  @Column() externalId!: string;
  @Column({ default: 'created' }) status!: CheckoutSessionStatus;
  @Column({ type: 'int' }) amountTotalCents!: number;
  @Column({ default: 'EUR' }) currency!: 'EUR';
  @Column({ type: 'text' }) checkoutUrl!: string;
  @Column({ type: 'jsonb', default: {} }) requestPayload!: Record<string, unknown>;
  @Column({ type: 'jsonb', default: {} }) responsePayload!: Record<string, unknown>;
  @Column({ nullable: true }) expiresAt?: Date;
  @Column({ nullable: true }) completedAt?: Date;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
