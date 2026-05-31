import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { AccountStatus } from '../auth-accounts.types';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() legalName!: string;
  @Column({ nullable: true }) displayName?: string;
  @Column({ nullable: true }) vatNumber?: string;
  @Column({ nullable: true }) taxCode?: string;
  @Column({ nullable: true }) billingEmail?: string;
  @Column({ default: 'active' }) status!: AccountStatus;
  @Column({ default: 'starter' }) planCode!: string;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
