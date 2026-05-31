import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { LeadStatus, LeadTemperature } from '../sales-crm.types';

@Entity('crm_sales_leads')
@Index(['status', 'createdAt'])
@Index(['email'])
export class SalesLead {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ name: 'company_name', nullable: true })
  companyName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ name: 'source_message_id', nullable: true })
  sourceMessageId?: string;

  @Column({ name: 'source_path', nullable: true })
  sourcePath?: string;

  @Column({ type: 'varchar', default: 'new' })
  status!: LeadStatus;

  @Column({ type: 'varchar', default: 'warm' })
  temperature!: LeadTemperature;

  @Column({ name: 'declared_need', type: 'text', nullable: true })
  declaredNeed?: string;

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
