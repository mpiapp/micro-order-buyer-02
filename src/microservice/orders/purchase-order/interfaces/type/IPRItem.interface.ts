import { ItemsInterface } from './../../../../product/items/interfaces/Items.interface';

export interface IPRItem extends ItemsInterface {
  vendorId: string;
  price: number;
}
