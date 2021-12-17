import { OrderUpdateDto } from 'src/config/dto/order-update.dto';
import { sampleAddress, sampleVendor } from '../Delivery-Note/sample.mock';
import { sampleItem } from '../Products/sample.item.mock';

export const SampleUpdate: OrderUpdateDto = {
  id: expect.any(String),
  address: sampleAddress,
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
};
