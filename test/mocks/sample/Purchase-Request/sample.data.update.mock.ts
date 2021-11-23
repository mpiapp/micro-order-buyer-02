import { PRUpdateDto } from 'src/purchase-request/dto/UpdatePR.dto';

export const SampleUpdate: PRUpdateDto = {
  id: expect.any(String),
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
      id: expect.any(String),
      name: 'Open',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
};
