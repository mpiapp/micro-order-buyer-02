import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IGenerateCode } from './../purchase-order/interfaces/type/IPOGenerate.interface';
import configuration from './../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class Helper {
  constructor(private readonly Config: ConfigService) {}

  sumValidate(param) {
    const sum: number = this.SUM(param);
    if (sum !== param.total) {
      throw new Error(this.Config.get<string>('error.total'));
    }
  }

  SUM(array): number {
    const initialValue = 0;
    const calculate: number = array.reduce(function (total, currentValue) {
      // eslint-disable-next-line prettier/prettier
      return (currentValue.price * currentValue.quantity) + total;
    }, initialValue);
    return calculate;
  }

  padNumber(n: string, width: number, z: string) {
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  async generateCode(params: IGenerateCode): Promise<string> {
    const { code, count, digits } = params;

    return `${code}-${this.padNumber(count.toString(), digits, '0')}`;
  }
}
