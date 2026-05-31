import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('credit_wallets')
@Index(['customerAccountId'], { unique: true })
export class CreditWallet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  customerAccountId!: string;

  @Column({ type: 'int', default: 0 })
  availableCredits!: number;

  @Column({ type: 'int', default: 0 })
  reservedCredits!: number;

  @Column({ type: 'int', default: 0 })
  lifetimePurchasedCredits!: number;

  @Column({ type: 'int', default: 0 })
  lifetimeConsumedCredits!: number;

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt?: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
