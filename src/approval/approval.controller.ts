import { Controller } from '@nestjs/common';
import { PurchaseOrderService } from 'src/purchase-order/services/purchase-order.service';
import { PRIdDto } from 'src/purchase-request/dto/_IdPR.dto';
import { PurchaseRequestService } from 'src/purchase-request/services/purchase-request.service';

@Controller('approval')
export class ApprovalController {
  constructor(
    private readonly PRMaster: PurchaseRequestService,
    private readonly POMaster: PurchaseOrderService,
  ) {}

  async approved(id: PRIdDto): Promise<any> {
    const getPR = await this.PRMaster.byIdPurchaseRequest(id);
    if (!getPR) {
      throw new Error('Sorry PR not Found');
    }
      
      

    const submited = await this.POMaster.createPurchaseOrder(getPR);
    if (!submited) {
      throw new Error('Sorry PR not Found');
    }

    await this.PRMaster.deletePurchaseRequest(id);

    return 'success submit';
  }
}
