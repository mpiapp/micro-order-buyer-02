import { StatusDto } from 'src/purchase-request/dto/Status.dto';

export interface IUpdateStatusPurchaseRequest {
  addStatus(id: string, params: StatusDto): Promise<any>;
}
