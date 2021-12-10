import { BasePaginateResponse } from 'src/config/interfaces/response.pagination.base.interface';
import { DeliveryNote } from 'src/database/schema/delivery-note.schema';

export interface IDeliveryNotesPaginateResponse extends BasePaginateResponse {
  data: DeliveryNote[] | null;
}
