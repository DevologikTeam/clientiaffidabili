import { Injectable } from '@nestjs/common';
import { emailTemplateBlueprints } from './email-template.registry';
import type { EmailEventPayload } from './email-notifications-runtime.types';

export type RenderedEmail = {
  templateKey: string;
  templateVersion: number;
  subject: string;
  html: string;
  text: string;
};

@Injectable()
export class EmailRendererService {
  render(templateKey: string, variables: EmailEventPayload): RenderedEmail {
    const template = emailTemplateBlueprints.find((item) => item.templateKey === templateKey);
    if (!template) {
      throw new Error(`Email template not registered: ${templateKey}`);
    }
    const subject = this.interpolate(template.subject, variables);
    const preheader = this.interpolate(template.preheader, variables);
    const ctaUrl = String(variables.verifyUrl ?? variables.resetUrl ?? variables.orderUrl ?? variables.reportUrl ?? variables.securePdfUrl ?? variables.supportUrl ?? '#');
    const ctaLabel = template.defaultCtaLabel ?? 'Apri';
    const html = `
      <main style="font-family:Arial,sans-serif;line-height:1.5;color:#162033">
        <p style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#4b5f7a">ClientiAffidabili.it</p>
        <h1 style="font-size:22px;margin:0 0 12px">${subject}</h1>
        <p>${preheader}</p>
        <p><a href="${ctaUrl}" style="display:inline-block;background:#162033;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none">${ctaLabel}</a></p>
        <p style="font-size:13px;color:#667085">Se non riconosci questa richiesta, contatta il supporto. Non inoltrare questa email se contiene link personali.</p>
      </main>`;
    const text = `${subject}\n\n${preheader}\n\n${ctaLabel}: ${ctaUrl}\n\nClientiAffidabili.it`;
    return { templateKey, templateVersion: template.version, subject, html, text };
  }

  private interpolate(value: string, variables: EmailEventPayload): string {
    return value.replace(/{{\s*([a-zA-Z0-9_.-]+)\s*}}/g, (_, key: string) => String(variables[key] ?? ''));
  }
}
