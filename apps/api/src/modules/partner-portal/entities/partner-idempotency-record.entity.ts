import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { PartnerEnvironment } from '../partner-portal.types';

@Entity('partner_idempotency_records')
export class PartnerIdempotencyRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'partner_account_id' })
  partnerAccountId!: string;

  @Column({ type: 'varchar', name: 'environment' })
  environment!: PartnerEnvironment;

  @Column({ name: 'key' })
  key!: string;

  @Column({ name: 'request_hash' })
  requestHash!: string;

  @Column({ name: 'response_snapshot', type: 'jsonb', nullable: true })
  responseSnapshot?: Record<string, unknown>;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
