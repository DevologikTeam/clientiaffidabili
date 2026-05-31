import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provider_request_events')
@Index(['providerRequestId', 'eventType'])
export class ProviderRequestEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  providerRequestId!: string;

  @Column()
  eventType!: string;

  @Column({ type: 'varchar', default: 'system' })
  actorType!: 'system' | 'provider' | 'admin' | 'customer';

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
