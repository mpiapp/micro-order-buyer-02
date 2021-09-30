import { PurchaseRequestIdDto } from 'src/purchase-request/dto/IdPurchaseRequest.dto';
import { Status } from 'src/purchase-request/dto/Status.dto';

export interface IUpdateStatusPurchaseRequest {
  addStatus(id: PurchaseRequestIdDto, params: Status): Promise<any>;
}
