import { Injectable } from '@nestjs/common';
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
  ) {}

  async generateCode(code: CodePRDto): Promise<IRGenerateCode> {
    const findCode = await this.model.findOne(
      {
        code: { $regex: code.code, $options: 'i' },
      },
      {},
      { sort: { createdAt: -1 } },
    );

    const codeDigit = process.env.CODEDIGIT;
    console.log(codeDigit, 'code');

    if (!findCode) {
      return { code: `${code.code}-${codeDigit}` };
    }

    // const numberCode = findCode.code.substring(
    //   findCode.code.length - codeDigit,
    //   findCode.code.length,
    // );

    // return { code: `${code.code}-${numberCode + 1}` };
  }
}
