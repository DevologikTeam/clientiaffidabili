import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { CustomerAccountRole, InvitationStatus } from '../auth-accounts.types';

@Entity('account_invitations')
export class AccountInvitation {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() accountId!: string;
  @Column() email!: string;
  @Column() role!: CustomerAccountRole;
  @Column() tokenHash!: string;
  @Column() invitedByUserId!: string;
  @Column({ default: 'pending' }) status!: InvitationStatus;
  @Column() expiresAt!: Date;
  @Column({ nullable: true }) acceptedAt?: Date;
  @Column({ nullable: true }) revokedAt?: Date;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
