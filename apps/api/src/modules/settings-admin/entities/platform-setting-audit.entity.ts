import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platform_setting_audits')
@Index(['namespace', 'key', 'createdAt'])
export class PlatformSettingAudit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  namespace!: string;

  @Column()
  key!: string;

  @Column({ type: 'varchar' })
  action!: 'created' | 'updated' | 'secret_updated' | 'disabled' | 'enabled' | 'verified';

  @Column({ name: 'actor_id', nullable: true })
  actorId?: string;

  @Column({ type: 'text' })
  reason!: string;

  @Column({ name: 'before_snapshot', type: 'jsonb', nullable: true })
  beforeSnapshot?: Record<string, unknown>;

  @Column({ name: 'after_snapshot', type: 'jsonb', nullable: true })
  afterSnapshot?: Record<string, unknown>;

  @Column({ name: 'ip_address_hash', nullable: true })
  ipAddressHash?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
