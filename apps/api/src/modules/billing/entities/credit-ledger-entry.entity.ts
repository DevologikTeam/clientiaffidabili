import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export type CreditLedgerType = 'grant' | 'purchase' | 'subscription_renewal' | 'reserve' | 'release' | 'consume' | 'refund_reversal' | 'admin_adjustment' | 'expire';

@Entity('credit_ledger_entries')
@Index(['customerAccountId', 'createdAt'])
@Index(['sourceType', 'sourceId'])
export class CreditLedgerEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  customerAccountId!: string;

  @Column({ type: 'uuid', nullable: true })
  walletId?: string;

  @Column({ type: 'varchar', length: 40 })
  type!: CreditLedgerType;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'varchar', length: 60, nullable: true })
  sourceType?: string;

  @Column({ type: 'varchar', length: 160, nullable: true })
  sourceId?: string;

  @Column({ type: 'varchar', length: 220 })
  reason!: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  idempotencyKey?: string;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;
}
