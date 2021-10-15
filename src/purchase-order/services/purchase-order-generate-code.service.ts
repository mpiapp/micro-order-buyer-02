import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Helper } from './../../utils/helper.utils';
import { IGenerateCodePurchaseOrder } from '../interfaces/services/GenerateCodePurchaseOrder.interface';
import { IPOGenerate } from '../interfaces/type/IPOGenerate.interface';

@Injectable()
export class GenerateCodePurchaseOrderService
  implements IGenerateCodePurchaseOrder
{
  constructor(private HelperService: Helper, private config: ConfigService) {}

  async generateCodePurchaseOrder(IPR: IPOGenerate): Promise<string> {
    const widthNumberPO = this.config.get('INITIAL_NUMBER_PO');
    const { code, cNumber } = IPR;

    return `${code}-${this.HelperService.padNumber(
      cNumber.toString(),
      widthNumberPO,
      '0',
    )}`;
  }
}
