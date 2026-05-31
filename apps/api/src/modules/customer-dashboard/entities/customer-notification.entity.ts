import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { CustomerDashboardNotificationTone } from '@clientiaffidabili/shared';

@Entity('customer_notifications')
@Index(['organizationId', 'status'])
@Index(['userId', 'status'])
export class CustomerNotification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  organizationId!: string;

  @Column({ nullable: true })
  userId?: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'varchar', default: 'info' })
  tone!: CustomerDashboardNotificationTone;

  @Column({ nullable: true })
  href?: string;

  @Column({ type: 'varchar', default: 'unread' })
  status!: 'unread' | 'read' | 'archived';

  @Column({ type: 'varchar', nullable: true })
  relatedType?: 'order' | 'check' | 'report' | 'invoice';

  @Column({ nullable: true })
  relatedId?: string;

  @Column({ type: 'timestamptz', nullable: true })
  readAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
