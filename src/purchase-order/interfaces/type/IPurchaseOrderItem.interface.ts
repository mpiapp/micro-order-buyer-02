import { IItem } from './../../../purchase-request/interfaces/type/IItem.interface';
import { IPaymentTerm } from './IPaymentTerms.interface';

export interface IPurchaseOrderItem extends IItem {
  productId: string;
  payment_terms?: IPaymentTerm;
  code_po: string;
  package?: string;
  quantity: number;
  price: number;
}
