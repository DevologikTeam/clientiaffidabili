import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { PartnerEnvironment } from '../partner-portal.types';

@Entity('partner_webhook_endpoints')
export class PartnerWebhookEndpoint {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'partner_account_id' })
  partnerAccountId!: string;

  @Column({ type: 'varchar', name: 'environment' })
  environment!: PartnerEnvironment;

  @Column({ name: 'url' })
  url!: string;

  @Column({ name: 'secret_hash' })
  secretHash!: string;

  @Column({ name: 'events', type: 'simple-array' })
  events!: string[];

  @Column({ name: 'last_delivery_status', nullable: true })
  lastDeliveryStatus?: string;

  @Column({ name: 'disabled_at', type: 'timestamp', nullable: true })
  disabledAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
