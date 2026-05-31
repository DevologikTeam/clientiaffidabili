import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { PartnerEnvironment } from '../partner-portal.types';

export type PartnerUsageLedgerType =
  | 'credit_purchase'
  | 'subscription_grant'
  | 'usage_reservation'
  | 'usage_commit'
  | 'usage_release'
  | 'manual_adjustment'
  | 'refund_credit'
  | 'chargeback_hold'
  | 'chargeback_release';

@Entity('partner_usage_ledger_entries')
export class PartnerUsageLedgerEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'partner_account_id' })
  partnerAccountId!: string;

  @Column({ type: 'varchar', name: 'environment' })
  environment!: PartnerEnvironment;

  @Column({ type: 'varchar', name: 'type' })
  type!: PartnerUsageLedgerType;

  @Column({ name: 'amount_cents' })
  amountCents!: number;

  @Column({ type: 'varchar', name: 'currency', default: 'EUR' })
  currency!: 'EUR';

  @Column({ name: 'service_code', nullable: true })
  serviceCode?: string;

  @Column({ name: 'idempotency_key', nullable: true })
  idempotencyKey?: string;

  @Column({ name: 'external_reference', nullable: true })
  externalReference?: string;

  @Column({ name: 'pricing_snapshot', type: 'jsonb', nullable: true })
  pricingSnapshot?: Record<string, unknown>;

  @Column({ name: 'reason', type: 'text', nullable: true })
  reason?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
