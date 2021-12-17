import { StatusDto } from './../../../../../config/dto/status.dto';

export interface IUpdateStatusPurchaseRequest {
  addStatus(params: StatusDto): Promise<any>;
}
