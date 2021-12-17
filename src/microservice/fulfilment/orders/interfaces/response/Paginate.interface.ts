import { IOrder } from './../type/orders.interface';
import { BasePaginateResponse } from './../../../../../config/interfaces/response.pagination.base.interface';

export interface IOrderPaginateResponse extends BasePaginateResponse {
  data: IOrder[] | null;
}
