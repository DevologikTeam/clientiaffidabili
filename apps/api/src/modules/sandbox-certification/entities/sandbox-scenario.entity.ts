import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { SandboxCertificationArea } from '../sandbox-certification-design.types';

@Entity('sandbox_scenarios')
@Index(['scenarioKey'], { unique: true })
@Index(['area', 'blockerForRc'])
export class SandboxScenario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'scenario_key' })
  scenarioKey!: string;

  @Column({ type: 'varchar' })
  area!: SandboxCertificationArea;

  @Column()
  title!: string;

  @Column({ name: 'blocker_for_rc', default: true })
  blockerForRc!: boolean;

  @Column({ name: 'required_evidence', type: 'jsonb', default: [] })
  requiredEvidence!: string[];

  @Column({ name: 'pass_criteria', type: 'jsonb', default: [] })
  passCriteria!: string[];

  @Column({ name: 'fail_criteria', type: 'jsonb', default: [] })
  failCriteria!: string[];

  @Column({ name: 'feature_flag_if_waived', nullable: true })
  featureFlagIfWaived?: string;

  @Column({ name: 'owner_role', default: 'operations_admin' })
  ownerRole!: string;

  @Column({ name: 'metadata_json', type: 'jsonb', default: {} })
  metadataJson!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
