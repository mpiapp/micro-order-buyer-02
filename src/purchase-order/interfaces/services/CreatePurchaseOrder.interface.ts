import { PO } from './../../schemas/purchase-order.schema';
import { IPurchaseOrder } from '../type/IPOcreate.interface';

export interface ICreatePurchaseOrder {
  createPurchaseOrder(params: IPurchaseOrder): Promise<PO>;
}
