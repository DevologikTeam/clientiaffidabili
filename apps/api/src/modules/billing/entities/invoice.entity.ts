import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { InvoiceStatus } from '@clientiaffidabili/shared';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() orderId!: string;
  @Column({ nullable: true }) paymentId?: string;
  @Column({ nullable: true }) billingProfileId?: string;
  @Column({ default: 'pending' }) status!: InvoiceStatus;
  @Column({ type: 'int' }) amountNetCents!: number;
  @Column({ type: 'int' }) vatCents!: number;
  @Column({ type: 'int' }) totalCents!: number;
  @Column({ default: 'EUR' }) currency!: 'EUR';
  @Column({ nullable: true }) invoiceNumber?: string;
  @Column({ nullable: true }) issuedAt?: Date;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
