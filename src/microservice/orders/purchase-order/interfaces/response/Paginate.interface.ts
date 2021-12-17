import { Order } from './../../../../../database/schema/orders.schema';
import { BasePaginateResponse } from './../../../../../config/interfaces/response.pagination.base.interface';

export interface IPurchaseOrderPaginateResponse extends BasePaginateResponse {
  data: Order[] | null;
}
