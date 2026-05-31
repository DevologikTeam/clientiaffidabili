import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCopilotSuggestionDto } from './dto/create-copilot-suggestion.dto';
import { ReviewCopilotDraftDto } from './dto/review-copilot-draft.dto';
import { OpenaiCopilotService } from './openai-copilot.service';

@Controller('admin/openai-copilot')
export class OpenaiCopilotController {
  constructor(private readonly copilot: OpenaiCopilotService) {}

  @Get('overview')
  overview() {
    return this.copilot.overview();
  }

  @Post('suggest')
  suggest(@Body() body: CreateCopilotSuggestionDto) {
    return this.copilot.suggest(body);
  }

  @Get('drafts')
  drafts(@Query('status') status?: string) {
    return this.copilot.listDrafts(status);
  }

  @Post('drafts/:id/review')
  reviewDraft(@Param('id') id: string, @Body() body: ReviewCopilotDraftDto) {
    return this.copilot.reviewDraft(id, body);
  }

  @Get('usage')
  usage() {
    return this.copilot.usageSummary();
  }
}
