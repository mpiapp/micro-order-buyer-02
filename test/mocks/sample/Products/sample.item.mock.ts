import { ItemDto } from './../../../../src/purchase-request/dto/Items.dto';

export const sampleItem: ItemDto = {
  productId: expect.any(String),
  quantity: 12,
  price: 10000,
};
