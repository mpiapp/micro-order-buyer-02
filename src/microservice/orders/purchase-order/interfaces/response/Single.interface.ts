import { Order } from './../../../database/schema/orders.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';
export interface IPurchaseOrderResponse extends BaseResponse {
  data: Order | null;
}
