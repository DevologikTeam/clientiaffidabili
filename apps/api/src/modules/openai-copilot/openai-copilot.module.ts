import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsAdminModule } from '../settings-admin/settings-admin.module';
import { OpenaiAdapterService } from './openai-adapter.service';
import { OpenaiCopilotController } from './openai-copilot.controller';
import { OpenaiCopilotService } from './openai-copilot.service';
import { OpenaiOutputGuardService } from './openai-output-guard.service';
import { OpenaiRedactionService } from './openai-redaction.service';
import { OpenaiCopilotDraft } from './entities/openai-copilot-draft.entity';
import { OpenaiPromptTemplate } from './entities/openai-prompt-template.entity';
import { OpenaiRequest } from './entities/openai-request.entity';
import { OpenaiUsageLedgerEntry } from './entities/openai-usage-ledger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpenaiPromptTemplate, OpenaiRequest, OpenaiUsageLedgerEntry, OpenaiCopilotDraft]), SettingsAdminModule],
  controllers: [OpenaiCopilotController],
  providers: [OpenaiCopilotService, OpenaiRedactionService, OpenaiAdapterService, OpenaiOutputGuardService],
  exports: [OpenaiCopilotService],
})
export class OpenaiCopilotModule {}
