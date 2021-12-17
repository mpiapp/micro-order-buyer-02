import { BaseResponse } from 'src/config/interfaces/response.base.interface';
import { DeliveryNote } from 'src/database/schema/delivery-note.schema';

export interface IDeliveryNotesResponse extends BaseResponse {
  data: DeliveryNote[] | null;
}
