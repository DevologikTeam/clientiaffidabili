import { Injectable } from '@nestjs/common';
import {
  buildRcHardeningRuntimeSummary,
  rcHardeningRuntimeEvidenceBundle,
  type RcRuntimeEvidenceBundleContract,
  type RcRuntimeSummaryContract,
} from './rc-hardening-runtime.types';

@Injectable()
export class RcHardeningService {
  getRuntimeSummary(): RcRuntimeSummaryContract {
    return buildRcHardeningRuntimeSummary();
  }

  getEvidenceBundle(): RcRuntimeEvidenceBundleContract {
    return rcHardeningRuntimeEvidenceBundle;
  }
}
