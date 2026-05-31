import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { AuthSessionStatus } from '../auth-accounts.types';

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() userId!: string;
  @Column({ nullable: true }) activeAccountId?: string;
  @Column() tokenHash!: string;
  @Column({ default: 'active' }) status!: AuthSessionStatus;
  @Column({ nullable: true }) ipAddress?: string;
  @Column({ nullable: true }) userAgent?: string;
  @Column({ nullable: true }) stepUpVerifiedAt?: Date;
  @Column() expiresAt!: Date;
  @Column({ nullable: true }) revokedAt?: Date;
  @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
