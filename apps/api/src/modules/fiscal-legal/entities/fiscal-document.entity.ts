import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { FiscalDocumentLifecycleStatus, FiscalDocumentType, TaxProfileSnapshot } from '../fiscal-legal.types';

@Entity('fiscal_documents')
@Index(['organizationId', 'status'])
@Index(['orderId', 'documentType'])
@Index(['refundRequestId'])
export class FiscalDocument {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  organizationId!: string;

  @Column({ type: 'uuid', nullable: true })
  orderId?: string;

  @Column({ type: 'uuid', nullable: true })
  paymentId?: string;

  @Column({ type: 'uuid', nullable: true })
  refundRequestId?: string;

  @Column({ type: 'uuid', nullable: true })
  taxProfileId?: string;

  @Column({ type: 'varchar', length: 32, default: 'invoice' })
  documentType!: FiscalDocumentType;

  @Column({ type: 'varchar', length: 32, default: 'draft' })
  status!: FiscalDocumentLifecycleStatus;

  @Column({ type: 'varchar', length: 80, nullable: true })
  documentNumber?: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  externalFiscalReference?: string;

  @Column({ type: 'int', default: 0 })
  taxableAmountCents!: number;

  @Column({ type: 'int', default: 0 })
  vatAmountCents!: number;

  @Column({ type: 'int', default: 0 })
  totalAmountCents!: number;

  @Column({ type: 'varchar', length: 3, default: 'EUR' })
  currency!: 'EUR';

  @Column({ type: 'jsonb', default: {} })
  taxProfileSnapshot!: TaxProfileSnapshot | Record<string, unknown>;

  @Column({ type: 'jsonb', default: [] })
  lineItems!: Array<{ label: string; quantity: number; unitNetCents: number; vatRate: number; totalGrossCents: number }>;

  @Column({ type: 'varchar', length: 220, nullable: true })
  customerVisibleNote?: string;

  @Column({ type: 'varchar', length: 220, nullable: true })
  adminReason?: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  documentHash?: string;

  @Column({ type: 'timestamptz', nullable: true })
  issuedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
