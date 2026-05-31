import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { SandboxCertificationArea } from '../sandbox-certification-design.types';
import type { SandboxWaiverStatus } from '../sandbox-certification-runtime.types';

@Entity('sandbox_waivers')
@Index(['scenarioKey', 'status'])
@Index(['area', 'status'])
export class SandboxWaiver {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'scenario_key' })
  scenarioKey!: string;

  @Column({ type: 'varchar' })
  area!: SandboxCertificationArea;

  @Column({ type: 'varchar', default: 'active' })
  status!: SandboxWaiverStatus;

  @Column({ type: 'text' })
  reason!: string;

  @Column({ name: 'feature_flag' })
  featureFlag!: string;

  @Column({ name: 'feature_disabled', default: false })
  featureDisabled!: boolean;

  @Column({ name: 'approved_by' })
  approvedBy!: string;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt?: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt?: Date;

  @Column({ name: 'audit_trail', type: 'jsonb', default: [] })
  auditTrail!: Array<Record<string, unknown>>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
