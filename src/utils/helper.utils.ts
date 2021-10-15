import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

  SUM(param): number {
    const initialValue = 0;
    const calculate: number = param.items.reduce(function (
      total,
      currentValue,
    ) {
      // eslint-disable-next-line prettier/prettier
      return (currentValue.price * currentValue.quantity) + total;
    },
    initialValue);
    return calculate;
  }

  GenerateNumber(code: string, initialNumber): string {
    const iNumber: number = parseInt(initialNumber) + 1;
    return `${code}-${
      initialNumber.substring(
        0,
        initialNumber.length - iNumber.toString().length,
      ) + iNumber
    }`;
  }

  padNumber(n: string, width: number, z: string) {
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
