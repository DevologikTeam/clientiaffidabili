# 15 — M15B-P / M15B-S Readiness Checklist

## M15B-P deve progettare

- [ ] Esperienza admin settings.
- [ ] State model per acquisti abilitati/disabilitati.
- [ ] Bootstrap admin flow.
- [ ] Settings data model dettagliato.
- [ ] Secret handling/redaction.
- [ ] API contract admin settings.
- [ ] Error ledger workflow.
- [ ] Refund/fix linkage.
- [ ] Purchase IP privacy/audit flow.
- [ ] UI component blueprint.
- [ ] QA matrix.

## M15B-S deve implementare

- [ ] `SettingsAdminModule`.
- [ ] `PlatformSetting` e versioning.
- [ ] `BootstrapAdminService`.
- [ ] `PurchaseControlService`.
- [ ] `OperationalErrorLedgerService`.
- [ ] `PurchaseIpAuditService`.
- [ ] API admin settings/errors.
- [ ] Admin UI `/admin/settings` e `/admin/settings/errors`.
- [ ] Middleware/hook checkout per kill switch e IP audit.
- [ ] Error capture helper per payment/openapi/openai/email/webhook/report.
- [ ] QA generico su segreti/log/IP/raw payload.

## Go-live blocker

- [ ] Bootstrap non attivo di default.
- [ ] Nessun segreto esposto in UI o log.
- [ ] Kill switch backend testato.
- [ ] Error ledger scrive eventi per errori pagamento/provider/OpenAI.
- [ ] IP completo non visibile in viste standard.
- [ ] Reason obbligatoria per azioni sensibili.
- [ ] Audit append-only.
