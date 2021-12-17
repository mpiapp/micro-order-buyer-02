import { DeliveryNote } from 'src/database/schema/delivery-note.schema';
import { IDnUpdate } from './../type/dn-update.type';

export interface IUpdateDeliveryNote {
  update(id: string, params: IDnUpdate): Promise<DeliveryNote>;
}
