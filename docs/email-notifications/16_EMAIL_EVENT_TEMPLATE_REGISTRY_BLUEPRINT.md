# 16 — Email Event & Template Registry Blueprint

## Event registry

Gli eventi email sono versionati e tipizzati. Ogni evento definisce categoria, destinatario, template, CTA, priorita', retry policy e dati ammessi.

| Evento | Template | Priorita' | Dati ammessi |
|---|---|---:|---|
| `account.registered` | `account_welcome_v1` | 40 | nome, account, dashboardUrl |
| `account.email_verification_requested` | `verify_email_v1` | 90 | nome, verifyUrl, expiresAt |
| `auth.password_reset_requested` | `password_reset_v1` | 100 | nome, resetUrl, expiresAt |
| `auth.password_changed` | `password_changed_v1` | 95 | nome, supportUrl |
| `auth.remember_me_enabled` | `remember_me_enabled_v1` | 70 | nome, deviceLabel, revokeUrl |
| `team.invite_sent` | `team_invite_v1` | 85 | inviterName, accountName, inviteUrl, role |
| `order.created` | `order_created_v1` | 70 | orderCode, productName, totalAmount |
| `payment.succeeded` | `payment_succeeded_v1` | 100 | orderCode, amount, orderUrl |
| `payment.failed` | `payment_failed_v1` | 100 | orderCode, retryPaymentUrl |
| `refund.approved` | `refund_approved_v1` | 90 | orderCode, amount, refundStatusUrl |
| `report.processing` | `report_processing_v1` | 60 | checkCode, productName |
| `report.ready` | `report_ready_v1` | 100 | checkCode, reportUrl |
| `report.pdf_ready` | `report_pdf_ready_v1` | 90 | checkCode, securePdfUrl, expiresAt |
| `invoice.available` | `invoice_available_v1` | 80 | invoiceNumber, invoiceUrl |
| `support.ticket_created` | `support_ticket_created_v1` | 60 | ticketCode, supportUrl |
| `support.ticket_updated` | `support_ticket_updated_v1` | 60 | ticketCode, supportUrl |
| `partner.api_key_created` | `partner_api_key_created_v1` | 80 | keyPrefix, docsUrl |
| `partner.credits_low` | `partner_credits_low_v1` | 70 | remainingCredits, topupUrl |

## Template contract

Ogni template deve avere:

- `templateKey`;
- `version`;
- `locale`;
- `subject`;
- `preheader`;
- `category`;
- `allowedVariables`;
- `htmlBody`;
- `textBody`;
- `legalFooterKey`;
- `requiresUnsubscribe` solo per email non strettamente tecniche.

## Versioning

- i template pubblicati non si modificano in-place;
- ogni modifica crea nuova versione;
- le delivery salvano `templateKey`, `templateVersion` e hash contenuto;
- admin puo' vedere quale versione ha ricevuto un cliente.

## Variabili vietate

- `password`;
- `token`;
- `apiKeySecret`;
- `rawProviderPayload`;
- `cardNumber`;
- `ibanFull`;
- `openaiPrompt`;
- `openaiRawResponse`;
- `reportRawData`;
- `taxCodeFull` se non strettamente necessario.
