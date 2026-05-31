import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { ContactEmailDeliveryService } from './contact-email-delivery.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageStatusDto } from './dto/update-contact-message-status.dto';
import { ContactMessage } from './entities/contact-message.entity';
import { CrmSupportTicket } from './entities/crm-support-ticket.entity';
import { SalesLead } from './entities/sales-lead.entity';
import { SalesOpportunity } from './entities/sales-opportunity.entity';
import type { ContactMessageResponse, CrmTicketResponse, SalesCrmSummary, SalesLeadResponse } from './sales-crm.types';

@Injectable()
export class SalesCrmService {
  constructor(
    @InjectRepository(ContactMessage) private readonly contactMessages: Repository<ContactMessage>,
    @InjectRepository(SalesLead) private readonly leads: Repository<SalesLead>,
    @InjectRepository(SalesOpportunity) private readonly opportunities: Repository<SalesOpportunity>,
    @InjectRepository(CrmSupportTicket) private readonly tickets: Repository<CrmSupportTicket>,
    private readonly emailDelivery: ContactEmailDeliveryService,
  ) {}

  async createContactMessage(input: CreateContactMessageDto, requestMeta: { ipAddress?: string; userAgent?: string } = {}): Promise<ContactMessageResponse> {
    if (!input.privacyAccepted) {
      throw new BadRequestException('Privacy acceptance is required.');
    }

    const contact = this.contactMessages.create({
      sourceType: input.sourceType ?? 'contact',
      sourcePath: input.sourcePath ?? '/contatti',
      ctaId: input.ctaId,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      companyName: input.companyName?.trim(),
      phone: input.phone?.trim(),
      message: input.message.trim(),
      consentSnapshot: {
        privacyAccepted: input.privacyAccepted,
        marketingAccepted: Boolean(input.marketingAccepted),
        acceptedAt: new Date().toISOString(),
        context: 'contact_form',
      },
      status: 'new',
      emailDeliveryStatus: 'pending',
      ipAddressHash: requestMeta.ipAddress ? this.hashIp(requestMeta.ipAddress) : undefined,
      userAgent: requestMeta.userAgent?.slice(0, 800),
    });

    const saved = await this.contactMessages.save(contact);
    const delivery = await this.emailDelivery.deliver(saved);
    saved.emailDeliveryStatus = delivery.status;
    saved.emailDeliveryError = delivery.error;
    const updated = await this.contactMessages.save(saved);
    return this.toContactResponse(updated);
  }

  async summary(): Promise<SalesCrmSummary> {
    const [newMessages, openLeads, openTickets, failedEmailDeliveries] = await Promise.all([
      this.contactMessages.count({ where: { status: 'new' } }),
      this.leads.count({ where: [{ status: 'new' }, { status: 'qualified' }, { status: 'contacted' }] }),
      this.tickets.count({ where: [{ status: 'new' }, { status: 'triage' }, { status: 'waiting_internal' }, { status: 'escalated' }] }),
      this.contactMessages.count({ where: { emailDeliveryStatus: 'failed' } }),
    ]);

    return {
      newMessages,
      openLeads,
      openTickets,
      failedEmailDeliveries,
      nextActions: [
        { id: 'inbox', label: 'Valuta nuovi messaggi contatto', href: '/admin/crm/inbox', priority: 'sales' },
        { id: 'tickets', label: 'Controlla ticket aperti', href: '/admin/crm/tickets', priority: 'P1' },
      ],
    };
  }

  async inbox(): Promise<ContactMessageResponse[]> {
    const rows = await this.contactMessages.find({ order: { createdAt: 'DESC' }, take: 100 });
    return rows.map((row) => this.toContactResponse(row));
  }

  async leadsList(): Promise<SalesLeadResponse[]> {
    const rows = await this.leads.find({ order: { createdAt: 'DESC' }, take: 100 });
    return rows.map((row) => this.toLeadResponse(row));
  }

  async ticketsList(): Promise<CrmTicketResponse[]> {
    const rows = await this.tickets.find({ order: { createdAt: 'DESC' }, take: 100 });
    return rows.map((row) => this.toTicketResponse(row));
  }

  async updateContactStatus(id: string, input: UpdateContactMessageStatusDto): Promise<ContactMessageResponse> {
    const contact = await this.contactMessages.findOne({ where: { id } });
    if (!contact) throw new NotFoundException('Contact message not found.');
    contact.status = input.status;
    contact.metadata = { ...contact.metadata, lastStatusReason: input.reason, lastStatusUpdatedAt: new Date().toISOString() };
    return this.toContactResponse(await this.contactMessages.save(contact));
  }

  async createLeadFromContact(id: string): Promise<SalesLeadResponse> {
    const contact = await this.contactMessages.findOne({ where: { id } });
    if (!contact) throw new NotFoundException('Contact message not found.');
    const lead = await this.leads.save(this.leads.create({
      name: contact.name,
      email: contact.email,
      companyName: contact.companyName,
      phone: contact.phone,
      sourceMessageId: contact.id,
      sourcePath: contact.sourcePath,
      status: 'new',
      temperature: contact.sourceType === 'demo' ? 'hot' : 'warm',
      declaredNeed: contact.message,
      nextAction: 'Rispondere al contatto e qualificare il bisogno.',
    }));
    contact.status = 'linked_to_lead';
    contact.leadId = lead.id;
    await this.contactMessages.save(contact);
    return this.toLeadResponse(lead);
  }

  async createTicketFromContact(id: string): Promise<CrmTicketResponse> {
    const contact = await this.contactMessages.findOne({ where: { id } });
    if (!contact) throw new NotFoundException('Contact message not found.');
    const ticket = await this.tickets.save(this.tickets.create({
      subject: `Richiesta da ${contact.name}`,
      topic: contact.sourceType === 'support' ? 'general' : 'general',
      status: 'new',
      priority: 'P2',
      contactMessageId: contact.id,
      message: contact.message,
      nextAction: 'Rispondere al cliente e collegare eventuale ordine/report.',
      metadata: { sourcePath: contact.sourcePath, email: contact.email },
    }));
    contact.status = 'linked_to_ticket';
    contact.ticketId = ticket.id;
    await this.contactMessages.save(contact);
    return this.toTicketResponse(ticket);
  }

  private hashIp(ipAddress: string): string {
    const salt = process.env.IP_HASH_SALT ?? 'development-only-ip-salt';
    return createHash('sha256').update(`${salt}:${ipAddress}`).digest('hex');
  }

  private toContactResponse(row: ContactMessage): ContactMessageResponse {
    return {
      id: row.id,
      sourceType: row.sourceType,
      sourcePath: row.sourcePath,
      name: row.name,
      email: row.email,
      companyName: row.companyName,
      messagePreview: row.message.length > 160 ? `${row.message.slice(0, 157)}...` : row.message,
      status: row.status,
      emailDeliveryStatus: row.emailDeliveryStatus,
      createdAt: row.createdAt.toISOString(),
    };
  }

  private toLeadResponse(row: SalesLead): SalesLeadResponse {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      companyName: row.companyName,
      status: row.status,
      temperature: row.temperature,
      nextAction: row.nextAction,
      createdAt: row.createdAt.toISOString(),
    };
  }

  private toTicketResponse(row: CrmSupportTicket): CrmTicketResponse {
    return {
      id: row.id,
      subject: row.subject,
      topic: row.topic,
      status: row.status,
      priority: row.priority,
      relatedType: row.relatedType,
      relatedId: row.relatedId,
      nextAction: row.nextAction,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
