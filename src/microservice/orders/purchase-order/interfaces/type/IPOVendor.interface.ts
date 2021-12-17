import { IPackage } from './IPOPackage.interface';

export interface IPurchaseOrderVendors {
  code_po: string;
  vendorId: string;
  payment_terms?: string;
  packages: IPackage[];
  tax?: number;
  statuses: any[];
}
