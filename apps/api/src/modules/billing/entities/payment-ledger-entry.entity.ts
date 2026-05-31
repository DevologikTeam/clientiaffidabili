import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { PaymentLedgerEntryType } from '@clientiaffidabili/shared';

@Entity('payment_ledger_entries')
export class PaymentLedgerEntry {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() orderId!: string;
  @Column({ nullable: true }) paymentId?: string;
  @Column() type!: PaymentLedgerEntryType;
  @Column({ type: 'int', default: 0 }) amountCents!: number;
  @Column({ default: 'EUR' }) currency!: 'EUR';
  @Column({ nullable: true }) externalRef?: string;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;

  @CreateDateColumn() createdAt!: Date;
}
