import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Account } from './entities/account.entity';
import { AccountInvitation } from './entities/account-invitation.entity';
import { AccountMembership } from './entities/account-membership.entity';
import { AuthAuditEvent } from './entities/auth-audit-event.entity';
import { AuthSession } from './entities/auth-session.entity';
import { EmailVerificationToken } from './entities/email-verification-token.entity';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { AuthPasswordService } from './auth-password.service';
import { AuthTokenService } from './auth-token.service';
import { CUSTOMER_ROLE_PERMISSIONS, canChangeRole, roleHasPermission } from './auth-permissions.registry';
import type { AuthResult, CustomerAccountRole, CustomerPermission, TeamMemberView } from './auth-accounts.types';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto, ResetPasswordDto } from './dto/password-reset.dto';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';

@Injectable()
export class AuthAccountsService {
  // Cookie policy target: HttpOnly + Secure + SameSite
  readonly cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAgeSeconds: 60 * 60 * 24 * 14,
  };

  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Account) private readonly accounts: Repository<Account>,
    @InjectRepository(AccountMembership) private readonly memberships: Repository<AccountMembership>,
    @InjectRepository(AccountInvitation) private readonly invitations: Repository<AccountInvitation>,
    @InjectRepository(AuthSession) private readonly sessions: Repository<AuthSession>,
    @InjectRepository(PasswordResetToken) private readonly passwordResetTokens: Repository<PasswordResetToken>,
    @InjectRepository(EmailVerificationToken) private readonly emailVerificationTokens: Repository<EmailVerificationToken>,
    @InjectRepository(AuthAuditEvent) private readonly auditEvents: Repository<AuthAuditEvent>,
    private readonly passwords: AuthPasswordService,
    private readonly tokens: AuthTokenService,
  ) {}

  async registerAccount(dto: RegisterAccountDto): Promise<AuthResult> {
    await this.ensureEmailAvailable(dto.email);
    const account = await this.accounts.save(this.accounts.create({
      legalName: dto.accountLegalName,
      displayName: dto.accountLegalName,
      vatNumber: dto.vatNumber,
      taxCode: dto.taxCode,
      billingEmail: dto.billingEmail ?? dto.email,
      status: 'active',
      planCode: 'starter',
      metadata: { acceptedTermsVersion: dto.acceptTermsVersion, acceptedPrivacyVersion: dto.acceptPrivacyVersion },
    }));
    const user = await this.users.save(this.users.create({
      organizationId: account.id,
      email: dto.email.toLowerCase().trim(),
      fullName: dto.fullName,
      role: 'owner',
      passwordHash: this.passwords.hashPassword(dto.password),
    }));
    await this.memberships.save(this.memberships.create({ accountId: account.id, userId: user.id, role: 'owner', status: 'active', lastSelectedAt: new Date() }));
    const verification = this.tokens.createToken('verify');
    await this.emailVerificationTokens.save(this.emailVerificationTokens.create({ userId: user.id, tokenHash: verification.tokenHash, expiresAt: this.daysFromNow(7) }));
    await this.audit('account_registered', 'info', account.id, user.id, undefined, dto.ipAddress, { legalName: dto.accountLegalName });
    return this.createSessionResult(user, account.id, 'owner', dto.ipAddress, dto.userAgent);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.users.findOne({ where: { email: dto.email.toLowerCase().trim() }, select: ['id', 'email', 'fullName', 'organizationId', 'role', 'passwordHash'] as any });
    if (!user || !this.passwords.verifyPassword(dto.password, user.passwordHash)) {
      await this.audit('login_failed', 'warning', undefined, undefined, undefined, dto.ipAddress, { emailHash: this.tokens.hashToken(dto.email.toLowerCase().trim()) });
      throw new Error('Credenziali non valide.');
    }
    const membership = await this.resolveMembership(user.id, dto.accountId);
    await this.audit('login_success', 'info', membership.accountId, user.id, undefined, dto.ipAddress, { membershipId: membership.id });
    return this.createSessionResult(user, membership.accountId, membership.role, dto.ipAddress, dto.userAgent);
  }

  async logout(sessionToken: string, actorUserId?: string): Promise<{ ok: true }> {
    const tokenHash = this.tokens.hashToken(sessionToken);
    const session = await this.sessions.findOne({ where: { tokenHash, status: 'active' as any } });
    if (session) {
      session.status = 'revoked';
      session.revokedAt = new Date();
      await this.sessions.save(session);
      await this.audit('session_revoked', 'info', session.activeAccountId, session.userId, actorUserId);
    }
    return { ok: true };
  }

  async requestPasswordReset(dto: RequestPasswordResetDto): Promise<{ ok: true; resetTokenPreview?: string }> {
    const user = await this.users.findOne({ where: { email: dto.email.toLowerCase().trim() } });
    if (!user) {
      await this.audit('password_reset_requested_unknown_email', 'warning', undefined, undefined, undefined, dto.ipAddress, { emailHash: this.tokens.hashToken(dto.email.toLowerCase().trim()) });
      return { ok: true };
    }
    const reset = this.tokens.createToken('reset');
    await this.passwordResetTokens.save(this.passwordResetTokens.create({ userId: user.id, tokenHash: reset.tokenHash, expiresAt: this.hoursFromNow(2), requestedIp: dto.ipAddress }));
    await this.audit('password_reset_requested', 'info', user.organizationId, user.id, undefined, dto.ipAddress);
    return { ok: true, resetTokenPreview: reset.preview };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ ok: true }> {
    const tokenHash = this.tokens.hashToken(dto.token);
    const token = await this.passwordResetTokens.findOne({ where: { tokenHash, expiresAt: MoreThan(new Date()) } });
    if (!token || token.usedAt) throw new Error('Token reset non valido o scaduto.');
    const user = await this.users.findOne({ where: { id: token.userId }, select: ['id', 'email', 'fullName', 'organizationId', 'role', 'passwordHash'] as any });
    if (!user) throw new Error('Utente non trovato.');
    user.passwordHash = this.passwords.hashPassword(dto.newPassword);
    token.usedAt = new Date();
    await this.users.save(user);
    await this.passwordResetTokens.save(token);
    await this.sessions.update({ userId: user.id, status: 'active' as any }, { status: 'revoked', revokedAt: new Date() });
    await this.audit('password_reset_completed', 'critical', user.organizationId, user.id, user.id, dto.ipAddress);
    return { ok: true };
  }

  async inviteMember(dto: InviteMemberDto): Promise<{ invitationId: string; inviteTokenPreview: string; expiresAt: Date }> {
    if (!dto.reason || dto.reason.trim().length < 12) throw new Error('Reason obbligatoria per invitare membri nel team.');
    await this.assertPermission(dto.actorUserId, dto.accountId, 'team.invite');
    const actorMembership = await this.memberships.findOneByOrFail({ accountId: dto.accountId, userId: dto.actorUserId });
    if (!canChangeRole(actorMembership.role, dto.role)) throw new Error('Ruolo non assegnabile dall\'attore corrente.');
    const token = this.tokens.createToken('invite');
    const invitation = await this.invitations.save(this.invitations.create({
      accountId: dto.accountId,
      email: dto.email.toLowerCase().trim(),
      role: dto.role,
      tokenHash: token.tokenHash,
      invitedByUserId: dto.actorUserId,
      expiresAt: this.daysFromNow(7),
      status: 'pending',
      metadata: { reason: dto.reason },
    }));
    await this.audit('member_invited', 'info', dto.accountId, undefined, dto.actorUserId, undefined, { invitationId: invitation.id, role: dto.role });
    return { invitationId: invitation.id, inviteTokenPreview: token.preview, expiresAt: invitation.expiresAt };
  }

  async acceptInvitation(dto: AcceptInvitationDto): Promise<AuthResult> {
    const tokenHash = this.tokens.hashToken(dto.token);
    const invitation = await this.invitations.findOne({ where: { tokenHash, status: 'pending' as any, expiresAt: MoreThan(new Date()) } });
    if (!invitation) throw new Error('Invito non valido o scaduto.');
    let user = await this.users.findOne({ where: { email: invitation.email }, select: ['id', 'email', 'fullName', 'organizationId', 'role', 'passwordHash'] as any });
    if (!user) {
      user = await this.users.save(this.users.create({
        organizationId: invitation.accountId,
        email: invitation.email,
        fullName: dto.fullName,
        role: 'member',
        passwordHash: this.passwords.hashPassword(dto.password),
      }));
    }
    await this.memberships.save(this.memberships.create({ accountId: invitation.accountId, userId: user.id, role: invitation.role, status: 'active', invitedByUserId: invitation.invitedByUserId, lastSelectedAt: new Date() }));
    invitation.status = 'accepted';
    invitation.acceptedAt = new Date();
    await this.invitations.save(invitation);
    await this.audit('member_invitation_accepted', 'info', invitation.accountId, user.id, invitation.invitedByUserId, dto.ipAddress);
    return this.createSessionResult(user, invitation.accountId, invitation.role, dto.ipAddress, dto.userAgent);
  }

  async listTeam(accountId: string, actorUserId: string): Promise<TeamMemberView[]> {
    await this.assertPermission(actorUserId, accountId, 'team.read');
    const memberships = await this.memberships.find({ where: { accountId }, order: { createdAt: 'ASC' } });
    const users = await this.users.findBy(memberships.map((m) => ({ id: m.userId })) as any);
    return memberships.map((membership) => {
      const user = users.find((item) => item.id === membership.userId);
      return {
        membershipId: membership.id,
        userId: membership.userId,
        email: user?.email ?? 'utente-non-trovato',
        fullName: user?.fullName ?? 'Utente non trovato',
        role: membership.role,
        status: membership.status,
        lastSelectedAt: membership.lastSelectedAt?.toISOString(),
      };
    });
  }

  async updateMemberRole(dto: UpdateMemberRoleDto): Promise<AccountMembership> {
    if (!dto.reason || dto.reason.trim().length < 12) throw new Error('Reason obbligatoria per cambiare ruolo.');
    const actor = await this.assertPermission(dto.actorUserId, dto.accountId, 'team.manage_roles');
    const membership = await this.memberships.findOneByOrFail({ id: dto.membershipId, accountId: dto.accountId });
    if (!canChangeRole(actor.role, dto.role)) throw new Error('Ruolo non assegnabile.');
    if (membership.role === 'owner' && dto.role !== 'owner') {
      const owners = await this.memberships.count({ where: { accountId: dto.accountId, role: 'owner' as any, status: 'active' as any } });
      if (owners <= 1) throw new Error('Deve restare almeno un owner attivo. // least one owner');
    }
    const previousRole = membership.role;
    membership.role = dto.role;
    await this.memberships.save(membership);
    await this.audit('member_role_changed', 'critical', dto.accountId, membership.userId, dto.actorUserId, undefined, { previousRole, nextRole: dto.role, reason: dto.reason });
    return membership;
  }

  async currentContext(sessionToken: string): Promise<AuthResult> {
    const session = await this.sessions.findOne({ where: { tokenHash: this.tokens.hashToken(sessionToken), status: 'active' as any, expiresAt: MoreThan(new Date()) } });
    if (!session || !session.activeAccountId) throw new Error('Sessione non valida.');
    const user = await this.users.findOneByOrFail({ id: session.userId });
    const membership = await this.memberships.findOneByOrFail({ accountId: session.activeAccountId, userId: user.id, status: 'active' as any });
    return {
      userId: user.id,
      accountId: membership.accountId,
      role: membership.role,
      permissions: CUSTOMER_ROLE_PERMISSIONS[membership.role],
      sessionId: session.id,
      sessionTokenPreview: 'cookie-session',
      cookieMode: 'httpOnly-secure-sameSite',
    };
  }

  private async ensureEmailAvailable(email: string): Promise<void> {
    const existing = await this.users.findOne({ where: { email: email.toLowerCase().trim() } });
    if (existing) throw new Error('Email gia registrata.');
  }

  private async resolveMembership(userId: string, accountId?: string): Promise<AccountMembership> {
    const where: any = accountId ? { userId, accountId, status: 'active' } : { userId, status: 'active' };
    const membership = await this.memberships.findOne({ where, order: { lastSelectedAt: 'DESC', createdAt: 'ASC' } });
    if (!membership) throw new Error('Nessun account attivo disponibile.');
    membership.lastSelectedAt = new Date();
    await this.memberships.save(membership);
    return membership;
  }

  private async createSessionResult(user: User, accountId: string, role: CustomerAccountRole, ipAddress?: string, userAgent?: string): Promise<AuthResult> {
    const token = this.tokens.createToken('sess');
    const session = await this.sessions.save(this.sessions.create({
      userId: user.id,
      activeAccountId: accountId,
      tokenHash: token.tokenHash,
      ipAddress,
      userAgent,
      status: 'active',
      expiresAt: this.daysFromNow(14),
    }));
    return { userId: user.id, accountId, role, permissions: CUSTOMER_ROLE_PERMISSIONS[role], sessionId: session.id, sessionTokenPreview: token.preview, cookieMode: 'httpOnly-secure-sameSite' };
  }

  private async assertPermission(userId: string, accountId: string, permission: CustomerPermission): Promise<AccountMembership> {
    const membership = await this.memberships.findOneByOrFail({ userId, accountId, status: 'active' as any });
    if (!roleHasPermission(membership.role, permission)) throw new Error(`Permesso richiesto: ${permission}`);
    return membership;
  }

  private daysFromNow(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  private hoursFromNow(hours: number): Date {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date;
  }

  private async audit(action: string, severity: 'info' | 'warning' | 'critical', accountId?: string, userId?: string, actorUserId?: string, ipAddress?: string, metadata: Record<string, unknown> = {}) {
    await this.auditEvents.save(this.auditEvents.create({ action, severity, accountId, userId, actorUserId, ipAddress, metadata }));
  }
}
