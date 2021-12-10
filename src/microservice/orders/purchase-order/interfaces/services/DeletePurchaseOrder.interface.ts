import { Order } from './../../../../../database/schema/orders.schema';

export interface IDeletePurchaseOrder {
  deletePurchaseOrder(id: string): Promise<Order>;
}
