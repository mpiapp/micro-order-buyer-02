import { OrderCreateDto } from './../../../../src/config/dto/order-create.dto';
import { SampleBuyer } from '../Buyer/sample.buyer.mock';
import { sampleItem } from '../Products/sample.item.mock';
import { SampleCode } from './sample.code.mock';

export const SampleCreate: OrderCreateDto = {
  code_pr: SampleCode,
  buyerId: SampleBuyer.id,
  addressId: '617364617364617364617344',
  date: new Date('2021-10-10'),
  vendors: [
    {
      code_po: 'KPJ-12-10-00001-001',
      vendorId: expect.any(String),
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
  statuses: [
    {
      id: expect.any(String),
      name: 'Open',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
  createdBy: 'Xxx Object Id',
};
