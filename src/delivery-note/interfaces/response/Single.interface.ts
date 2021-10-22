import { DN } from './../../schemas/delivery-note.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';

export interface IDeliveryNoteResponse extends BaseResponse {
  data: DN | null;
}
