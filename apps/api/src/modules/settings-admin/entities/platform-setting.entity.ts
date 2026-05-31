import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { PlatformSettingNamespace, PlatformSettingSensitivity, PlatformSettingState, PlatformSettingEnvironment } from '../settings-admin-runtime.types';

@Entity('platform_settings')
@Index(['namespace', 'key'], { unique: true })
@Index(['namespace', 'state'])
export class PlatformSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  namespace!: PlatformSettingNamespace;

  @Column()
  key!: string;

  @Column()
  label!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', default: 'all' })
  environment!: PlatformSettingEnvironment;

  @Column({ type: 'varchar', default: 'active' })
  state!: PlatformSettingState;

  @Column({ type: 'varchar', default: 'database' })
  valueSource!: 'default' | 'environment' | 'database' | 'secret_ref' | 'computed';

  @Column({ type: 'varchar', default: 'public_admin' })
  sensitivity!: PlatformSettingSensitivity;

  @Column({ name: 'value_json', type: 'jsonb', nullable: true })
  valueJson?: unknown;

  @Column({ name: 'secret_ref', nullable: true })
  secretRef?: string;

  @Column({ name: 'redacted_value', nullable: true })
  redactedValue?: string;

  @Column({ name: 'requires_reason_on_change', default: true })
  requiresReasonOnChange!: boolean;

  @Column({ name: 'requires_verification_after_change', default: false })
  requiresVerificationAfterChange!: boolean;

  @Column({ name: 'go_live_blocker', default: false })
  goLiveBlocker!: boolean;

  @Column({ name: 'last_changed_by', nullable: true })
  lastChangedBy?: string;

  @Column({ name: 'last_change_reason', type: 'text', nullable: true })
  lastChangeReason?: string;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
