import { PO } from './../../schemas/purchase-order.schema';

export interface IDeletePurchaseOrder {
  deletePurchaseOrder(id: string): Promise<PO>;
}
