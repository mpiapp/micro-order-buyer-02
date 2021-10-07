import { PRUpdateDto } from '../../dto/UpdatePR.dto';
import { PRIdDto } from '../../dto/_IdPR.dto';
import { PR } from '../../schemas/purchase-request.schema';

export interface IUpdatePurchaseRequest {
  updatePurchaseRequest(id: PRIdDto, param: PRUpdateDto): Promise<PR>;
}
