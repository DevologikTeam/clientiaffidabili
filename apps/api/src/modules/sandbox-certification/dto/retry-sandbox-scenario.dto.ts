import { IsOptional, IsString, MinLength } from 'class-validator';

export class RetrySandboxScenarioDto {
  @IsString()
  @MinLength(8)
  reason!: string;

  @IsOptional()
  @IsString()
  requestedBy?: string;
}
