import { IsArray, IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import type { SandboxCertificationProviderMode } from '../sandbox-certification-runtime.types';

export class CreateSandboxCertificationRunDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  label?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scenarioIds?: string[];

  @IsOptional()
  @IsIn(['mock', 'sandbox', 'manual'])
  providerMode?: SandboxCertificationProviderMode;

  @IsOptional()
  @IsString()
  requestedBy?: string;

  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;
}
