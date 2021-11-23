import { PRUpdateDto } from '../../dto/UpdatePR.dto';
import { PR } from '../../schemas/purchase-request.schema';

export interface IUpdatePurchaseRequest {
  updatePurchaseRequest(params: PRUpdateDto): Promise<PR>;
}
