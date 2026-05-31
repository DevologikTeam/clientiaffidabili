# Auth Data Model Analysis

## Tabelle candidate

```text
accounts
account_memberships
account_invitations
auth_sessions
password_reset_tokens
email_verification_tokens
mfa_factors
mfa_recovery_codes
auth_audit_events
```

## `accounts`

Campi minimi:

- `id`
- `name`
- `type`: `company`, `professional`, `internal_test`
- `status`: `draft`, `active`, `requires_review`, `suspended`, `closed`
- `createdAt`, `updatedAt`

## `account_memberships`

- `id`
- `accountId`
- `userId`
- `role`
- `status`
- `invitedByUserId`
- `createdAt`, `updatedAt`, `disabledAt`

## `account_invitations`

- `id`
- `accountId`
- `email`
- `role`
- `tokenHash`
- `status`
- `expiresAt`
- `acceptedAt`
- `revokedAt`

## `auth_sessions`

- `id`
- `userId`
- `accountId`
- `refreshTokenHash`
- `ipHash`
- `userAgentHash`
- `createdAt`
- `lastUsedAt`
- `expiresAt`
- `revokedAt`

## Retention

- Sessioni scadute/revocate: retention breve e configurabile.
- Auth audit: retention più lunga per sicurezza e accountability.
- Token monouso: cancellazione o invalidazione dopo scadenza.
