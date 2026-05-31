import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { AuthAuditSeverity } from '../auth-accounts.types';

@Entity('auth_audit_events')
export class AuthAuditEvent {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ nullable: true }) accountId?: string;
  @Column({ nullable: true }) userId?: string;
  @Column() action!: string;
  @Column({ default: 'info' }) severity!: AuthAuditSeverity;
  @Column({ nullable: true }) actorUserId?: string;
  @Column({ nullable: true }) ipAddress?: string;
  @Column({ type: 'text', nullable: true }) reason?: string;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;
  @CreateDateColumn() createdAt!: Date;
}
