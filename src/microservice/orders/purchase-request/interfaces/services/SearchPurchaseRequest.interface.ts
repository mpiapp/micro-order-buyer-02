import { Order } from './../../../../../database/schema/orders.schema';

export interface ISearchPurchaseRequest {
  searchPurchaseRequest(code: string): Promise<Order[]>;
  listPurchaseRequest(buyerId: string): Promise<Order[]>;
  byIdPurchaseRequest(id: string): Promise<Order>;
}
