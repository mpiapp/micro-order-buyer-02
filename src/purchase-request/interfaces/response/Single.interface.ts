import { PR } from '../../schemas/purchase-request.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';

export interface IPurchaseOrderResponse extends BaseResponse {
  data: PR | null;
}
