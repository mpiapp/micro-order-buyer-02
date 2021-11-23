import { StatusDto } from 'src/purchase-request/dto/Status.dto';

export interface IUpdateStatusPurchaseRequest {
  addStatus(params: StatusDto): Promise<any>;
}
