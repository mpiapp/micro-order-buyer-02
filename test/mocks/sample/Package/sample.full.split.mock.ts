import { IPackage } from './../../../../src/purchase-order/interfaces/type/IPOPackage.interface';

export const splitPackageSample: IPackage[] = [
  {
    code_package: '001',
    items: [
      {
        productId: '1',
        quantity: 14,
        price: 10000,
      },
      {
        productId: '2',
        quantity: 14,
        price: 10000,
      },
    ],
    statuses: [],
  },
  {
    code_package: '002',
    items: [
      {
        productId: '3',
        quantity: 14,
        price: 10000,
      },
    ],
    statuses: [],
  },
];
