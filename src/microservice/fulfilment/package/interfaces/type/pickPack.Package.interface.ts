import { IPurchaseOrderItem } from '../../../purchase-order/interfaces/type/IPurchaseOrderItem.interface';
import { IStatus } from '../../../purchase-request/interfaces/type/IStatus.interface';

export interface IPickPackPackage {
  id: string;
  vendorId: string;
  code: string;
  items: IPurchaseOrderItem[];
  total: number;
  statuses: IStatus;
}
