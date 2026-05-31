export class PurchaseKillSwitchDto {
  enabled!: boolean;
  customerMessage?: string;
  disabledUntil?: string;
  reason!: string;
  actorId?: string;
}
