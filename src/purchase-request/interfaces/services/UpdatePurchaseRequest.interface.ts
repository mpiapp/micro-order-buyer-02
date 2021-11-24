import { PRUpdateDto } from '../../dto/UpdatePR.dto';
import { Order } from './../../../database/schema/orders.schema';

export interface IUpdatePurchaseRequest {
  updatePurchaseRequest(params: PRUpdateDto): Promise<Order>;
}
