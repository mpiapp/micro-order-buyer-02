import { ItemsInterface } from './../../../../product/items/interfaces/Items.interface';

export interface IPurchaseOrderItem extends ItemsInterface {
  price: number;
  quantity_original?: number;
  retail_price_original?: number;
  sub_total_original?: number;
  discount_price_original?: number;
  note?: string;
  status?: {
    name: string;
    timestamp: Date;
  }[];
}
