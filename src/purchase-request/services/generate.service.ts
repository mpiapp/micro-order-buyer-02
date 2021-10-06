import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodePRDto } from '../dto/CodePR.dto';
import { IRGenerateCode } from '../interfaces/response/GenerateCode.interface';
import { IGenerateCode } from '../interfaces/services/GenerateCode.interface';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class GenerateService implements IGenerateCode {
  constructor(
    @InjectModel(PR.name) private readonly model: Model<PRDocument>,
    private config: ConfigService,
  ) {}

  async generateCode(_param: CodePRDto): Promise<IRGenerateCode> {
    const docs = await this.model.findOne(
      {
        code: { $regex: _param.code, $options: 'i' },
      },
      {},
      { sort: { createdAt: -1 } },
    );

    const initNumber = this.config.get('INITIAL_NUMBER');

    if (!docs) {
      return {
        code: `${_param.code}-${
          initNumber.substring(0, initNumber.length - 1) + 1
        }`,
      };
    }

    const { code } = docs;
    const numberCode = code.substring(
      code.length - initNumber.length,
      code.length,
    );
    const iNumber: number = parseInt(numberCode) + 1;
    return {
      code: `${_param.code}-${
        initNumber.substring(0, initNumber.length - iNumber.toString().length) +
        iNumber
      }`,
    };
  }
}
