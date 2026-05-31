import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { PartnerEnvironment, PartnerScope } from '../partner-portal.types';

@Entity('partner_api_keys')
export class PartnerApiKey {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'partner_account_id' })
  partnerAccountId!: string;

  @Column({ type: 'varchar', name: 'environment' })
  environment!: PartnerEnvironment;

  @Column({ name: 'label' })
  label!: string;

  @Column({ name: 'prefix' })
  prefix!: string;

  @Column({ name: 'secret_hash' })
  secretHash!: string;

  @Column({ name: 'scopes', type: 'simple-array' })
  scopes!: PartnerScope[];

  @Column({ name: 'allowed_ips', type: 'simple-array', nullable: true })
  allowedIps?: string[];

  @Column({ name: 'rate_limit_profile_code', default: 'sandbox_default' })
  rateLimitProfileCode!: string;

  @Column({ name: 'created_by_user_id', nullable: true })
  createdByUserId?: string;

  @Column({ name: 'last_used_at', type: 'timestamp', nullable: true })
  lastUsedAt?: Date;

  @Column({ name: 'revoked_at', type: 'timestamp', nullable: true })
  revokedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
