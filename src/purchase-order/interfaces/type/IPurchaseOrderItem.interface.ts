import { ItemsInterface } from './../../../items/interfaces/Items.interface';
import { IPaymentTerm } from './IPaymentTerms.interface';

export interface IPurchaseOrderItem extends ItemsInterface {
  payment_terms?: string;
  code_po: string;
  package?: string;
}
