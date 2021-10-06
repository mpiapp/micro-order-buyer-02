import { PRIdDto } from './../../dto/_IdPR.dto';
import { PR } from '../../schemas/purchase-request.schema';

export interface IDeletePurchaseRequest {
  deletePurchaseRequest(id: PRIdDto): Promise<PR>;
}
