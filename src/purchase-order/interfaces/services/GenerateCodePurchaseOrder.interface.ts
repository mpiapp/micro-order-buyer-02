import { IPOGenerate } from '../type/IPOGenerate.interface';

export interface IGenerateCodePurchaseOrder {
  generateCodePurchaseOrder(params: IPOGenerate): Promise<any>;
}
