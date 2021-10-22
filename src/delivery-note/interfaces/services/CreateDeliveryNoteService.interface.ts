import { DN } from './../../schemas/delivery-note.schema';
import { IDnCreate } from '../type/dn-create.type';

export interface ICreateDeliveryNote {
  create(params: IDnCreate): Promise<DN>;
}
