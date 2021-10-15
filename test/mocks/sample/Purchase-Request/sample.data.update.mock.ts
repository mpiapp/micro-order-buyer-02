import { PRUpdateDto } from 'src/purchase-request/dto/UpdatePR.dto';

export const SampleUpdate: PRUpdateDto = {
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
    {
      productId: expect.any(String),
      quantity: 14,
      price: 10000,
    },
  ],
  total: 420000,
  statuses: [
    {
      name: 'Open',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
};
