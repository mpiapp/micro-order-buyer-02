import { PurchaseRequestIdDto } from '../../dto/IdPurchaseRequest.dto';
import { PurchaseRequestUpdateDto } from '../../dto/UpdatePurchaseRequest.dto';
import { PR } from '../../schemas/purchase-request.schema';

export interface IUpdatePurchaseRequest {
  updatePurchaseRequest(
    id: PurchaseRequestIdDto,
    param: PurchaseRequestUpdateDto,
  ): Promise<PR>;
}
