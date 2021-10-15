import { CodePRDto } from './../../dto/CodePR.dto';
import { PR } from './../../schemas/purchase-request.schema';
import { BuyerDto } from 'src/purchase-request/dto/Buyer.dto';

export interface ISearchPurchaseRequest {
  searchPurchaseRequest(code: CodePRDto): Promise<PR[]>;
  listPurchaseRequest(buyerId: BuyerDto): Promise<PR[]>;
  byIdPurchaseRequest(id: string): Promise<PR>;
}
