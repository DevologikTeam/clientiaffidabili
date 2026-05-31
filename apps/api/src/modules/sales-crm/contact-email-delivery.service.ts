import { Injectable } from '@nestjs/common';
import type { ContactMessage } from './entities/contact-message.entity';

export interface ContactEmailDeliveryResult {
  status: 'sent' | 'failed' | 'skipped';
  error?: string;
}

@Injectable()
export class ContactEmailDeliveryService {
  async deliver(message: ContactMessage): Promise<ContactEmailDeliveryResult> {
    const enabled = process.env.CONTACT_EMAIL_ENABLED === 'true';
    if (!enabled) {
      return { status: 'skipped', error: 'CONTACT_EMAIL_ENABLED is not true. Message persisted in admin inbox.' };
    }

    // Adapter placeholder: in production this will call the transactional email provider.
    // The CRM rule remains save-first-email-second, so delivery failures never lose the message.
    if (!process.env.CONTACT_EMAIL_TO) {
      return { status: 'failed', error: 'CONTACT_EMAIL_TO is missing.' };
    }

    return { status: 'sent' };
  }
}
