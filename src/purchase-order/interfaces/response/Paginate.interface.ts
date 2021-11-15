import { PO } from './../../schemas/purchase-order.schema';
import { BasePaginateResponse } from './../../../config/interfaces/response.pagination.base.interface';

export interface IPurchaseOrderPaginateResponse extends BasePaginateResponse {
  data: PO[] | null;
}
