import { BaseResponse } from './../../../../../config/interfaces/response.base.interface';
import { IPackageType } from './../type/Package.interface';

export interface IPackagesResponse extends BaseResponse {
  data: IPackageType[] | null;
}
