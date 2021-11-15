import { PO } from './../../schemas/purchase-order.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';

export interface IPurchaseOrdersResponse extends BaseResponse {
  data: PO[] | null;
}
