import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { PartnerStatus } from '../partner-portal.types';

@Entity('partner_accounts')
export class PartnerAccount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'account_id' })
  accountId!: string;

  @Column({ name: 'legal_name' })
  legalName!: string;

  @Column({ name: 'website', nullable: true })
  website?: string;

  @Column({ name: 'declared_use_case', type: 'text', nullable: true })
  declaredUseCase?: string;

  @Column({ type: 'varchar', name: 'status', default: 'draft_profile' })
  status!: PartnerStatus;

  @Column({ type: 'varchar', name: 'pricing_tier', default: 'starter' })
  pricingTier!: 'starter' | 'pro' | 'agency' | 'custom';

  @Column({ name: 'can_access_sandbox', default: true })
  canAccessSandbox!: boolean;

  @Column({ name: 'can_access_live', default: false })
  canAccessLive!: boolean;

  @Column({ name: 'risk_notes', type: 'text', nullable: true })
  riskNotes?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
