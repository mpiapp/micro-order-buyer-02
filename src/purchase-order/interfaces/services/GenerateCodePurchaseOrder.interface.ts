import { IGenerateCode } from '../type/IPOGenerate.interface';

export interface IGenerateCodePurchaseOrder {
  generateCode(params: IGenerateCode): string;
}
