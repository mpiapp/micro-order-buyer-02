import { OrderUpdateDto } from 'src/config/dto/order-update.dto';
import { sampleItem } from '../Products/sample.item.mock';

export const SampleUpdate: OrderUpdateDto = {
  id: expect.any(String),
  addressId: '617364617364617364617344',
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
};
