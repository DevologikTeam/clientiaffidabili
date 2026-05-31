import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthAccountsController } from './auth-accounts.controller';
import { AuthAccountsService } from './auth-accounts.service';
import { AuthPasswordService } from './auth-password.service';
import { AuthTokenService } from './auth-token.service';
import { Account } from './entities/account.entity';
import { AccountInvitation } from './entities/account-invitation.entity';
import { AccountMembership } from './entities/account-membership.entity';
import { AuthAuditEvent } from './entities/auth-audit-event.entity';
import { AuthSession } from './entities/auth-session.entity';
import { EmailVerificationToken } from './entities/email-verification-token.entity';
import { PasswordResetToken } from './entities/password-reset-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, AccountMembership, AccountInvitation, AuthSession, PasswordResetToken, EmailVerificationToken, AuthAuditEvent])],
  controllers: [AuthAccountsController],
  providers: [AuthAccountsService, AuthPasswordService, AuthTokenService],
  exports: [AuthAccountsService, AuthPasswordService, AuthTokenService],
})
export class AuthModule {}
