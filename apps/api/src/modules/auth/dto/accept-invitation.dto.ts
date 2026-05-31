export class AcceptInvitationDto {
  token!: string;
  fullName!: string;
  password!: string;
  ipAddress?: string;
  userAgent?: string;
}
