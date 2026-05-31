import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('customer_tasks')
@Index(['organizationId', 'status'])
@Index(['userId', 'status'])
export class CustomerTask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  organizationId!: string;

  @Column({ nullable: true })
  userId?: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  href!: string;

  @Column({ type: 'varchar', default: 'medium' })
  priority!: 'high' | 'medium' | 'low';

  @Column({ type: 'varchar', default: 'open' })
  status!: 'open' | 'completed' | 'dismissed';

  @Column({ type: 'varchar', nullable: true })
  relatedType?: 'order' | 'check' | 'report' | 'invoice';

  @Column({ nullable: true })
  relatedId?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
