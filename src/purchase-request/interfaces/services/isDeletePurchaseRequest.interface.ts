import { PR } from './../../schemas/purchase-request.schema';

export interface IDeletePurchaseRequest {
  deletePurchaseRequest(id: string): Promise<PR>;
}
