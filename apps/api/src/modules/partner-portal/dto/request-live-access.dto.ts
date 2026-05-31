export class RequestLiveAccessDto {
  declaredUseCase!: string;
  technicalContactEmail!: string;
  webhookReady?: boolean;
  ipAllowlistReady?: boolean;
  acceptedApiTermsVersion!: string;
}
