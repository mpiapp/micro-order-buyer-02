import { IPurchaseOrderItem } from './../../..//purchase-order/interfaces/type/IPurchaseOrderItem.interface';
import { IStatus } from './../../../purchase-request/interfaces/type/IStatus.interface';

export interface IPackageType {
  _id: string;
  buyerId: string;
  addressId: string;
  code_package: string;
  date: Date;
  lastStatus: string;
  items: IPurchaseOrderItem[];
  statuses: IStatus[];
  vendorId: string;
}
