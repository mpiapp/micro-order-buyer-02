import { PR } from './../../schemas/purchase-request.schema';

export interface ISearchPurchaseRequest {
  searchPurchaseRequest(code: string): Promise<PR[]>;
  listPurchaseRequest(buyerId: string): Promise<PR[]>;
  byIdPurchaseRequest(id: string): Promise<PR>;
}
