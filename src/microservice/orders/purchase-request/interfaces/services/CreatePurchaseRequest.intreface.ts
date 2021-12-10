import { Order } from './../../../../../database/schema/orders.schema';
import { OrderCreateDto } from './../../../../../config/dto/order-create.dto';

export interface ICreatePurchaseRequest {
  createPurchaseRequest(params: OrderCreateDto): Promise<Order>;
}
