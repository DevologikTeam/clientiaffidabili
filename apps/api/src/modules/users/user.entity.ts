import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type UserRole = 'owner' | 'admin' | 'member' | 'support';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() organizationId!: string;
  @Column({ unique: true }) email!: string;
  @Column() fullName!: string;
  @Column({ default: 'member' }) role!: UserRole;
  @Column({ select: false }) passwordHash!: string;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
