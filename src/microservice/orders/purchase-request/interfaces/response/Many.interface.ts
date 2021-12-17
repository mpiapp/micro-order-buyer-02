import { BaseResponse } from '../../../../../config/interfaces/response.base.interface';
import { Order } from './../../../../../database/schema/orders.schema';

export interface IPurchaseRequestsResponse extends BaseResponse {
  data: Order[] | null;
}
