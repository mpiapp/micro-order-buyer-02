import { IPurchaseOrderItem } from '../../../purchase-order/interfaces/type/IPurchaseOrderItem.interface';
import { IStatus } from '../../../purchase-request/interfaces/type/IStatus.interface';

export type IDnCreate = {
  code: string;
  date: Date;
  buyerId: string;
  addressId: string;
  orderId: string;
  vendorId: string;
  items: IPurchaseOrderItem[];
  statuses: IStatus;
  createdBy: string;
};
