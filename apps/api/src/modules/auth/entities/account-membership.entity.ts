import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { CustomerAccountRole, MembershipStatus } from '../auth-accounts.types';

@Entity('account_memberships')
export class AccountMembership {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() accountId!: string;
  @Column() userId!: string;
  @Column() role!: CustomerAccountRole;
  @Column({ default: 'active' }) status!: MembershipStatus;
  @Column({ nullable: true }) invitedByUserId?: string;
  @Column({ nullable: true }) lastSelectedAt?: Date;
  @Column({ type: 'jsonb', default: [] }) permissionOverrides!: string[];
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
