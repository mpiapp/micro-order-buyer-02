import { sampleItem } from '../Products/sample.item.mock';
import { IPackage } from './../../../../src/purchase-order/interfaces/type/IPOPackage.interface';

export const splitPackageSample: IPackage[] = [
  {
    code_package: '001',
    items: [sampleItem, sampleItem],
    statuses: [],
  },
  {
    code_package: '002',
    items: [sampleItem],
    statuses: [],
  },
];
