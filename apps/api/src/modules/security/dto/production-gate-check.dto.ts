import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ProductionGateOverrideDto {
  @IsString()
  reason!: string;

  @IsString()
  actorLabel!: string;

  @IsBoolean()
  @IsOptional()
  confirmNotGoLive?: boolean;
}
