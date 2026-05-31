import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { AdminReasonCategory, AdminRole } from '../admin-operations.types';

@Entity('admin_action_audits')
export class AdminActionAudit {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ nullable: true }) workItemId?: string;
  @Column() actorUserId!: string;
  @Column() actorLabel!: string;
  @Column() actorRole!: AdminRole;
  @Column() actionCode!: string;
  @Column({ type: 'text' }) safeDescription!: string;
  @Column({ type: 'text', nullable: true }) reason?: string;
  @Column({ nullable: true }) reasonCategory?: AdminReasonCategory;
  @Column({ nullable: true }) idempotencyKey?: string;
  @Column({ default: 'info' }) severity!: 'info' | 'warning' | 'high' | 'critical';
  @Column({ type: 'jsonb', default: {} }) redactedContext!: Record<string, unknown>;
  @CreateDateColumn() createdAt!: Date;
}
