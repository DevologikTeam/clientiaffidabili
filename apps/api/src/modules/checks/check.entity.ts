import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { CheckStatus, RiskLevel, SubjectType } from '@clientiaffidabili/shared';

@Entity('checks')
export class Check {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() organizationId!: string;
  @Column() orderId!: string;
  @Column() productCode!: string;
  @Column() requestedByUserId!: string;
  @Column() subjectType!: SubjectType;
  @Column({ type: 'jsonb' }) subjectPayload!: Record<string, unknown>;
  @Column({ default: 'queued' }) status!: CheckStatus;
  @Column({ nullable: true }) providerName?: string;
  @Column({ nullable: true }) providerRequestId?: string;
  @Column({ type: 'jsonb', nullable: true }) normalizedResult?: Record<string, unknown>;
  @Column({ default: 'unknown' }) riskLevel!: RiskLevel;
  @Column({ nullable: true }) completedAt?: Date;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
