import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Helper } from './../../utils/helper.utils';
import { IGenerateCodePurchaseOrder } from '../interfaces/services/GenerateCodePurchaseOrder.interface';
import { IGenerateCode } from '../interfaces/type/IPOGenerate.interface';

@Injectable()
export class GenerateCoderService implements IGenerateCodePurchaseOrder {
  constructor(private HelperService: Helper, private config: ConfigService) {}

  generateCode(params: IGenerateCode): string {
    const { code, count, digits } = params;

    return `${code}-${this.HelperService.padNumber(
      count.toString(),
      digits,
      '0',
    )}`;
  }
}
