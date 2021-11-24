import { ItemPRDto } from 'src/purchase-request/dto/Items.dto';
import { responseUpdateOne } from '../response/service.interface';
import { Order } from './../../../database/schema/orders.schema';

export interface IUpdateItemPurchaseRequest {
  addItemPurchaseRequest(id: string, params: ItemPRDto): Promise<Order>;
  updateQtyItemPurchaseRequest(
    id: string,
    params: ItemPRDto,
  ): Promise<responseUpdateOne>;
  removeItemPurchaseRequest(
    id: string,
    params: ItemPRDto,
  ): Promise<responseUpdateOne>;
}
