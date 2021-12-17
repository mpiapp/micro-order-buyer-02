import { Order } from './../../../../../database/schema/orders.schema';
import { BaseResponse } from './../../../../../config/interfaces/response.base.interface';

export interface IPurchaseOrdersResponse extends BaseResponse {
  data: Order[] | null;
}
