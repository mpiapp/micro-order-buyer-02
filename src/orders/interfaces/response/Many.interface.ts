import { BaseResponse } from '../../../config/interfaces/response.base.interface';
import { IOrder } from '../type/orders.interface';

export interface IOrdersResponse extends BaseResponse {
  data: IOrder[] | null;
}
