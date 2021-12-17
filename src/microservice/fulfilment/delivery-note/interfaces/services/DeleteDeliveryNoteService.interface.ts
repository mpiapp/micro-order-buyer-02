import { DeliveryNote } from 'src/database/schema/delivery-note.schema';

export interface IDeleteDeliveryNote {
  delete(id: string): Promise<DeliveryNote>;
}
