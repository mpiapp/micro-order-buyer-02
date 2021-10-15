import { IPackage } from './IPOPackage.interface';

export interface IPurchaseOrderVendors {
  code_po: string;
  vendorId: string;
  payment_terms?: string;
  package: IPackage[];
  tax?: number;
  statuses: {
    name: string;
    timestamp: Date;
  }[];
}
