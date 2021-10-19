import { BaseResponse } from '../../../config/interfaces/response.base.interface';
import { IOrderPackage } from '../type/OrderPackage.interface';

export interface IPackagesResponse extends BaseResponse {
  data: IOrderPackage[] | null;
}
