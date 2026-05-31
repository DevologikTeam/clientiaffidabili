import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('partner_rate_limit_profiles')
export class PartnerRateLimitProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'code', unique: true })
  code!: string;

  @Column({ name: 'label' })
  label!: string;

  @Column({ name: 'requests_per_minute', default: 30 })
  requestsPerMinute!: number;

  @Column({ name: 'requests_per_day', default: 1000 })
  requestsPerDay!: number;

  @Column({ name: 'paid_requests_per_day', default: 100 })
  paidRequestsPerDay!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
