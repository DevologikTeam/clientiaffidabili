import { Controller, Get } from '@nestjs/common';
import { ProviderRuntimeService } from './provider-runtime.service';

@Controller('provider/admin')
export class ProviderAdminController {
  constructor(private readonly providerRuntime: ProviderRuntimeService) {}

  @Get('queue')
  queue() {
    return this.providerRuntime.adminQueue();
  }
}
