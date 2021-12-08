import { TPaginate } from '../type/dn-paginate.type';
import { DeliveryNote } from '../../../database/schema/delivery-note.schema';

export interface IReadDeliveryNote {
  getAll(vendorId: string): Promise<DeliveryNote[]>;
  getOne(id: string): Promise<DeliveryNote>;
  getCount(code: string): Promise<number>;
  getPaginate(params: TPaginate): Promise<any>;
}
