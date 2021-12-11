import { Order } from './../../../../../database/schema/orders.schema';
import { CreatePurchaseRequest } from './../type/CreatePurchaseRequest.type';

export interface ICreatePurchaseRequest {
  createPurchaseRequest(params: CreatePurchaseRequest): Promise<Order>;
}
