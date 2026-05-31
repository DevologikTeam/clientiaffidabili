import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PublishSeoPageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  reason!: string;

  @IsString()
  @IsNotEmpty()
  publishedByUserId!: string;
}
