import { PRCreateDto } from 'src/purchase-request/dto/CreatePR.dto';
import { SampleBuyer } from '../Buyer/sample.buyer.mock';

export const SampleCreate: PRCreateDto = {
  code: expect.any(String),
  buyerId: SampleBuyer.id,
  date: new Date('2021-10-10'),
  items: [
    {
      productId: expect.any(String),
      quantity: 14,
      price: 10000,
    },
    {
      productId: expect.any(String),
      quantity: 14,
      price: 10000,
    },
  ],
  total: 0,
  statuses: [
    {
      name: 'Open',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
  history: [
    {
      title: 'Created PR',
      message: 'Message Created PR',
      timestamp: new Date('2021-10-10 20:00'),
      userId: 'XXXX',
    },
  ],
};
