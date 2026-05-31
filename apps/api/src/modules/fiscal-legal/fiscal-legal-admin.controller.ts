import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExecuteFiscalAdminActionDto } from './dto/execute-fiscal-admin-action.dto';
import { FiscalLegalService } from './fiscal-legal.service';

@Controller('admin/fiscal-legal')
export class FiscalLegalAdminController {
  constructor(private readonly fiscalLegal: FiscalLegalService) {}

  @Get('queue')
  queue() {
    return this.fiscalLegal.adminQueue();
  }

  @Post('actions')
  execute(@Body() dto: ExecuteFiscalAdminActionDto) {
    return this.fiscalLegal.executeAdminAction(dto);
  }
}
