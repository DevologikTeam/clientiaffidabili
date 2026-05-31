import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { SandboxCertificationArea, SandboxScenarioStatus } from '../sandbox-certification-design.types';
import type { SandboxCertificationProviderMode } from '../sandbox-certification-runtime.types';

@Entity('sandbox_scenario_results')
@Index(['runId', 'scenarioKey'])
@Index(['status', 'createdAt'])
@Index(['area', 'status'])
export class SandboxScenarioResult {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'run_id', type: 'uuid' })
  runId!: string;

  @Column({ name: 'scenario_key' })
  scenarioKey!: string;

  @Column({ type: 'varchar' })
  area!: SandboxCertificationArea;

  @Column()
  title!: string;

  @Column({ name: 'blocker_for_rc', default: true })
  blockerForRc!: boolean;

  @Column({ type: 'varchar', default: 'not_started' })
  status!: SandboxScenarioStatus;

  @Column({ type: 'varchar', name: 'provider_mode', default: 'mock' })
  providerMode!: SandboxCertificationProviderMode;

  @Column({ default: 1 })
  attempt!: number;

  @Column({ name: 'retry_of_result_id', type: 'uuid', nullable: true })
  retryOfResultId?: string;

  @Column({ name: 'safe_message', type: 'text' })
  safeMessage!: string;

  @Column({ name: 'failure_safe_message', type: 'text', nullable: true })
  failureSafeMessage?: string;

  @Column({ name: 'evidence_json', type: 'jsonb', default: [] })
  evidenceJson!: Array<Record<string, unknown>>;

  @Column({ name: 'error_ledger_id', type: 'uuid', nullable: true })
  errorLedgerId?: string;

  @Column({ name: 'refund_relevant', default: false })
  refundRelevant!: boolean;

  @Column({ name: 'retry_eligible', default: true })
  retryEligible!: boolean;

  @Column({ name: 'rollback_action', type: 'text' })
  rollbackAction!: string;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
