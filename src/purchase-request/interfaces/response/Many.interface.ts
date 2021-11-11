import { PR } from '../../schemas/purchase-request.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';

export interface IPurchaseOrdersResponse extends BaseResponse {
  data: PR[] | null;
}
