import { BaseResponse } from 'src/config/interfaces/response.base.interface';
import { DeliveryNote } from 'src/database/schema/delivery-note.schema';

export interface IDeliveryNoteResponse extends BaseResponse {
  data: DeliveryNote | null;
}
