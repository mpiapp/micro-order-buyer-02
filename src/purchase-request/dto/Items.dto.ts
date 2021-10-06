import { IItem } from '../interfaces/type/IItem.interface';

export class ItemDto implements IItem {
  productId: string;
  quantity: number;
  price: number;
}
