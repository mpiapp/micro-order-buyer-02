import { DN } from './../../schemas/delivery-note.schema';
import { IDnUpdate } from '../type/dn-update.type';

export interface IUpdateDeliveryNote {
  update(id: string, params: IDnUpdate): Promise<DN>;
}
