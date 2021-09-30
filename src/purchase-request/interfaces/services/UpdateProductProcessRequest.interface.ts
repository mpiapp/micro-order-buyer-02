import { PurchaseRequestIdDto } from 'src/purchase-request/dto/IdPurchaseRequest.dto';
import { Product } from 'src/purchase-request/dto/Product.dto';
import { PR } from 'src/purchase-request/schemas/purchase-request.schema';
import { responseUpdateOne } from '../response/service.interface';

export interface IUpdateItemPurchaseRequest {
  addItemPurchaseRequest(
    id: PurchaseRequestIdDto,
    params: Product,
  ): Promise<PR>;
  updateQtyItemPurchaseRequest(
    id: PurchaseRequestIdDto,
    params: Product,
  ): Promise<responseUpdateOne>;
  removeItemPurchaseRequest(
    id: PurchaseRequestIdDto,
    params: Product,
  ): Promise<responseUpdateOne>;
}
