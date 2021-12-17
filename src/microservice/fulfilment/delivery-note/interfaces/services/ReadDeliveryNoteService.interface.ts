import { DeliveryNote } from 'src/database/schema/delivery-note.schema';
import { TPaginate } from './../type/dn-paginate.type';

export interface IReadDeliveryNote {
  getAll(vendorId: string): Promise<DeliveryNote[]>;
  getOne(id: string): Promise<DeliveryNote>;
  getCount(code: string): Promise<number>;
  getPaginate(params: TPaginate): Promise<any>;
}
