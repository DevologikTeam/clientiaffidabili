import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { ContactMessageSourceType, ContactMessageStatus, EmailDeliveryStatus } from '../sales-crm.types';

@Entity('crm_contact_messages')
@Index(['status', 'createdAt'])
@Index(['sourceType', 'createdAt'])
@Index(['email'])
export class ContactMessage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'source_type', default: 'contact' })
  sourceType!: ContactMessageSourceType;

  @Column({ name: 'source_path', default: '/contatti' })
  sourcePath!: string;

  @Column({ name: 'cta_id', nullable: true })
  ctaId?: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ name: 'company_name', nullable: true })
  companyName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ name: 'consent_snapshot', type: 'jsonb', default: {} })
  consentSnapshot!: Record<string, unknown>;

  @Column({ type: 'varchar', default: 'new' })
  status!: ContactMessageStatus;

  @Column({ type: 'varchar', name: 'email_delivery_status', default: 'pending' })
  emailDeliveryStatus!: EmailDeliveryStatus;

  @Column({ name: 'email_delivery_error', type: 'text', nullable: true })
  emailDeliveryError?: string;

  @Column({ name: 'lead_id', nullable: true })
  leadId?: string;

  @Column({ name: 'ticket_id', nullable: true })
  ticketId?: string;

  @Column({ name: 'ip_address_hash', nullable: true })
  ipAddressHash?: string;

  @Column({ name: 'ip_country', nullable: true })
  ipCountry?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
