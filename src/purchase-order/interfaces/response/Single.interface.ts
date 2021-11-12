import { PO } from './../../schemas/purchase-order.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';
export interface IPurchaseOrderResponse extends BaseResponse {
  data: PO | null;
}
