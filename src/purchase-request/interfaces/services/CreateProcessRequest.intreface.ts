import { PurchaseRequestCreateDto } from '../../dto/CreatePurchaseRequest.dto';
import { PR } from '../../schemas/purchase-request.schema';

export interface ICreatePurchaseRequest {
  createPurchaseRequest(param: PurchaseRequestCreateDto): Promise<PR>;
}
