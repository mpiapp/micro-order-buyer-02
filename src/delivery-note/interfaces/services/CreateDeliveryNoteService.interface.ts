import { DeliveryNote } from '../../../database/schema/delivery-note.schema';
import { IDnCreate } from '../type/dn-create.type';

export interface ICreateDeliveryNote {
  create(params: IDnCreate): Promise<DeliveryNote>;
}
