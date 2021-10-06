import { StatusDto } from 'src/purchase-request/dto/Status.dto';
import { PRIdDto } from 'src/purchase-request/dto/_IdPR.dto';

export interface IUpdateStatusPurchaseRequest {
  addStatus(id: PRIdDto, params: StatusDto): Promise<any>;
}
