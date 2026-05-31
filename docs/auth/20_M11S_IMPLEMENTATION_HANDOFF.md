# M11-S Implementation Handoff

## File backend da creare

```text
apps/api/src/modules/auth/auth.module.ts
apps/api/src/modules/auth/auth.controller.ts
apps/api/src/modules/auth/account.controller.ts
apps/api/src/modules/auth/team.controller.ts
apps/api/src/modules/auth/entities/user.entity.ts
apps/api/src/modules/auth/entities/account.entity.ts
apps/api/src/modules/auth/entities/account-membership.entity.ts
apps/api/src/modules/auth/entities/account-invitation.entity.ts
apps/api/src/modules/auth/entities/auth-session.entity.ts
apps/api/src/modules/auth/entities/password-reset-token.entity.ts
apps/api/src/modules/auth/entities/email-verification-token.entity.ts
apps/api/src/modules/auth/entities/auth-audit-event.entity.ts
apps/api/src/modules/auth/services/auth.service.ts
apps/api/src/modules/auth/services/account.service.ts
apps/api/src/modules/auth/services/team.service.ts
apps/api/src/modules/auth/services/session.service.ts
apps/api/src/modules/auth/services/password-recovery.service.ts
apps/api/src/modules/auth/services/auth-audit.service.ts
apps/api/src/modules/auth/guards/session-auth.guard.ts
apps/api/src/modules/auth/guards/account-permission.guard.ts
```

## File frontend da creare

```text
apps/web/app/login/page.tsx
apps/web/app/registrati/page.tsx
apps/web/app/password-dimenticata/page.tsx
apps/web/app/reset-password/page.tsx
apps/web/app/inviti/[token]/page.tsx
apps/web/app/dashboard/account/page.tsx
apps/web/app/dashboard/team/page.tsx
apps/web/app/dashboard/sicurezza/page.tsx
apps/web/components/auth/
apps/web/lib/auth/auth-runtime.ts
```

## Acceptance criteria

- Login/register/reset/invite UI presenti.
- Backend entities auth/team presenti.
- Token sensibili salvati solo come hash.
- Sessione cookie-oriented documentata nel runtime.
- Membership/ruoli customer implementati come fonte di autorizzazione.
- Ultimo owner non rimovibile.
- QA script auth development pronto.
- Nessun claim di produzione pronta senza test reali.

## Blocchi produzione residui dopo M11-S

- build reale con dipendenze;
- hashing password validato in runtime;
- cookie secure testato su dominio reale;
- rate limit reale;
- email provider reale;
- MFA admin reale;
- test E2E cross-account;
- penetration/smoke test auth.
