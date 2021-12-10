import { BaseResponse } from './../../../../../config/interfaces/response.base.interface';
import { IOrder } from './../type/orders.interface';

export interface IOrderResponse extends BaseResponse {
  data: IOrder | null;
}
