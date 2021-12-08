import { DeliveryNote } from '../../../database/schema/delivery-note.schema';

export interface IDeleteDeliveryNote {
  delete(id: string): Promise<DeliveryNote>;
}
