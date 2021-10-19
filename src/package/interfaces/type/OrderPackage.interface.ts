import { IPackage } from './../../../purchase-order/interfaces/type/IPOPackage.interface';
import { IStatus } from './../../../purchase-request/interfaces/type/IStatus.interface';

export interface IOrderPackage {
  _id: string;
  buyerId: string;
  addressId: string;
  code_po: string;
  date: Date;
  lastStatus: string;
  packages: IPackage[];
  payment_terms?: string[];
  statuses: IStatus[];
  total: number;
  vendorId: string;
}
