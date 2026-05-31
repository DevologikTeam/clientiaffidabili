import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { SandboxCertificationProviderMode, SandboxCertificationRunStatus } from '../sandbox-certification-runtime.types';

@Entity('sandbox_certification_runs')
@Index(['status', 'createdAt'])
@Index(['providerMode', 'createdAt'])
export class SandboxCertificationRun {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  label!: string;

  @Column({ type: 'varchar', default: 'queued' })
  status!: SandboxCertificationRunStatus;

  @Column({ type: 'varchar', name: 'provider_mode', default: 'mock' })
  providerMode!: SandboxCertificationProviderMode;

  @Column({ name: 'requested_by', nullable: true })
  requestedBy?: string;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @Column({ name: 'scenario_count', default: 0 })
  scenarioCount!: number;

  @Column({ name: 'passed_count', default: 0 })
  passedCount!: number;

  @Column({ name: 'failed_count', default: 0 })
  failedCount!: number;

  @Column({ name: 'blocked_count', default: 0 })
  blockedCount!: number;

  @Column({ name: 'waived_count', default: 0 })
  waivedCount!: number;

  @Column({ name: 'summary_json', type: 'jsonb', default: {} })
  summaryJson!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
