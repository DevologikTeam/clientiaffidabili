import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { OrderStatus, PriceSnapshot } from '@clientiaffidabili/shared';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() organizationId!: string;
  @Column() userId!: string;
  @Column({ default: 'pending_payment' }) status!: OrderStatus;
  @Column({ type: 'int' }) subtotalNetCents!: number;
  @Column({ type: 'int' }) totalCents!: number;
  @Column({ type: 'int' }) taxCents!: number;
  @Column({ default: 'EUR' }) currency!: string;
  @Column({ nullable: true }) productCode?: string;
  @Column({ type: 'jsonb', default: {} }) priceSnapshot!: PriceSnapshot;
  @Column({ type: 'jsonb', default: {} }) subjectPayload!: Record<string, unknown>;
  @Column({ nullable: true }) checkoutProvider?: string;
  @Column({ nullable: true }) checkoutSessionId?: string;
  @Column({ nullable: true }) paidAt?: Date;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
