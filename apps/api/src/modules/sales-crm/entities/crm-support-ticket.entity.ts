import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { TicketPriority, TicketStatus, TicketTopic } from '../sales-crm.types';

@Entity('crm_support_tickets')
@Index(['status', 'priority'])
@Index(['relatedType', 'relatedId'])
export class CrmSupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  subject!: string;

  @Column({ type: 'varchar', default: 'general' })
  topic!: TicketTopic;

  @Column({ type: 'varchar', default: 'new' })
  status!: TicketStatus;

  @Column({ type: 'varchar', default: 'P2' })
  priority!: TicketPriority;

  @Column({ name: 'contact_message_id', nullable: true })
  contactMessageId?: string;

  @Column({ name: 'lead_id', nullable: true })
  leadId?: string;

  @Column({ name: 'account_id', nullable: true })
  accountId?: string;

  @Column({ name: 'related_type', nullable: true })
  relatedType?: string;

  @Column({ name: 'related_id', nullable: true })
  relatedId?: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ name: 'next_action', type: 'text', nullable: true })
  nextAction?: string;

  @Column({ name: 'assigned_to_user_id', nullable: true })
  assignedToUserId?: string;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
