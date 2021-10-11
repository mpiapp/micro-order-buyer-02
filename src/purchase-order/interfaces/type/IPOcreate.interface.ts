import { IStatus } from './../../../purchase-request/interfaces/type/IStatus.interface';
import { IPurchaseOrderItem } from './IPurchaseOrderItem.interface';

export interface IPurchaseOrder {
  code: string;
  buyerId: string;
  date: Date;
  items: IPurchaseOrderItem[];
  total: number;
  statuses: IStatus[];
  createdBy: string;
}
