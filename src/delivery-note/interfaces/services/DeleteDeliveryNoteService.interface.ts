import { DN } from './../../schemas/delivery-note.schema';

export interface IDeleteDeliveryNote {
  delete(id: string): Promise<DN>;
}
