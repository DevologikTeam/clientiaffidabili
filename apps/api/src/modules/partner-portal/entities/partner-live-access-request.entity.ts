import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('partner_live_access_requests')
export class PartnerLiveAccessRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'partner_account_id' })
  partnerAccountId!: string;

  @Column({ type: 'varchar', name: 'status', default: 'submitted' })
  status!: 'submitted' | 'changes_required' | 'approved' | 'rejected' | 'cancelled';

  @Column({ name: 'requested_by_user_id', nullable: true })
  requestedByUserId?: string;

  @Column({ name: 'declared_use_case', type: 'text' })
  declaredUseCase!: string;

  @Column({ name: 'technical_contact_email' })
  technicalContactEmail!: string;

  @Column({ name: 'review_reason', type: 'text', nullable: true })
  reviewReason?: string;

  @Column({ name: 'reviewed_by_user_id', nullable: true })
  reviewedByUserId?: string;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
