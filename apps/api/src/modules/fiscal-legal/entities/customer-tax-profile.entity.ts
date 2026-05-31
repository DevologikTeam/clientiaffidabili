import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { TaxProfileType, TaxProfileSnapshot } from '../fiscal-legal.types';

@Entity('customer_tax_profiles')
@Index(['organizationId', 'status'])
@Index(['vatNumber'])
@Index(['taxCode'])
export class CustomerTaxProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  organizationId!: string;

  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @Column({ type: 'varchar', length: 40, default: 'requires_review' })
  profileType!: TaxProfileType;

  @Column({ type: 'varchar', length: 200 })
  legalName!: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  vatNumber?: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  taxCode?: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  pec?: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  sdiCode?: string;

  @Column({ type: 'varchar', length: 160 })
  email!: string;

  @Column({ type: 'varchar', length: 2, default: 'IT' })
  country!: string;

  @Column({ type: 'varchar', length: 220 })
  addressLine1!: string;

  @Column({ type: 'varchar', length: 16 })
  postalCode!: string;

  @Column({ type: 'varchar', length: 120 })
  city!: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  province?: string;

  @Column({ type: 'varchar', length: 32, default: 'draft' })
  status!: 'draft' | 'complete' | 'requires_review' | 'locked';

  @Column({ type: 'boolean', default: true })
  requiresFiscalReview!: boolean;

  @Column({ type: 'jsonb', default: {} })
  latestSnapshot!: TaxProfileSnapshot | Record<string, unknown>;

  @Column({ type: 'varchar', length: 120, nullable: true })
  snapshotHash?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
