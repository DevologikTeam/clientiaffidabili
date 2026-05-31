import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { ProviderDeliveryMode, ProviderName, ProviderRetryPolicy, ProviderRequestStatus } from '@clientiaffidabili/shared';

@Entity('provider_requests')
@Index(['idempotencyKey'], { unique: true })
@Index(['orderId', 'checkId'])
export class ProviderRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  organizationId!: string;

  @Column('uuid')
  orderId!: string;

  @Column('uuid')
  checkId!: string;

  @Column()
  productCode!: string;

  @Column({ type: 'varchar', default: 'openapi' })
  providerName!: ProviderName;

  @Column()
  providerServiceCode!: string;

  @Column()
  mappingVersion!: string;

  @Column()
  idempotencyKey!: string;

  @Column({ type: 'varchar', default: 'created' })
  status!: ProviderRequestStatus;

  @Column({ type: 'varchar', default: 'sync' })
  deliveryMode!: ProviderDeliveryMode;

  @Column({ type: 'varchar', default: 'manual_only' })
  retryPolicy!: ProviderRetryPolicy;

  @Column({ nullable: true })
  providerExternalId?: string;

  @Column({ type: 'int' })
  providerCostSnapshotCents!: number;

  @Column({ type: 'int' })
  maxAcceptedCostCents!: number;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @Column({ type: 'jsonb', default: {} })
  requestPayloadPreview!: Record<string, unknown>;

  @Column({ nullable: true })
  rawPayloadVaultId?: string;

  @Column({ type: 'jsonb', nullable: true })
  normalizedResult?: Record<string, unknown>;

  @Column({ nullable: true })
  errorCategory?: string;

  @Column({ nullable: true })
  errorMessage?: string;

  @Column({ type: 'timestamptz', nullable: true })
  sentAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  nextPollAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  receivedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
