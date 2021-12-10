import { StatusDto } from './../../../../../config/dto/Status.dto';

export interface IUpdateStatusPurchaseRequest {
  addStatus(params: StatusDto): Promise<any>;
}
