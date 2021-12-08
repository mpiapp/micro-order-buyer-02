import { DeliveryNote } from '../../../database/schema/delivery-note.schema';
import { BaseResponse } from '../../../config/interfaces/response.base.interface';

export interface IDeliveryNoteResponse extends BaseResponse {
  data: DeliveryNote | null;
}
