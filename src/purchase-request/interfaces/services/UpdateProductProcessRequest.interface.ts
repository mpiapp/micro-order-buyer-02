import { ItemDto } from 'src/purchase-request/dto/Items.dto';
import { PRIdDto } from 'src/purchase-request/dto/_IdPR.dto';
import { PR } from 'src/purchase-request/schemas/purchase-request.schema';
import { responseUpdateOne } from '../response/service.interface';

export interface IUpdateItemPurchaseRequest {
  addItemPurchaseRequest(id: PRIdDto, params: ItemDto): Promise<PR>;
  updateQtyItemPurchaseRequest(
    id: PRIdDto,
    params: ItemDto,
  ): Promise<responseUpdateOne>;
  removeItemPurchaseRequest(
    id: PRIdDto,
    params: ItemDto,
  ): Promise<responseUpdateOne>;
}
