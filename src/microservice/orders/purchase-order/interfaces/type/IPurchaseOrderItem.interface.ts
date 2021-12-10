import { ItemsInterface } from './../../../items/interfaces/Items.interface';

export interface IPurchaseOrderItem extends ItemsInterface {
  price: number;
  quantity_change?: number;
  price_change?: number;
  note?: string;
  status?: {
    name: string;
    timestamp: Date;
  }[];
}
