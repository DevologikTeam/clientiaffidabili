import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() organizationId!: string;
  @Column({ nullable: true }) actorUserId?: string;
  @Column() eventType!: string;
  @Column() entityType!: string;
  @Column() entityId!: string;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;
  @Column({ nullable: true }) ipAddress?: string;
  @Column({ nullable: true }) userAgent?: string;
  @CreateDateColumn() createdAt!: Date;
}
