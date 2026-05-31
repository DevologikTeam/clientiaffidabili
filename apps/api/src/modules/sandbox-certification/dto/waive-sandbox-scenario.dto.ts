import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class WaiveSandboxScenarioDto {
  @IsString()
  @MinLength(12)
  reason!: string;

  @IsString()
  featureFlag!: string;

  @IsBoolean()
  featureDisabled!: boolean;

  @IsString()
  approvedBy!: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}
