import { IsIn, IsString, MinLength } from 'class-validator';

export class ReviewCopilotDraftDto {
  @IsIn(['approved', 'applied', 'discarded'])
  status!: 'approved' | 'applied' | 'discarded';

  @IsString()
  @MinLength(8)
  reason!: string;

  @IsString()
  actorId!: string;
}
