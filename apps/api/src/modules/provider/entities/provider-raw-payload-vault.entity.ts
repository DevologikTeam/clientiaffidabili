import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provider_raw_payload_vault')
@Index(['providerRequestId'])
export class ProviderRawPayloadVault {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  providerRequestId!: string;

  @Column()
  payloadHash!: string;

  @Column({ type: 'jsonb' })
  redactedPayload!: Record<string, unknown>;

  @Column({ type: 'varchar', default: 'standard' })
  retentionPolicy!: 'short' | 'standard' | 'extended_for_compliance';

  @Column({ default: false })
  customerVisible!: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
