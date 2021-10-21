import { IStatus } from './../../../purchase-request/interfaces/type/IStatus.interface';
import { IPurchaseOrderVendors } from './IPOVendor.interface';

export interface IPurchaseOrder {
  code: string;
  buyerId: string;
  date: Date;
  addressId: string;
  vendors?: IPurchaseOrderVendors[];
  total: number;
  statuses: IStatus[];
  createdBy: string;
}
