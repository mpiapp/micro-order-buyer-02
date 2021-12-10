import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Helper } from './../../utils/helper.utils';
import { IRGenerateCode } from './../interfaces/response/GenerateCode.interface';
import { IGenerateCodeService } from './../interfaces/services/GenerateCode.interface';
import { Order, OrderDocument } from './../../database/schema/orders.schema';

@Injectable()
export class GenerateService implements IGenerateCodeService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
    private readonly HelperService: Helper,
    private config: ConfigService,
  ) {}

  async generateCode(_param: string): Promise<IRGenerateCode> {
    const docs = await this.model.find(
      {
        code_pr: { $regex: _param, $options: 'i' },
      },
      {},
      { sort: { createdAt: -1 } },
    );

    const digits = this.config.get('DIGITS_NUMBER_PR');

    if (!docs) {
      return {
        code: `${_param}-${this.HelperService.padNumber('1', digits, '0')}`,
      };
    }

    const count = docs.length + 1;

    return {
      code: `${_param}-${this.HelperService.padNumber(
        count.toString(),
        digits,
        '0',
      )}`,
    };
  }
}
