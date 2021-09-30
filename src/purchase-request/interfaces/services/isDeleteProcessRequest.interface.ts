import { PurchaseRequestIdDto } from '../../dto/IdPurchaseRequest.dto';
import { PR } from '../../schemas/purchase-request.schema';

export interface IDeletePurchaseRequest {
  deletePurchaseRequest(id: PurchaseRequestIdDto): Promise<PR>;
}
