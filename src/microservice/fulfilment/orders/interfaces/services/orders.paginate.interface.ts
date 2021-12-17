import { IPaginate } from './../../../package/interfaces/type/Paginate.interface';

export interface IOrderPaginateService {
  paginate(params: IPaginate): Promise<any>;
}
