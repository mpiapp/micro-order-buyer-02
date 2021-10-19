import { IOrderPackage } from '../type/OrderPackage.interface';
import { BasePaginateResponse } from './../../../config/interfaces/response.pagination.base.interface';

export interface IPackagesPaginateResponse extends BasePaginateResponse {
  data: IOrderPackage[] | null;
}
