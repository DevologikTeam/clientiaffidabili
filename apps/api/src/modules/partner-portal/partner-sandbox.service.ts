import { Injectable } from '@nestjs/common';

@Injectable()
export class PartnerSandboxService {
  createCompanyCheck(input: { partnerAccountId: string; serviceCode: string; subject: { vatNumber?: string; companyName?: string }; idempotencyKey: string }) {
    return {
      checkId: `sandbox_chk_${Date.now()}`,
      status: 'queued',
      environment: 'sandbox',
      serviceCode: input.serviceCode,
      subject: {
        vatNumber: input.subject.vatNumber || 'IT00000000000',
        companyName: input.subject.companyName || 'Azienda Sandbox Srl',
      },
      estimatedCompletion: 'simulata in pochi secondi',
      idempotencyKey: input.idempotencyKey,
      links: {
        status: `/api/partner/v1/company-checks/sandbox_chk_${Date.now()}`,
        report: null,
      },
      note: 'Risposta sandbox: nessuna chiamata provider reale eseguita.',
    };
  }

  getCompanyCheck(checkId: string) {
    return {
      checkId,
      status: 'completed',
      environment: 'sandbox',
      reportId: `sandbox_rep_${checkId.replace('sandbox_chk_', '')}`,
      message: 'Report sandbox pronto. Non contiene dati reali.',
    };
  }
}
