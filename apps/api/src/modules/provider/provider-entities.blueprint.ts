// Blueprint TypeORM per M5-S. Il file è intenzionalmente separato dalle entity runtime
// per consentire implementazione controllata nello sprint di sviluppo.

export const PROVIDER_ENTITY_BLUEPRINT = {
  ProviderRequest: {
    unique: ['idempotencyKey'],
    relations: ['order', 'check', 'events', 'costLedgerEntries'],
    immutableAfterDispatch: ['orderId', 'checkId', 'productCode', 'providerName', 'providerServiceCode', 'mappingVersion', 'providerCostSnapshotCents'],
  },
  ProviderRequestEvent: {
    appendOnly: true,
    requiredFields: ['providerRequestId', 'eventType', 'occurredAt', 'actorType'],
  },
  ProviderCostLedger: {
    appendOnly: true,
    entryTypes: ['estimated', 'reserved', 'consumed_success', 'consumed_failed', 'released', 'adjusted'],
  },
  ProviderRawPayloadVault: {
    publicApiExposure: false,
    requiredProtections: ['encryption-at-rest', 'payload-hash', 'access-audit', 'retention-policy'],
  },
} as const;
