import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { LegalAcceptanceSnapshot } from '../fiscal-legal.types';

@Entity('legal_acceptances')
@Index(['organizationId', 'acceptedAt'])
@Index(['orderId'])
@Index(['checkoutSessionId'])
export class LegalAcceptance {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  organizationId!: string;

  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @Column({ type: 'uuid', nullable: true })
  orderId?: string;

  @Column({ type: 'uuid', nullable: true })
  checkoutSessionId?: string;

  @Column({ type: 'jsonb' })
  acceptanceSnapshot!: LegalAcceptanceSnapshot;

  @Column({ type: 'varchar', length: 120 })
  snapshotHash!: string;

  @Column({ type: 'timestamptz' })
  acceptedAt!: Date;

  @Column({ type: 'varchar', length: 80, nullable: true })
  source?: 'checkout' | 'account' | 'admin_import' | 'api';

  @CreateDateColumn()
  createdAt!: Date;
}
