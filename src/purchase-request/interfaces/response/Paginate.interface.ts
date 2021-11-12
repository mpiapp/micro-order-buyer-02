import { PR } from '../../schemas/purchase-request.schema';
import { BasePaginateResponse } from './../../../config/interfaces/response.pagination.base.interface';

export interface IPurchaseRequestPaginateResponse extends BasePaginateResponse {
  data: PR[] | null;
}
