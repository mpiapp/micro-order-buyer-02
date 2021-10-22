import { DN } from './../../schemas/delivery-note.schema';
import { BasePaginateResponse } from './../../../config/interfaces/response.pagination.base.interface';

export interface IDeliveryNotesPaginateResponse extends BasePaginateResponse {
  data: DN[] | null;
}
