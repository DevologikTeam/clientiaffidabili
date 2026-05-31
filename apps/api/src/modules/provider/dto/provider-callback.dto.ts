export interface ProviderCallbackDto {
  providerRequestId?: string;
  externalId?: string;
  status?: string;
  payload?: Record<string, unknown>;
}
