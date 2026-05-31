import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provider_cost_ledger_entries')
@Index(['providerRequestId', 'entryType'])
export class ProviderCostLedgerEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  providerRequestId!: string;

  @Column({ type: 'varchar' })
  entryType!: 'estimated' | 'reserved' | 'consumed_success' | 'consumed_failed' | 'released' | 'adjusted';

  @Column({ type: 'int' })
  amountCents!: number;

  @Column({ type: 'varchar', default: 'EUR' })
  currency!: 'EUR';

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
