import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { AuthAccountsService } from './auth-accounts.service';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto, ResetPasswordDto } from './dto/password-reset.dto';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';

@Controller('auth')
export class AuthAccountsController {
  constructor(private readonly auth: AuthAccountsService) {}

  @Post('register')
  register(@Body() dto: RegisterAccountDto) {
    return this.auth.registerAccount(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('logout')
  logout(@Headers('x-session-token') sessionToken: string) {
    return this.auth.logout(sessionToken);
  }

  @Post('password/request-reset')
  requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return this.auth.requestPasswordReset(dto);
  }

  @Post('password/reset')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto);
  }

  @Post('invitations')
  invite(@Body() dto: InviteMemberDto) {
    return this.auth.inviteMember(dto);
  }

  @Post('invitations/accept')
  acceptInvitation(@Body() dto: AcceptInvitationDto) {
    return this.auth.acceptInvitation(dto);
  }

  @Get('accounts/:accountId/team')
  listTeam(@Param('accountId') accountId: string, @Query('actorUserId') actorUserId: string) {
    return this.auth.listTeam(accountId, actorUserId);
  }

  @Post('accounts/:accountId/team/role')
  updateRole(@Param('accountId') accountId: string, @Body() dto: UpdateMemberRoleDto) {
    return this.auth.updateMemberRole({ ...dto, accountId });
  }

  @Get('me')
  me(@Headers('x-session-token') sessionToken: string) {
    return this.auth.currentContext(sessionToken);
  }
}
