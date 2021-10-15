import { IPurchaseOrderItem } from './IPurchaseOrderItem.interface';

export interface IPackage {
  code_package: string;
  items: IPurchaseOrderItem[];
  statuses: {
    name: string;
    timestamp: Date;
  }[];
}
