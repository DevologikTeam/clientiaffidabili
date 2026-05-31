import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { OpenapiAdapterService } from './openapi-adapter.service';
import { ProviderRuntimeService } from './provider-runtime.service';

@Controller('provider/openapi')
export class OpenapiCallbackController {
  constructor(
    private readonly provider: OpenapiAdapterService,
    private readonly runtime: ProviderRuntimeService,
  ) {}

  @Post('callback')
  handleCallback(@Headers('x-clientiaffidabili-signature') signature: string | undefined, @Body() body: Record<string, unknown>) {
    if (!this.provider.verifyCallbackSignature(signature)) {
      throw new UnauthorizedException('Firma callback non valida');
    }
    return this.runtime.receiveCallback(true, body);
  }
}
