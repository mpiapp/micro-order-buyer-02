import { PurchaseRequestCreateDto } from 'src/purchase-request/dto/CreatePurchaseRequest.dto';

export const SampleCreate: PurchaseRequestCreateDto = {
  id: expect.any(String),
  buyer_id: expect.any(String),
  user_id: expect.any(String),
  date: new Date('2021-10-10'),
  products: [
    {
      product_id: expect.any(String),
      quantity: 12,
      price: 12000,
    },
    {
      product_id: expect.any(String),
      quantity: 14,
      price: 10000,
    },
  ],
  status: [
    {
      name: 'Open',
      timestamp: new Date('2021-10-10 20:00'),
    },
    {
      name: 'Save',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
};
