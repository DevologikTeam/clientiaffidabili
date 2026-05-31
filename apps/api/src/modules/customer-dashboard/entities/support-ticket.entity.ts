import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { CustomerDashboardSupportTicketItem } from '@clientiaffidabili/shared';

@Entity('support_tickets')
@Index(['organizationId', 'status'])
@Index(['userId', 'status'])
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  organizationId!: string;

  @Column({ nullable: true })
  userId?: string;

  @Column()
  subject!: string;

  @Column({ type: 'varchar', default: 'other' })
  category!: CustomerDashboardSupportTicketItem['category'];

  @Column({ type: 'varchar', default: 'open' })
  status!: CustomerDashboardSupportTicketItem['status'];

  @Column({ type: 'varchar', default: 'normal' })
  priority!: CustomerDashboardSupportTicketItem['priority'];

  @Column({ type: 'varchar', nullable: true })
  relatedType?: CustomerDashboardSupportTicketItem['relatedType'];

  @Column({ nullable: true })
  relatedId?: string;

  @Column({ type: 'text' })
  message!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
