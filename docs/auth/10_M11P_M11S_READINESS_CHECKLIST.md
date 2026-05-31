# M11-P / M11-S Readiness Checklist

## M11-P deve produrre

- [ ] Blueprint flow login, registrazione, attivazione account, forgot/reset.
- [ ] Blueprint team/inviti/ruoli.
- [ ] API contract auth/account/team/session.
- [ ] Data model definitivo.
- [ ] UI auth e dashboard account.
- [ ] Copy errori sicuri.
- [ ] QA matrix auth/security.
- [ ] Handoff sviluppo M11-S.

## M11-S deve implementare

- [ ] `AuthModule` NestJS.
- [ ] `AccountsModule` o estensione `OrganizationsModule`.
- [ ] Membership multi-account.
- [ ] Login/logout/register/verify-email/forgot/reset.
- [ ] Session management sicuro.
- [ ] Inviti team.
- [ ] RBAC customer/admin integrato.
- [ ] Object authorization su dashboard/report/fatture.
- [ ] Audit auth.
- [ ] UI `/login`, `/registrati`, `/recupera-password`, `/dashboard/team`, `/dashboard/account`.

## Blocchi go-live auth

- [ ] Password hashing reale con Argon2id o bcrypt cost adeguato.
- [ ] Token monouso hashati.
- [ ] Rate limit login/reset/inviti.
- [ ] Session cookie `HttpOnly`, `Secure`, `SameSite`.
- [ ] MFA admin o compensating control documentato.
- [ ] Test cross-account.
- [ ] Test user enumeration.
- [ ] Test session revoke.
