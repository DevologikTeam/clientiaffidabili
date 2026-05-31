import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { BootstrapAdminDto } from './dto/bootstrap-admin.dto';
import { CreateOperationalErrorDto } from './dto/create-operational-error.dto';
import { OperationalErrorActionDto } from './dto/operational-error-action.dto';
import { PurchaseKillSwitchDto } from './dto/purchase-kill-switch.dto';
import { UpdatePlatformSettingDto } from './dto/update-platform-setting.dto';
import { UpdateSecretSettingDto } from './dto/update-secret-setting.dto';
import { SettingsAdminService } from './settings-admin.service';
import type { PlatformSettingNamespace } from './settings-admin-runtime.types';

@Controller('settings-admin')
export class SettingsAdminController {
  constructor(private readonly settings: SettingsAdminService) {}

  @Get('overview')
  overview() {
    return this.settings.overview();
  }

  @Get('namespaces/:namespace')
  namespace(@Param('namespace') namespace: PlatformSettingNamespace) {
    return this.settings.listNamespace(namespace);
  }

  @Post('namespaces/:namespace/:key')
  updateSetting(
    @Param('namespace') namespace: PlatformSettingNamespace,
    @Param('key') key: string,
    @Body() body: UpdatePlatformSettingDto,
    @Headers('x-forwarded-for') ip?: string,
  ) {
    return this.settings.updateSetting(namespace, key, body, { ipAddress: ip, actorId: body.actorId });
  }

  @Post('namespaces/:namespace/:key/secret')
  updateSecret(
    @Param('namespace') namespace: PlatformSettingNamespace,
    @Param('key') key: string,
    @Body() body: UpdateSecretSettingDto,
    @Headers('x-forwarded-for') ip?: string,
  ) {
    return this.settings.updateSecret(namespace, key, body, { ipAddress: ip, actorId: body.actorId });
  }

  @Post('purchases/kill-switch')
  killSwitch(@Body() body: PurchaseKillSwitchDto, @Headers('x-forwarded-for') ip?: string) {
    return this.settings.setPurchaseKillSwitch(body, { ipAddress: ip, actorId: body.actorId });
  }

  @Post('bootstrap/admin')
  bootstrapAdmin(@Body() body: BootstrapAdminDto, @Headers('x-forwarded-for') ip?: string) {
    return this.settings.bootstrapAdmin(body, { ipAddress: ip });
  }

  @Get('operational-errors')
  operationalErrors(@Query('status') status?: string) {
    return this.settings.listOperationalErrors(status);
  }

  @Post('operational-errors')
  createOperationalError(@Body() body: CreateOperationalErrorDto) {
    return this.settings.recordOperationalError(body);
  }

  @Post('operational-errors/:id/actions')
  actOnError(@Param('id') id: string, @Body() body: OperationalErrorActionDto) {
    return this.settings.actOnOperationalError(id, body);
  }
}
