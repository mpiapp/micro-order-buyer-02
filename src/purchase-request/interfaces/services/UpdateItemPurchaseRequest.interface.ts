import { ItemPRDto } from 'src/purchase-request/dto/Items.dto';
import { PR } from 'src/purchase-request/schemas/purchase-request.schema';
import { responseUpdateOne } from '../response/service.interface';

export interface IUpdateItemPurchaseRequest {
  addItemPurchaseRequest(id: string, params: ItemPRDto): Promise<PR>;
  updateQtyItemPurchaseRequest(
    id: string,
    params: ItemPRDto,
  ): Promise<responseUpdateOne>;
  removeItemPurchaseRequest(
    id: string,
    params: ItemPRDto,
  ): Promise<responseUpdateOne>;
}
