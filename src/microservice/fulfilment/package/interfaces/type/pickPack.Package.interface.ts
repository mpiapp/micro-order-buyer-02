import { VendorDto } from './../../../../../config/dto/vendor.dto';
import { IPurchaseOrderItem } from './../../../../orders/purchase-order/interfaces/type/IPurchaseOrderItem.interface';
import { IStatus } from './../../../../orders/purchase-request/interfaces/type/IStatus.interface';

export interface IPickPackPackage {
  id: string;
  vendor: VendorDto;
  code: string;
  items: IPurchaseOrderItem[];
  total: number;
  statuses: IStatus;
}
