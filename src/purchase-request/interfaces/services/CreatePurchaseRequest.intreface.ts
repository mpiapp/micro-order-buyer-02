import { PRCreateDto } from '../../dto/CreatePR.dto';
import { PR } from '../../schemas/purchase-request.schema';

export interface ICreatePurchaseRequest {
  createPurchaseRequest(param: PRCreateDto): Promise<PR>;
}
