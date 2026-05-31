export class RequestPasswordResetDto {
  email!: string;
  ipAddress?: string;
}

export class ResetPasswordDto {
  token!: string;
  newPassword!: string;
  ipAddress?: string;
}
