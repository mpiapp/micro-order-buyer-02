import { DN } from './../../schemas/delivery-note.schema';

export interface IReadDeliveryNote {
  getAll(vendorId: string): Promise<DN[]>;
  getOne(id: string): Promise<DN>;
  getCount(code: string): Promise<number>;
}
