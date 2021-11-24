import { Order } from './../../../database/schema/orders.schema';

export interface IDeletePurchaseRequest {
  deletePurchaseRequest(id: string): Promise<Order>;
}
