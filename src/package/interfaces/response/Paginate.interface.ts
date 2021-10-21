import { IPackageType } from '../type/Package.interface';
import { BasePaginateResponse } from './../../../config/interfaces/response.pagination.base.interface';

export interface IPackagesPaginateResponse extends BasePaginateResponse {
  data: IPackageType[] | null;
}
