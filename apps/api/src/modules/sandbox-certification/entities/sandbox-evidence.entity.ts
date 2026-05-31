import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { SandboxEvidenceType } from '../sandbox-certification-runtime.types';

@Entity('sandbox_evidence')
@Index(['runId', 'scenarioKey'])
@Index(['scenarioResultId', 'evidenceType'])
export class SandboxEvidence {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'run_id', type: 'uuid' })
  runId!: string;

  @Column({ name: 'scenario_result_id', type: 'uuid' })
  scenarioResultId!: string;

  @Column({ name: 'scenario_key' })
  scenarioKey!: string;

  @Column({ type: 'varchar', name: 'evidence_type' })
  evidenceType!: SandboxEvidenceType;

  @Column({ name: 'safe_label' })
  safeLabel!: string;

  @Column({ name: 'redacted_payload', type: 'jsonb', default: {} })
  redactedPayload!: Record<string, unknown>;

  @Column({ name: 'storage_ref', nullable: true })
  storageRef?: string;

  @Column({ nullable: true })
  sha256?: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
