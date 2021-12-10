import { Order } from './../../../database/schema/orders.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';

export interface IPurchaseRequestResponse extends BaseResponse {
  data: Order | null;
}
