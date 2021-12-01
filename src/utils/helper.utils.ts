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

  SubTotal(array): number {
    const initialValue = 0;
    const calculate: number = array.reduce(function (total, currentValue) {
      // eslint-disable-next-line prettier/prettier
      return (currentValue.sub_total) + total;
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

  async group(params: any, code: string, status: string): Promise<packages[]> {
    const { items } = params[0];
    const map = new Map();

    items.forEach((item) => {
      const key = item.payment_term[0].name;
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });

    const Packages = [];
    let counting = 1;

    await map.forEach(async (value, key, map) => {
      const objects = {
        code_package: await this.generateCode({
          code: code,
          count: counting++,
          digits: this.Config.get('DIGITS_NUMBER_PACKAGE'),
        }),
        payment_terms: key,
        items: map.get(key),
        statuses: {
          name: status,
          timestamp: new Date(Date.now()),
        },
        total: this.SubTotal(map.get(key)),
      };
      Packages.push(objects);
    });

    return Packages;
  }

  // splitPackage(data: any) {
  //   let items = data[0].items
  //   const convert_array = Object.entries(groupBy(items, 'payment_term[0].name'));
  //   let final_data: any = convert_array.map(function (key) {
  //     return {
  //       payment_terms: key[0],
  //       items: key[1]
  //     };
  //   });
  //   console.log(final_data, 'final data')
  // }
}

interface packages {
  code_package: string;
  payment_terms?: string;
  total: number;
  tax?: number;
  down_payment?: number;
  proof_of_advance_payment?: {
    file: {
      url: string;
      uploader: string;
      date: Date;
    };
    approval?: {
      name: string;
      nominal: number;
      date: Date;
    };
  };
}
