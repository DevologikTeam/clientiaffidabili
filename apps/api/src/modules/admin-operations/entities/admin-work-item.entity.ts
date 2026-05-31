import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { AdminRole, AdminWorkItemPriority, AdminWorkItemStatus, AdminWorkItemType } from '../admin-operations.types';

@Entity('admin_work_items')
export class AdminWorkItem {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() organizationId!: string;
  @Column() type!: AdminWorkItemType;
  @Column() priority!: AdminWorkItemPriority;
  @Column({ default: 'open' }) status!: AdminWorkItemStatus;
  @Column({ nullable: true }) orderId?: string;
  @Column({ nullable: true }) orderCode?: string;
  @Column({ nullable: true }) relatedEntityType?: string;
  @Column({ nullable: true }) relatedEntityId?: string;
  @Column() serviceLabel!: string;
  @Column({ type: 'text' }) reason!: string;
  @Column({ type: 'text' }) impact!: string;
  @Column({ type: 'text' }) nextAction!: string;
  @Column() ownerRole!: AdminRole;
  @Column({ nullable: true }) assignedToUserId?: string;
  @Column({ nullable: true }) assignedToLabel?: string;
  @Column({ nullable: true }) dueAt?: Date;
  @Column({ type: 'jsonb', default: [] }) snapshots!: Array<{ kind: string; title: string; status: string; summary: string; safeHref?: string }>;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
