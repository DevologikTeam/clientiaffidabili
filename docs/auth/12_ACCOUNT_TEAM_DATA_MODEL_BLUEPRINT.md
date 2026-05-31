# Account & Team Data Model Blueprint

## Entità MVP

### User

```ts
User {
  id: uuid
  email: string
  emailVerifiedAt?: Date
  name?: string
  passwordHash: string
  status: 'pending_activation' | 'active' | 'locked' | 'disabled'
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Account

```ts
Account {
  id: uuid
  legalName: string
  displayName?: string
  vatNumber?: string
  fiscalCode?: string
  status: 'draft' | 'active' | 'requires_review' | 'suspended' | 'closed'
  createdAt: Date
  updatedAt: Date
}
```

### AccountMembership

```ts
AccountMembership {
  id: uuid
  accountId: uuid
  userId: uuid
  role: 'owner' | 'admin' | 'analyst' | 'billing' | 'viewer'
  status: 'invited' | 'active' | 'disabled' | 'transferred'
  invitedByUserId?: uuid
  joinedAt?: Date
  disabledAt?: Date
  createdAt: Date
}
```

### AccountInvitation

```ts
AccountInvitation {
  id: uuid
  accountId: uuid
  email: string
  role: CustomerAccountRole
  tokenHash: string
  status: 'pending' | 'accepted' | 'expired' | 'revoked'
  expiresAt: Date
  invitedByUserId: uuid
  acceptedByUserId?: uuid
}
```

### AuthSession

```ts
AuthSession {
  id: uuid
  userId: uuid
  accountId?: uuid
  sessionTokenHash: string
  refreshTokenHash?: string
  deviceLabel?: string
  ipHash?: string
  userAgentHash?: string
  status: 'active' | 'revoked' | 'expired'
  expiresAt: Date
  lastSeenAt?: Date
}
```

### AuthAuditEvent

```ts
AuthAuditEvent {
  id: uuid
  userId?: uuid
  accountId?: uuid
  actorUserId?: uuid
  eventType: string
  severity: 'info' | 'warning' | 'critical'
  metadataRedacted: jsonb
  createdAt: Date
}
```

## Vincoli

- Email user unique case-insensitive.
- Almeno un `owner` attivo per account attivo.
- Non si può disabilitare l'ultimo owner.
- Invitation token e reset token mai salvati in chiaro.
- Session token mai salvato in chiaro.
- Audit non cancellabile via UI.
