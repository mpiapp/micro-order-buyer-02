import { DeliveryNote } from '../../../database/schema/delivery-note.schema';
import { BasePaginateResponse } from './../../../config/interfaces/response.pagination.base.interface';

export interface IDeliveryNotesPaginateResponse extends BasePaginateResponse {
  data: DeliveryNote[] | null;
}
