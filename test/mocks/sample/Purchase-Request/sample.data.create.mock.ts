import { OrderCreateDto } from './../../../../src/config/dto/order-create.dto';
import { sampleItem } from '../Products/sample.item.mock';
import { SampleCode } from './sample.code.mock';
import {
  sampleAddress,
  sampleBuyer,
  sampleVendor,
} from '../Delivery-Note/sample.mock';

export const SampleCreate: OrderCreateDto = {
  code: SampleCode,
  buyer: sampleBuyer,
  address: sampleAddress,
  date: new Date('2021-10-10'),
  vendors: [
    {
      code_po: 'KPJ-12-10-00001-001',
      vendor: sampleVendor,
      packages: [
        {
          code_package: 'KPJ-12-10-00001-001-001',
          items: [sampleItem, sampleItem],
          payment_terms: null,
          tax: 100,
          total: 0,
          statuses: [
            {
              name: 'Open',
              timestamp: new Date('2021-10-10 20:00'),
            },
          ],
        },
      ],
    },
  ],
  total: 0,
  createdBy: 'Xxx Object Id',
};

export const SampleCreateService = {
  code_pr: SampleCode,
  buyer: sampleBuyer,
  address: sampleAddress,
  date: new Date('2021-10-10'),
  vendors: [
    {
      code_po: 'KPJ-12-10-00001-001',
      vendor: sampleVendor,
      packages: [
        {
          code_package: 'KPJ-12-10-00001-001-001',
          items: [sampleItem, sampleItem],
          payment_terms: null,
          tax: 100,
          total: 0,
          statuses: [
            {
              name: 'Open',
              timestamp: new Date('2021-10-10 20:00'),
            },
          ],
        },
      ],
      statuses: [
        {
          name: 'Open',
          timestamp: new Date('2021-10-10 20:00'),
        },
      ],
    },
  ],
  total: 0,
  createdBy: 'Xxx Object Id',
};
